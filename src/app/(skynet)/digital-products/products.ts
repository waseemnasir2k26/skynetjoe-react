/**
 * Digital products sold on Etsy (shop: SkynetLabs). Facts come from the real
 * Etsy listing files (_FIVERR-ETSY/<slug>/upload/product.json). Prices are the
 * Etsy list prices on 2026-10-16 and may change on Etsy; the page says so.
 * Gumroad-only items are intentionally NOT listed (Waseem: Etsy for now).
 */
export type DigitalProduct = {
  id: string; // Etsy listing id
  slug: string; // image file name in /public/digital-products
  name: string;
  forWho: string;
  inside: string;
  price: number;
  savings?: number;
  was?: number;
};

export const ETSY_LISTING_URL = (id: string) =>
  `https://www.etsy.com/listing/${id}`;

export const DIGITAL_PRODUCTS: DigitalProduct[] = [
  {
    id: "4596517206",
    slug: "bundle",
    name: "7 Small Business Kits Bundle",
    forWho:
      "Realtors, cleaners, spas, loan officers, insurance agents, coaches and social media managers",
    inside:
      "All 7 kits in one download: forms, letters, scripts, printable PDF guides and Excel / Google Sheets trackers.",
    price: 59,
    savings: 51,
    was: 110,
  },
  {
    id: "4594984839",
    slug: "realtor-follow-up",
    name: "Realtor Lead Follow-Up System",
    forWho: "Real estate agents who lose leads by following up too late",
    inside:
      "51 email, text and call scripts in 9 sequences, plus a lead tracker that shows who to contact today.",
    price: 12,
  },
  {
    id: "4596087035",
    slug: "realtor-seller-leads",
    name: "Realtor Seller Leads Kit",
    forWho:
      "Realtors who want to win expired listings and for-sale-by-owner homes",
    inside:
      "10 editable letters, 30 call, text and email scripts, a printable PDF guide and a seller leads tracker.",
    price: 14,
  },
  {
    id: "4596109020",
    slug: "cleaning-business",
    name: "Cleaning Business Starter Kit",
    forWho: "House, office and Airbnb cleaners",
    inside:
      "7 editable forms (quote, service agreement, checklists, invoice), 12 follow-up messages and a client and job tracker.",
    price: 14,
  },
  {
    id: "4596115468",
    slug: "beauty-spa",
    name: "Beauty & Spa Client Kit",
    forWho: "Estheticians, lash and brow artists and small spas",
    inside:
      "4 intake and consent forms, 6 aftercare cards, 20 client texts and a tracker that shows who is due to rebook.",
    price: 15,
  },
  {
    id: "4596093663",
    slug: "loan-officer",
    name: "Loan Officer Follow-Up Kit",
    forWho: "Mortgage loan officers",
    inside:
      "36 follow-up scripts, 30 social post captions, a printable PDF guide and a client pipeline tracker.",
    price: 19,
  },
  {
    id: "4596117658",
    slug: "insurance-renewal",
    name: "Insurance Agent Renewal Tracker",
    forWho: "Independent insurance agents",
    inside:
      "A spreadsheet showing renewals due in 30 and 60 days and birthdays this month, plus 30 scripts and a PDF guide.",
    price: 17,
  },
  {
    id: "4596108330",
    slug: "client-onboarding",
    name: "Client Onboarding Kit",
    forWho: "Coaches, virtual assistants and freelancers",
    inside:
      "Welcome letter, questionnaire, service agreement, checklists, 10 email templates and a client tracker.",
    price: 12,
  },
  {
    id: "4596120988",
    slug: "social-media-manager",
    name: "Social Media Manager Client Kit",
    forWho: "Freelancers who run social media pages for other businesses",
    inside:
      "Client questionnaire, service agreement, content approval form, monthly report template, content planner and client tracker.",
    price: 19,
  },
];
