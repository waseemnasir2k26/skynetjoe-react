"""Sync the /digital-products page data from the live Etsy + Gumroad catalogue.

Usage (python 3.11):
  python -I scripts/sync-digital-products.py                      # pull live (needs Etsy OAuth helper + GUMROAD_TOKEN user env var)
  python -I scripts/sync-digital-products.py --from-cache FILE    # use a cached pull (items.json; images from <FILE dir>/img/<slug>.webp)
  add --allow-missing-copy to tolerate products without a copy.json entry.

Writes src/app/(skynet)/digital-products/products.json and public/digital-products/*.webp.
Copy (name / forWho / inside) is merged by slug from copy.json in the same folder.
"""
import argparse
import html
import io
import json
import re
import shutil
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DP_DIR = ROOT / "src" / "app" / "(skynet)" / "digital-products"
PRODUCTS_JSON = DP_DIR / "products.json"
# Etsy listings filed in a shop section that misleads site visitors.
CATEGORY_OVERRIDE = {
    "4596117658": "Insurance & Tax",  # Insurance Agent Renewal Tracker (Etsy section: Small Business Systems)
}
COPY_JSON = DP_DIR / "copy.json"
PUBLIC_DIR = ROOT / "public" / "digital-products"

ETSY_HELPER_DIR = r"C:\Users\info\OneDrive\Desktop\GITHUB\_FIVERR-ETSY\_christmas-2026-10-29\_lib"

# Personalised-video listings: fulfilment owner unconfirmed, so they stay off the page.
EXCLUDE = {4605168169, 4605171010, 4605139591, 4599797883, 4599811640, 4599801600}

# Only these Gumroad products are listed (the rest duplicate an Etsy listing).
GUMROAD_ONLY = {
    "Lead Consent": "Insurance & Tax",
    "Dental Same-Day": "Med Spa & Clinics",
    "GLP-1 Member Retention": "Med Spa & Clinics",
}

CATEGORY_ORDER = [
    "Real Estate Agent Tools", "Insurance & Tax", "Home Services", "Med Spa & Clinics",
    "Lash & Brow Forms", "Pro Services", "VA & Social Media Kits",
    "Small Business Systems", "Online Sellers", "Christmas Printables",
]


def slugify(store, title):
    return ("e-" if store == "etsy" else "g-") + re.sub(r"[^a-z0-9]+", "-", title.lower())[:48].strip("-")


def save_webp(data, dest):
    from PIL import Image
    im = Image.open(io.BytesIO(data)).convert("RGB")
    im.thumbnail((900, 900))
    im.save(dest, "WEBP", quality=80)


def pull_live(img_dir):
    import requests
    sys.path.insert(0, ETSY_HELPER_DIR)
    from etsy_api import etsy, SHOP_ID  # OAuth helper; never prints secrets
    sec = {s["shop_section_id"]: s["title"]
           for s in etsy.request("GET", f"/application/shops/{SHOP_ID}/sections")["results"]}
    items, off = [], 0
    while True:
        d = etsy.request("GET", f"/application/shops/{SHOP_ID}/listings?state=active&limit=100&offset={off}&includes=Images")
        for l in d["results"]:
            if l["listing_id"] in EXCLUDE:
                continue
            imgs = sorted(l.get("images") or [], key=lambda i: i.get("rank", 99))
            p = l["price"]
            items.append({"store": "etsy", "id": str(l["listing_id"]), "title": html.unescape(l["title"]),
                          "price": round(p["amount"] / p["divisor"], 2),
                          "url": f"https://www.etsy.com/listing/{l['listing_id']}",
                          "img": imgs[0]["url_fullxfull"] if imgs else None,
                          "section": sec.get(l.get("shop_section_id"), "Other")})
        off += 100
        if off >= d["count"]:
            break
    tok = subprocess.run(["powershell", "-NoProfile", "-c",
                          "[Environment]::GetEnvironmentVariable('GUMROAD_TOKEN','User')"],
                         capture_output=True, text=True).stdout.strip()
    if not tok:
        sys.exit("GUMROAD_TOKEN user env var missing")
    gr = requests.get("https://api.gumroad.com/v2/products",
                      headers={"Authorization": f"Bearer {tok}"}, timeout=60)
    gr.raise_for_status()
    for p in gr.json()["products"]:
        if p.get("published"):
            items.append({"store": "gumroad", "id": p["id"], "title": p["name"], "price": p["price"] / 100,
                          "url": p["short_url"], "img": p.get("thumbnail_url") or p.get("preview_url"),
                          "section": "Gumroad"})
    img_dir.mkdir(parents=True, exist_ok=True)
    for it in items:
        it["slug"] = slugify(it["store"], it["title"])
        if it["img"]:
            r = requests.get(it["img"], timeout=60)
            r.raise_for_status()
            save_webp(r.content, img_dir / (it["slug"] + ".webp"))
            time.sleep(0.2)
    return items


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--from-cache", metavar="ITEMS_JSON")
    ap.add_argument("--allow-missing-copy", action="store_true")
    a = ap.parse_args()

    if a.from_cache:
        cache = Path(a.from_cache).resolve()
        items = json.loads(cache.read_text(encoding="utf-8"))
        img_src = cache.parent / "img"
    else:
        img_src = ROOT / ".work-dp" / "img"
        items = pull_live(img_src)

    # Etsy minus EXCLUDE; Gumroad only the explicit list
    kept = []
    for it in items:
        if it["store"] == "etsy":
            if int(it["id"]) in EXCLUDE:
                continue
            if it["id"] in CATEGORY_OVERRIDE:
                it["category"] = CATEGORY_OVERRIDE[it["id"]]
            elif it["section"] in CATEGORY_ORDER:
                it["category"] = it["section"]
            else:
                print(f"WARN unknown Etsy section {it['section']!r} -> Small Business Systems ({it['slug']})")
                it["category"] = "Small Business Systems"
            kept.append(it)
        else:
            for prefix, cat in GUMROAD_ONLY.items():
                if it["title"].startswith(prefix):
                    it["category"] = cat
                    kept.append(it)
                    break

    copy = json.loads(COPY_JSON.read_text(encoding="utf-8")) if COPY_JSON.exists() else {}
    missing = [i["slug"] for i in kept if not (copy.get(i["slug"]) or {}).get("name")]
    if missing and not a.allow_missing_copy:
        print(f"FAIL: {len(missing)} products lack copy in copy.json:")
        for s in missing:
            print("  ", s)
        sys.exit(1)

    products = []
    for it in kept:
        c = copy.get(it["slug"]) or {}
        products.append({
            "store": it["store"], "id": str(it["id"]), "slug": it["slug"],
            "name": c.get("name") or it["title"][:48].strip(),
            "forWho": c.get("forWho", ""), "inside": c.get("inside", ""),
            "price": it["price"], "url": it["url"], "category": it["category"],
            "image": f"/digital-products/{it['slug']}.webp",
        })
    products.sort(key=lambda p: (CATEGORY_ORDER.index(p["category"]), -p["price"], p["slug"]))

    # Fail closed before touching anything: an empty/partial API answer (wrong
    # token, filter, truncated cache) must never wipe the live page.
    prev_n = len(json.loads(PRODUCTS_JSON.read_text(encoding="utf-8"))) if PRODUCTS_JSON.exists() else 0
    stores = {p["store"] for p in products}
    if len(products) < max(10, int(prev_n * 0.7)) or stores != {"etsy", "gumroad"}:
        sys.exit(f"FAIL: suspicious catalogue ({len(products)} products, previous {prev_n}, stores {sorted(stores)}) - nothing written")

    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    no_img = []
    for p in products:
        src = img_src / (p["slug"] + ".webp")
        if src.exists():
            shutil.copyfile(src, PUBLIC_DIR / (p["slug"] + ".webp"))
        elif not (PUBLIC_DIR / (p["slug"] + ".webp")).exists():
            no_img.append(p["slug"])
    if no_img:
        sys.exit(f"FAIL: missing images for {no_img}")
    used = {p["slug"] + ".webp" for p in products}
    for f in sorted(PUBLIC_DIR.glob("*.webp")):
        if f.name not in used:
            f.unlink()
            print("removed unused image", f.name)

    prev = set()
    if PRODUCTS_JSON.exists():
        prev = {p["slug"] for p in json.loads(PRODUCTS_JSON.read_text(encoding="utf-8"))}
    PRODUCTS_JSON.write_text(json.dumps(products, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    now = {p["slug"] for p in products}
    print(f"wrote {len(products)} products")
    for cat in CATEGORY_ORDER:
        n = sum(1 for p in products if p["category"] == cat)
        if n:
            print(f"  {cat}: {n}")
    print(f"new: {len(now - prev)}  removed: {len(prev - now)}  missing copy: {len(missing)}")


if __name__ == "__main__":
    main()
