/**
 * AI video portfolio — generated 2026-10-07 from two public Google Drive folders
 * (1-1Px6Av7816evCcPkeKvXdaKRdhJZy8y + 1g2JV0LktfCHdEK0BFdQsUKpN0K7llIJQ).
 * 109 finished pieces curated out of 201; raw cuts, blanks, tests and client
 * filenames left out. Thumbnails live in public/aiportfolio/thumbs/<id>.webp;
 * playback is the Drive preview iframe, mounted only when a tile is opened.
 */

export type AiCategoryKey =
  | "spokesperson"
  | "automotive"
  | "realestate"
  | "product"
  | "pets"
  | "health"
  | "automation"
  | "character"
  | "cinematic"
  | "fashion"
  | "meme";

export type AiCategory = { key: AiCategoryKey; name: string; blurb: string };
export type AiVideo = {
  id: string;
  cat: AiCategoryKey;
  title: string;
  orient: "portrait" | "landscape";
};

export const AI_CATEGORIES: AiCategory[] = [
  {
    key: "spokesperson",
    name: "AI Spokesperson & UGC",
    blurb: "Talking-head ads and UGC-style creators, fully generated.",
  },
  {
    key: "automotive",
    name: "Automotive",
    blurb: "Dealer and lifestyle car spots, no shoot day.",
  },
  {
    key: "realestate",
    name: "Real Estate & Spaces",
    blurb: "Listings, warehouses and interiors walked by an AI presenter.",
  },
  {
    key: "product",
    name: "Product & Skincare",
    blurb:
      "Hero shots, pours and unboxings for products that never left the warehouse.",
  },
  {
    key: "pets",
    name: "Pets & Family",
    blurb: "Warm, shareable spots for pet brands and family products.",
  },
  {
    key: "health",
    name: "Healthcare",
    blurb: "Dentists, opticians and clinics, patient-safe and on-brand.",
  },
  {
    key: "automation",
    name: "Business Automation Explainers",
    blurb:
      "Short explainers for AI receptionists, booking bots and n8n automations.",
  },
  {
    key: "character",
    name: "Characters & Animation",
    blurb: "Mascots, 3D characters and kids-friendly animation.",
  },
  {
    key: "cinematic",
    name: "Cinematic & Story",
    blurb: "Long-form openers, brand films and mood pieces.",
  },
  {
    key: "fashion",
    name: "Fashion & Beauty",
    blurb: "Hair, hijab fashion and editorial looks.",
  },
  {
    key: "meme",
    name: "Culture & Humour",
    blurb: "Regional, meme-style and festive pieces that travel on social.",
  },
];

export const AI_VIDEOS: AiVideo[] = [
  {
    id: "1_XWeVVRtH4txMx46UUBF7nMfcHoexJEv",
    cat: "spokesperson",
    title: "Contractor UGC ad, cut 1",
    orient: "portrait",
  },
  {
    id: "1u5QTKDredFceYEvEpb-Kl6tqDB6QqRuD",
    cat: "spokesperson",
    title: "Contractor UGC ad, cut 10",
    orient: "portrait",
  },
  {
    id: "1l84VK5fQcTrr4PHkNVKgX4Z1NGX9mn3f",
    cat: "spokesperson",
    title: "Contractor UGC ad, cut 2",
    orient: "portrait",
  },
  {
    id: "1TjDt1lNCTuU4hwm0x5yBu91TKSk4SHa0",
    cat: "spokesperson",
    title: "Contractor UGC ad, cut 3",
    orient: "portrait",
  },
  {
    id: "1k7ykBHhk9Qq9ZXgL4uZxR6XdFGizAW88",
    cat: "spokesperson",
    title: "Contractor UGC ad, cut 4",
    orient: "portrait",
  },
  {
    id: "1qwb9-F0AtaAnxOIk5IyNaymVkMP-6EnJ",
    cat: "spokesperson",
    title: "Contractor UGC ad, cut 5",
    orient: "portrait",
  },
  {
    id: "1V-RSr629HqO_1eGa2oJEdDpVY0R3Nomw",
    cat: "spokesperson",
    title: "Contractor UGC ad, cut 6",
    orient: "portrait",
  },
  {
    id: "1eO_ctHLwAf0spfj8DNRBEv8fPsyg1p_y",
    cat: "spokesperson",
    title: "Contractor UGC ad, cut 7",
    orient: "portrait",
  },
  {
    id: "18lQrLQqndzfm_dUcrNChfboXE0TQAb9j",
    cat: "spokesperson",
    title: "Contractor UGC ad, cut 8",
    orient: "portrait",
  },
  {
    id: "1Fd0hvKInFmoVHYgjkJOrr2V8lB7507Yw",
    cat: "spokesperson",
    title: "Contractor UGC ad, cut 9",
    orient: "portrait",
  },
  {
    id: "1KDceSoOSVuNzXHi7Qh0xOUmM3Xd8b7e3",
    cat: "spokesperson",
    title: "Contractor UGC ad, full edit",
    orient: "landscape",
  },
  {
    id: "1ePx01VhbiwQ3bcRjwt_EMKRlQpAPiM_P",
    cat: "automotive",
    title: "Coastal drive opener",
    orient: "portrait",
  },
  {
    id: "1lUevMCTM-oh0rWA2ZLNFyukUb5Oa7J-q",
    cat: "automotive",
    title: "Off-road SUV",
    orient: "portrait",
  },
  {
    id: "1VLw6J8f59d9FswkkxHCCpeTxurH_wFLy",
    cat: "automotive",
    title: "Pickup, sunrise",
    orient: "portrait",
  },
  {
    id: "1Ub0KDWdABjvUqsJbd4is1E0bnT1ElrjJ",
    cat: "automotive",
    title: "Suburban SUV",
    orient: "portrait",
  },
  {
    id: "19Oz5WmLowORc8emVw_MNw7CNf8ygzqn5",
    cat: "automotive",
    title: "Neighbourhood cruise",
    orient: "portrait",
  },
  {
    id: "1aAFsvxgtr5oZRZMsLNUoq1Bmcus-GKYV",
    cat: "automotive",
    title: "Red coupe, showroom",
    orient: "portrait",
  },
  {
    id: "1U-vzqDgbWOOrfAODScLhSvZJdRzM-Mr6",
    cat: "automotive",
    title: "Blue SUV, driveway",
    orient: "portrait",
  },
  {
    id: "1D26NO7pK6BC69G3LnkwO8COTk78EX0or",
    cat: "automotive",
    title: "Country road",
    orient: "portrait",
  },
  {
    id: "18MHhoPnm569CvEFpi-mhfsHEGWCz5LA7",
    cat: "automotive",
    title: "Family SUV",
    orient: "portrait",
  },
  {
    id: "1UTAZvm7GgsKB3HB211-jtehSe06lawsO",
    cat: "automotive",
    title: "Range Rover, AI sample",
    orient: "portrait",
  },
  {
    id: "1PTdKSbLjTAJRxhUscRLfEl4zs2L7rtwH",
    cat: "automotive",
    title: "Winter road",
    orient: "portrait",
  },
  {
    id: "1BfkOlPupzAWoLaEtQafQRymxdvDFoFk5",
    cat: "automotive",
    title: "City at golden hour",
    orient: "portrait",
  },
  {
    id: "1nV40bJq5M-ZEEVJht-oy-Q2EAnIZjnDC",
    cat: "automotive",
    title: "Autumn mountain pass",
    orient: "portrait",
  },
  {
    id: "1XwDY8kuoZtZMF11a-CEdWmyW4aPN5XOf",
    cat: "automotive",
    title: "Tree-lined street",
    orient: "portrait",
  },
  {
    id: "1uOsGhD52nC3_8AN86nkaqiyZdaYOSrKU",
    cat: "automotive",
    title: "Downtown night",
    orient: "portrait",
  },
  {
    id: "171N3XpyRmH_BcHKwd_5ziAi8RlRrPgNd",
    cat: "automotive",
    title: "Harbour skyline",
    orient: "portrait",
  },
  {
    id: "1R4Q0Dw6Ke-AWAjUcaiu_fycxnNT_oCKW",
    cat: "health",
    title: "Dental ad, patient close-up",
    orient: "landscape",
  },
  {
    id: "1hjQ0C4SYpZ26XqpcoMQkpPdI9q9c2SIW",
    cat: "cinematic",
    title: "City aerial",
    orient: "landscape",
  },
  {
    id: "1_3_aTiAl3OU-icXQisEIDY7jthfjJNbt",
    cat: "spokesperson",
    title: "Podcast host, made live",
    orient: "portrait",
  },
  {
    id: "1rz6lEFHumB5DM86O-twh33mQzULsxX3B",
    cat: "health",
    title: "Optician project",
    orient: "portrait",
  },
  {
    id: "1sk9K_tkAOzovQ5EuvlH1JOC8mV3G61tN",
    cat: "spokesperson",
    title: "Webinar mini-course promo",
    orient: "portrait",
  },
  {
    id: "15QQ1XkV1-V_j5ccOwtRvipFkAKrFFp7q",
    cat: "spokesperson",
    title: "Coach spokesperson 1",
    orient: "portrait",
  },
  {
    id: "1chI87LJB81q1QZr1tvmFB48GMR_gFKQe",
    cat: "spokesperson",
    title: "Coach spokesperson 3",
    orient: "portrait",
  },
  {
    id: "1U42aqdLF2xESf7Bw7WvLMNXX609A0wCC",
    cat: "fashion",
    title: "Hotel suite portrait",
    orient: "portrait",
  },
  {
    id: "184U-3SMcSoVgR6iRQOtdUwSKfNLYA06S",
    cat: "cinematic",
    title: "Sketchbook",
    orient: "portrait",
  },
  {
    id: "1OhcZecMsz3OcKjGD3FYzWbaG3XJj9ape",
    cat: "spokesperson",
    title: "Webinar teaser",
    orient: "portrait",
  },
  {
    id: "1noc1jsfMPeji_o2oXckLsRMCSMIoJBLX",
    cat: "pets",
    title: "Puppy and baby",
    orient: "portrait",
  },
  {
    id: "1za0_o-Ma1l68APXf4d7H2hLgyxC-7Ymv",
    cat: "pets",
    title: "Kitten and baby",
    orient: "portrait",
  },
  {
    id: "1m-Wr4Kbm_Up7Ok14P8z-7R6kiLTe90QH",
    cat: "pets",
    title: "Golden retriever hug",
    orient: "portrait",
  },
  {
    id: "1vO4Iml5xdrKO9w8x84hI_6581I_Q_AHw",
    cat: "meme",
    title: "Breakfast baby",
    orient: "portrait",
  },
  {
    id: "1KV9yhL5zGYULKjS4z4YJtA1RI9qhlztD",
    cat: "meme",
    title: "Skincare bite",
    orient: "portrait",
  },
  {
    id: "1UYQi-kOw2O1vl3HvXKKD9ApI4I5-foGT",
    cat: "meme",
    title: "Grin, reaction",
    orient: "portrait",
  },
  {
    id: "1E2vBTYMJAvYGyI3nRlDhaHaamwcinZiS",
    cat: "health",
    title: "Aesthetic clinic, lip treatment",
    orient: "portrait",
  },
  {
    id: "1ClGx3xOw_yTmkf9rt200h9lx_Z24QjEp",
    cat: "meme",
    title: "Wait for it",
    orient: "portrait",
  },
  {
    id: "18EP5fDE9yJwnmGSC8q91KHWO2g03EOJh",
    cat: "product",
    title: "Winter forest, cinematic 8s",
    orient: "landscape",
  },
  {
    id: "1lvihMGtcDBLNOIkbySfCqP5kXL9NbY0i",
    cat: "automation",
    title: "AI agents 24/7",
    orient: "portrait",
  },
  {
    id: "1BoTpohqioFBTuDEp2PFa5Az-EWQAeXPu",
    cat: "automation",
    title: "n8n + OpenAI automation",
    orient: "landscape",
  },
  {
    id: "12IA0ehZ0t96mHwiPRrvnRahj3FXS2PWQ",
    cat: "character",
    title: "Filmmaker panda 1",
    orient: "portrait",
  },
  {
    id: "1kvpK5DdmaHRSdoTpA0d3aWJ1zKEupztM",
    cat: "character",
    title: "Friendly panda 1",
    orient: "portrait",
  },
  {
    id: "1qm9Kz7ni5nt6ynANARoZswHpEoT1VThh",
    cat: "character",
    title: "Friendly panda 2",
    orient: "portrait",
  },
  {
    id: "1A5yHbwjtrqBP5s0PjgYakNvQoTAwoUkL",
    cat: "character",
    title: "Smart panda",
    orient: "portrait",
  },
  {
    id: "1Tja8TFifEfiPLb_5aY3RKaDQU87K13YF",
    cat: "meme",
    title: "Milk wali, Urdu",
    orient: "landscape",
  },
  {
    id: "1kPObFT--CUWxBjCmMXtrOM3rmOCiapmE",
    cat: "automation",
    title: "Spokesperson ad skit",
    orient: "landscape",
  },
  {
    id: "1sTFd86JZCOATc4SaLtiwn42zveF3jJmp",
    cat: "automation",
    title: "Baby sells AI video ads",
    orient: "landscape",
  },
  {
    id: "11sdbJwmDkMC83r1k2oAwDTm9ovvqYwPk",
    cat: "cinematic",
    title: "Eagle's grasp",
    orient: "landscape",
  },
  {
    id: "1ylUxM9pN91MD6AtUGLHve_S_Uy-xa9mD",
    cat: "automation",
    title: "GHL AI automation",
    orient: "portrait",
  },
  {
    id: "1x8vRxhoJSebLcCBH1O5VONABWeRVfBWD",
    cat: "automation",
    title: "Hotel owners in Bali, booking bot",
    orient: "landscape",
  },
  {
    id: "1kpim24ADAabVAK6vYfTIhgTLWhYXs2i-",
    cat: "automation",
    title: "HVAC spokesperson 1",
    orient: "portrait",
  },
  {
    id: "1HDfySQv5UEh6if8u_BpJDbZdDf6L7Jd1",
    cat: "automation",
    title: "HVAC spokesperson 2",
    orient: "portrait",
  },
  {
    id: "1tz9Zypwm3jER-T6aa4InnbOcwxOSIzh2",
    cat: "cinematic",
    title: "Long-form film",
    orient: "landscape",
  },
  {
    id: "19AQ-Z1XH3tjGYOYd_F_rsoJ9lsDSHP-u",
    cat: "character",
    title: "Long-form 2D explainer",
    orient: "landscape",
  },
  {
    id: "1epnpGPJnlFTDTueM5YC9-UNYvHpchdlb",
    cat: "cinematic",
    title: "Long-form opener, 48s A",
    orient: "landscape",
  },
  {
    id: "1vv4ad-M82j_4tA8T5SmvrkXC-1aFxJ78",
    cat: "cinematic",
    title: "Motivational AI",
    orient: "landscape",
  },
  {
    id: "1SxeMahrra7HlqVHP_ILYP795R9MBmulf",
    cat: "cinematic",
    title: "Night scroll",
    orient: "landscape",
  },
  {
    id: "10r871tsafCOvFIbwPD8yjUj1Llj0IPVh",
    cat: "cinematic",
    title: "Office wait",
    orient: "landscape",
  },
  {
    id: "1OyIa2fIO8Vyt-oQSjU82fUusgCZ24A5j",
    cat: "realestate",
    title: "Listing walk-through, Sora 2, part 2",
    orient: "portrait",
  },
  {
    id: "146uOnAzrRQHzC73VEIa7Tekt-rwxOyTa",
    cat: "realestate",
    title: "Listing walk-through, Sora 2, part 3",
    orient: "portrait",
  },
  {
    id: "1oCJH4WD-CiVDS45pZ_e41gBv7OsJIfri",
    cat: "realestate",
    title: "Listing walk-through, Sora 2, part 4",
    orient: "portrait",
  },
  {
    id: "1ndQSAkyN2Fply6w-u5SKeWu9_3Yyq_3p",
    cat: "realestate",
    title: "Listing walk-through, part 1",
    orient: "portrait",
  },
  {
    id: "1ZNLMRuxOGqE6Pi-qqBf8JGkyDUlgvD0x",
    cat: "meme",
    title: "Babies, Urdu version",
    orient: "landscape",
  },
  {
    id: "12f3uAK5Igs9mOzgliqomBOui9yHCHoYI",
    cat: "meme",
    title: "Babies, English version",
    orient: "landscape",
  },
  {
    id: "1qdv3eZRaWwEY8MDsW4ERbbNThZa1E0ks",
    cat: "cinematic",
    title: "Consistent character, scene 1",
    orient: "landscape",
  },
  {
    id: "1nzQ-m3oje7RGjW0buwiymlB0LzhTUl3X",
    cat: "cinematic",
    title: "Candlelit newborn",
    orient: "landscape",
  },
  {
    id: "1B80zbF8wNmZKd_cGvYjjFbUEsPNLt4Ff",
    cat: "cinematic",
    title: "This comeback is personal",
    orient: "portrait",
  },
  {
    id: "1JwWuMbUmeE7eqAoUH_3wgfnFXRDF2Ezl",
    cat: "character",
    title: "Panda in the city",
    orient: "portrait",
  },
  {
    id: "177MO5fRfo4ygQoMts-3cXGO4pfOAiv_u",
    cat: "spokesperson",
    title: "UGC creator, base take",
    orient: "portrait",
  },
  {
    id: "1bUBDOMTVblOyjIJyE6RiIvfIkaCCeAJf",
    cat: "cinematic",
    title: "Brand explosion opener",
    orient: "landscape",
  },
  {
    id: "1gtG8RY9QsP-Y5sUeSRWHgADRvx94F__B",
    cat: "product",
    title: "Modest-fashion TikTok style",
    orient: "landscape",
  },
  {
    id: "12T-DVzlC_Xb2Snfovbk4T3Gy13vxTg-c",
    cat: "meme",
    title: "Three babies, red caps",
    orient: "landscape",
  },
  {
    id: "1MbCYgsOLIqIYeXTLoEX8eiuvmkOVYYkq",
    cat: "meme",
    title: "Independence day kid",
    orient: "landscape",
  },
  {
    id: "1S-_b8d08R27WH3Nqzzc4EHfymatISi4P",
    cat: "meme",
    title: "Car argument",
    orient: "landscape",
  },
  {
    id: "1GwQb6jWddhVlEKBlZNBJXBFHSXpdZSvV",
    cat: "cinematic",
    title: "Library background",
    orient: "landscape",
  },
  {
    id: "14EbZI_K6OV-jHWazs7XSknsbah8H8jPF",
    cat: "character",
    title: "Cat at the laptop",
    orient: "landscape",
  },
  {
    id: "1qkO4Gh4P0hwizJuwmn_zkfaZ5H951WR7",
    cat: "character",
    title: "Baby boss, 3D",
    orient: "landscape",
  },
  {
    id: "1Dk_4bU5wx44wdpTfGnF07-mSmV-vHrXu",
    cat: "character",
    title: "Sleepy panda",
    orient: "landscape",
  },
  {
    id: "1rxNPOAFBn3Hxknbo8lQb7t1ItcCiUop5",
    cat: "fashion",
    title: "Hair reveal, 4s",
    orient: "landscape",
  },
  {
    id: "1yVb7Ftt1GLgqMIp3IAqP9X4o-mIogncQ",
    cat: "cinematic",
    title: "Crowd of phones 1",
    orient: "landscape",
  },
  {
    id: "1zbIpOb8w18K3jydKlVQSQI_m2tUSbSSF",
    cat: "cinematic",
    title: "Crowd of phones 2",
    orient: "landscape",
  },
  {
    id: "1sMSUQadxFVAB1LlLd9pcIok3fwRVJ39n",
    cat: "character",
    title: "Counter kid, 2D",
    orient: "landscape",
  },
  {
    id: "1Co5csVRgM9yw5XcA8-jGI8YBsKAFZNfr",
    cat: "character",
    title: "Neon kid, 2D",
    orient: "landscape",
  },
  {
    id: "1E-rci2xLQp5AjP40qfWd9I8Ul3_iLoC_",
    cat: "fashion",
    title: "Hair reveal 1",
    orient: "landscape",
  },
  {
    id: "1BzqbLJ-3GV2vgFHXjB6juDqu7f43vAMb",
    cat: "fashion",
    title: "Hair reveal 2",
    orient: "landscape",
  },
  {
    id: "1CoKKLAFYqQZMkmBU5IH02xDAXwvyFHGK",
    cat: "character",
    title: "Panda portrait 1",
    orient: "portrait",
  },
  {
    id: "1qrjB7NG8GDC6JOTe7fKM9TgtCpYcw0n2",
    cat: "character",
    title: "Panda bedtime",
    orient: "portrait",
  },
  {
    id: "1BsuAWkVbVhjtTJFPvquCKyB4nzZBXE7g",
    cat: "character",
    title: "Panda in shades",
    orient: "portrait",
  },
  {
    id: "1xvnsAuqxisEypHWNEhN88xu6mIz31IF_",
    cat: "product",
    title: "Holiday porch lights 1",
    orient: "portrait",
  },
  {
    id: "1ajNWiqUoQtkdXdJXbSLXfKDW9pRxxv_K",
    cat: "product",
    title: "Holiday porch lights 2",
    orient: "portrait",
  },
  {
    id: "1WIUmhTjgbF8rMDXHIi4mNnfxUFnZAvLq",
    cat: "product",
    title: "Holiday porch lights 3",
    orient: "portrait",
  },
  {
    id: "1Radcv4mtWiJYMiNXFq5QNL-zMHESDaph",
    cat: "product",
    title: "Bird feeder, pour",
    orient: "portrait",
  },
  {
    id: "1z1HksWYty1ozBP_b5x5FzrwpHti6cwie",
    cat: "product",
    title: "Bird feeder, garden",
    orient: "portrait",
  },
  {
    id: "1_519Ii2fATOqGctspUXN7T8cYk3vcv5K",
    cat: "product",
    title: "Bird feeder, sparrow",
    orient: "portrait",
  },
  {
    id: "1yoUQPrxTtdem-a1iM6r-EvRXnAWzJDeE",
    cat: "cinematic",
    title: "Lakeside, monochrome",
    orient: "landscape",
  },
  {
    id: "17lQ7T8tve_McrsPoobKoewkPk2OBb0jX",
    cat: "fashion",
    title: "Hijab fashion, mirror",
    orient: "landscape",
  },
  {
    id: "14bXhXNLuSBy2FojvqmZ4IMzsn26K5Z4M",
    cat: "fashion",
    title: "Hijab fashion, speaking",
    orient: "landscape",
  },
  {
    id: "14Xaf8PdfXDDq-aydah1M0DoCnJ1v3k91",
    cat: "fashion",
    title: "Surprise selfie 1",
    orient: "landscape",
  },
  {
    id: "1iECLhHMDqwn8hrF6n5Tb23-zkaI6y4eG",
    cat: "fashion",
    title: "Surprise selfie 2",
    orient: "landscape",
  },
  {
    id: "1C3W7w2oEEN6aXhlHySSbZSYIpgA5CSdD",
    cat: "pets",
    title: "Toddler and kitten",
    orient: "portrait",
  },
  {
    id: "1sgbR_jAWY0YtgWZr4-WD5JOIU0Y5qF4E",
    cat: "pets",
    title: "Baby and retriever",
    orient: "landscape",
  },
];

export const drivePreviewUrl = (id: string) =>
  `https://drive.google.com/file/d/${id}/preview`;
export const driveOpenUrl = (id: string) =>
  `https://drive.google.com/file/d/${id}/view`;
export const thumbUrl = (id: string) => `/aiportfolio/thumbs/${id}.webp`;
