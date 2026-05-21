/**
 * 48 lower-US states for programmatic SEO landing pages.
 * Used by /locations/[state] dynamic route.
 */

export type StateEntry = {
  slug: string;
  name: string;
  abbr: string;
  cities: string[];
  industries: string[];
};

export const STATES: StateEntry[] = [
  { slug: "alabama", name: "Alabama", abbr: "AL", cities: ["Birmingham", "Huntsville", "Mobile", "Montgomery", "Tuscaloosa"], industries: ["healthcare", "aerospace", "automotive"] },
  { slug: "arizona", name: "Arizona", abbr: "AZ", cities: ["Phoenix", "Tucson", "Scottsdale", "Mesa", "Tempe"], industries: ["real estate", "healthcare", "tourism"] },
  { slug: "arkansas", name: "Arkansas", abbr: "AR", cities: ["Little Rock", "Fayetteville", "Bentonville", "Fort Smith", "Rogers"], industries: ["retail", "agriculture", "logistics"] },
  { slug: "california", name: "California", abbr: "CA", cities: ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento"], industries: ["tech", "entertainment", "wellness"] },
  { slug: "colorado", name: "Colorado", abbr: "CO", cities: ["Denver", "Colorado Springs", "Boulder", "Fort Collins", "Aurora"], industries: ["outdoor", "tech", "cannabis"] },
  { slug: "connecticut", name: "Connecticut", abbr: "CT", cities: ["Hartford", "New Haven", "Stamford", "Bridgeport", "Greenwich"], industries: ["finance", "insurance", "healthcare"] },
  { slug: "delaware", name: "Delaware", abbr: "DE", cities: ["Wilmington", "Dover", "Newark", "Middletown", "Smyrna"], industries: ["finance", "legal", "chemical"] },
  { slug: "florida", name: "Florida", abbr: "FL", cities: ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale"], industries: ["real estate", "hospitality", "healthcare"] },
  { slug: "georgia", name: "Georgia", abbr: "GA", cities: ["Atlanta", "Savannah", "Augusta", "Athens", "Columbus"], industries: ["logistics", "film", "fintech"] },
  { slug: "idaho", name: "Idaho", abbr: "ID", cities: ["Boise", "Meridian", "Nampa", "Idaho Falls", "Coeur d'Alene"], industries: ["agriculture", "tech", "outdoor recreation"] },
  { slug: "illinois", name: "Illinois", abbr: "IL", cities: ["Chicago", "Naperville", "Aurora", "Springfield", "Rockford"], industries: ["finance", "manufacturing", "logistics"] },
  { slug: "indiana", name: "Indiana", abbr: "IN", cities: ["Indianapolis", "Fort Wayne", "Bloomington", "Carmel", "Evansville"], industries: ["manufacturing", "pharma", "logistics"] },
  { slug: "iowa", name: "Iowa", abbr: "IA", cities: ["Des Moines", "Cedar Rapids", "Iowa City", "Davenport", "Sioux City"], industries: ["agriculture", "insurance", "fintech"] },
  { slug: "kansas", name: "Kansas", abbr: "KS", cities: ["Wichita", "Overland Park", "Kansas City", "Topeka", "Olathe"], industries: ["aerospace", "agriculture", "energy"] },
  { slug: "kentucky", name: "Kentucky", abbr: "KY", cities: ["Louisville", "Lexington", "Bowling Green", "Owensboro", "Covington"], industries: ["bourbon", "healthcare", "logistics"] },
  { slug: "louisiana", name: "Louisiana", abbr: "LA", cities: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles"], industries: ["energy", "hospitality", "shipping"] },
  { slug: "maine", name: "Maine", abbr: "ME", cities: ["Portland", "Lewiston", "Bangor", "South Portland", "Auburn"], industries: ["tourism", "seafood", "forestry"] },
  { slug: "maryland", name: "Maryland", abbr: "MD", cities: ["Baltimore", "Annapolis", "Frederick", "Rockville", "Bethesda"], industries: ["biotech", "cybersecurity", "healthcare"] },
  { slug: "massachusetts", name: "Massachusetts", abbr: "MA", cities: ["Boston", "Cambridge", "Worcester", "Springfield", "Lowell"], industries: ["biotech", "education", "fintech"] },
  { slug: "michigan", name: "Michigan", abbr: "MI", cities: ["Detroit", "Grand Rapids", "Ann Arbor", "Lansing", "Troy"], industries: ["automotive", "manufacturing", "healthcare"] },
  { slug: "minnesota", name: "Minnesota", abbr: "MN", cities: ["Minneapolis", "Saint Paul", "Rochester", "Duluth", "Bloomington"], industries: ["healthcare", "retail", "fintech"] },
  { slug: "mississippi", name: "Mississippi", abbr: "MS", cities: ["Jackson", "Gulfport", "Southaven", "Hattiesburg", "Biloxi"], industries: ["healthcare", "agriculture", "manufacturing"] },
  { slug: "missouri", name: "Missouri", abbr: "MO", cities: ["Kansas City", "Saint Louis", "Springfield", "Columbia", "Independence"], industries: ["agriculture", "transportation", "healthcare"] },
  { slug: "montana", name: "Montana", abbr: "MT", cities: ["Billings", "Missoula", "Bozeman", "Great Falls", "Helena"], industries: ["agriculture", "outdoor recreation", "mining"] },
  { slug: "nebraska", name: "Nebraska", abbr: "NE", cities: ["Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney"], industries: ["agriculture", "insurance", "fintech"] },
  { slug: "nevada", name: "Nevada", abbr: "NV", cities: ["Las Vegas", "Henderson", "Reno", "Carson City", "Sparks"], industries: ["hospitality", "gaming", "real estate"] },
  { slug: "new-hampshire", name: "New Hampshire", abbr: "NH", cities: ["Manchester", "Nashua", "Concord", "Portsmouth", "Dover"], industries: ["healthcare", "manufacturing", "tourism"] },
  { slug: "new-jersey", name: "New Jersey", abbr: "NJ", cities: ["Newark", "Jersey City", "Hoboken", "Princeton", "Trenton"], industries: ["pharma", "finance", "logistics"] },
  { slug: "new-mexico", name: "New Mexico", abbr: "NM", cities: ["Albuquerque", "Santa Fe", "Las Cruces", "Rio Rancho", "Roswell"], industries: ["energy", "tourism", "aerospace"] },
  { slug: "new-york", name: "New York", abbr: "NY", cities: ["New York City", "Brooklyn", "Buffalo", "Rochester", "Albany"], industries: ["finance", "media", "fashion"] },
  { slug: "north-carolina", name: "North Carolina", abbr: "NC", cities: ["Charlotte", "Raleigh", "Durham", "Greensboro", "Winston-Salem"], industries: ["fintech", "biotech", "logistics"] },
  { slug: "north-dakota", name: "North Dakota", abbr: "ND", cities: ["Fargo", "Bismarck", "Grand Forks", "Minot", "West Fargo"], industries: ["energy", "agriculture", "manufacturing"] },
  { slug: "ohio", name: "Ohio", abbr: "OH", cities: ["Columbus", "Cleveland", "Cincinnati", "Dayton", "Akron"], industries: ["healthcare", "manufacturing", "logistics"] },
  { slug: "oklahoma", name: "Oklahoma", abbr: "OK", cities: ["Oklahoma City", "Tulsa", "Norman", "Edmond", "Broken Arrow"], industries: ["energy", "agriculture", "aerospace"] },
  { slug: "oregon", name: "Oregon", abbr: "OR", cities: ["Portland", "Eugene", "Salem", "Bend", "Hillsboro"], industries: ["tech", "wellness", "outdoor"] },
  { slug: "pennsylvania", name: "Pennsylvania", abbr: "PA", cities: ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Harrisburg"], industries: ["healthcare", "education", "finance"] },
  { slug: "rhode-island", name: "Rhode Island", abbr: "RI", cities: ["Providence", "Warwick", "Cranston", "Newport", "Pawtucket"], industries: ["healthcare", "education", "tourism"] },
  { slug: "south-carolina", name: "South Carolina", abbr: "SC", cities: ["Charleston", "Columbia", "Greenville", "Myrtle Beach", "Mount Pleasant"], industries: ["hospitality", "automotive", "logistics"] },
  { slug: "south-dakota", name: "South Dakota", abbr: "SD", cities: ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings", "Watertown"], industries: ["agriculture", "tourism", "finance"] },
  { slug: "tennessee", name: "Tennessee", abbr: "TN", cities: ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Franklin"], industries: ["healthcare", "music", "logistics"] },
  { slug: "texas", name: "Texas", abbr: "TX", cities: ["Houston", "Austin", "Dallas", "San Antonio", "Fort Worth"], industries: ["energy", "tech", "real estate"] },
  { slug: "utah", name: "Utah", abbr: "UT", cities: ["Salt Lake City", "Provo", "Lehi", "Park City", "Ogden"], industries: ["tech", "outdoor", "fintech"] },
  { slug: "vermont", name: "Vermont", abbr: "VT", cities: ["Burlington", "Montpelier", "Stowe", "Rutland", "South Burlington"], industries: ["tourism", "agriculture", "wellness"] },
  { slug: "virginia", name: "Virginia", abbr: "VA", cities: ["Richmond", "Virginia Beach", "Arlington", "Norfolk", "Alexandria"], industries: ["defense", "tech", "healthcare"] },
  { slug: "washington", name: "Washington", abbr: "WA", cities: ["Seattle", "Bellevue", "Tacoma", "Spokane", "Redmond"], industries: ["tech", "aerospace", "wellness"] },
  { slug: "west-virginia", name: "West Virginia", abbr: "WV", cities: ["Charleston", "Huntington", "Morgantown", "Parkersburg", "Wheeling"], industries: ["energy", "healthcare", "tourism"] },
  { slug: "wisconsin", name: "Wisconsin", abbr: "WI", cities: ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Appleton"], industries: ["manufacturing", "dairy", "healthcare"] },
  { slug: "wyoming", name: "Wyoming", abbr: "WY", cities: ["Cheyenne", "Casper", "Laramie", "Gillette", "Rock Springs"], industries: ["energy", "tourism", "agriculture"] },
];

export function getStateBySlug(slug: string): StateEntry | undefined {
  return STATES.find((s) => s.slug === slug);
}
