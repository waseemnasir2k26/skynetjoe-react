# Portfolio card image credits

The 11 images listed below are sourced from **Pexels** (https://www.pexels.com) and processed with the cream-editorial filter (1280x800 cover crop @ portfolio card aspect 16:10, slight desaturation + warm cream tint, JPEG q82, EXIF stripped). The original Pexels-hosted JPEGs were downloaded from `images.pexels.com` per the URLs below.

These images replace duplicate / placeholder hero shots on `/portfolio` cards where the underlying live Vercel demo site was using the same generic chef-puppet stock photo across multiple unrelated niches (medical, accountant, auto repair, gym, landscape, logistics, pest control, plumbing, roofing) — plus the broken `<img>` on Northbound Moving and the cartoon-illustration placeholder on Auberlin Estate.

The remaining 12 cards on `/portfolio` continue to use real screenshots of the deployed Vercel sites (no Pexels image) and are **not** listed here.

## License

**Pexels License** — Free for commercial and personal use. No attribution required, but credited here as a courtesy. Full terms: https://www.pexels.com/license/

Pexels content may NOT be sold, redistributed as-is on stock-photo sites, or used to depict identifiable people in offensive contexts. Our usage (portfolio card hero images on a marketing site) is fully compliant.

## Per-card credits

| Slug | Photographer | Source page |
| --- | --- | --- |
| skynetlabs-medical-demo | Babydov | https://www.pexels.com/photo/blue-and-white-clinic-bed-7789603/ |
| skynetlabs-accountant-demo | Bia Limova | https://www.pexels.com/photo/close-up-of-finance-document-with-calculator-and-glasses-33175673/ |
| skynetlabs-autorepair-demo | Renee Razumov | https://www.pexels.com/photo/modern-car-repair-garage-interior-view-33814732/ |
| skynetlabs-gym-demo | Foadshariyati | https://www.pexels.com/photo/modern-gym-interior-with-geometric-lighting-29224211/ |
| skynetlabs-landscaping-demo | strannik-sk | https://www.pexels.com/photo/lush-garden-with-wooden-pergola-and-green-foliage-33821319/ |
| skynetlabs-logistics-demo | Thorl5 | https://www.pexels.com/photo/vibrant-sunset-at-an-industrial-shipping-port-33587048/ |
| skynetlabs-moving-demo | Artem Podrez | https://www.pexels.com/photo/brown-carton-boxes-5025500/ |
| skynetlabs-pestcontrol-demo | Gordon Plant | https://www.pexels.com/photo/wooden-trellis-on-pillars-in-front-of-a-building-14744642/ |
| skynetlabs-plumbing-demo | nic-scrollstoppingphotos | https://www.pexels.com/photo/copper-pluming-fitting-28169591/ |
| skynetlabs-roofing-demo | Benjamin Kupke | https://www.pexels.com/photo/red-tiled-roof-17314421/ |
| auberlin-estate-flagship | Steven Van Elk | https://www.pexels.com/photo/the-grand-little-barn-at-artisan-acres-estate-10172663/ |

## Regenerating

```bash
# Edit URLs in scripts/portfolio-images-manifest.json, then:
node scripts/download-portfolio-images.mjs
```

Last updated: 2026-05-26
