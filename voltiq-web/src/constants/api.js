// TODO: CHANGE_FOR_PROD
export const BACKEND_URL = "http://localhost:3000";

export const BRAND_OPTIONS = [
  "Aixam",
  "Alfa Romeo",
  "Audi",
  "Baic",
  "BAW",
  "BMW",
  "BYD",
  "Chevrolet",
  "Citroen",
  "Cupra",
  "Dacia",
  "DFSK",
  "Dodge",
  "DS Automobiles",
  "e.GO",
  "Fiat",
  "Ford",
  "Geely",
  "Honda",
  "Hongqi",
  "Hummer",
  "Hyundai",
  "Jaecoo",
  "Jaguar",
  "Jeep",
  "Kia",
  "Leapmotor",
  "Lexus",
  "Ligier",
  "Lucid",
  "Maserati",
  "Maxus",
  "Mazda",
  "Mercedes-Benz",
  "MG",
  "Microcar",
  "Mini",
  "Mitsubishi",
  "Nissan",
  "Omoda",
  "Opel",
  "Peugeot",
  "Porsche",
  "Renault",
  "Rolls-Royce",
  "Seat",
  "Skoda",
  "Smart",
  "SsangYong / KGM",
  "Subaru",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
  "Inna",
];

export const BODY_TYPE_OPTIONS = [
  "SUV",
  "Sedan",
  "Hatchback",
  "Kombi",
  "Coupe",
  "Van",
  "Pickup",
  "Crossover",
  "Liftback",
  "Inny",
];

export const DRIVE_TYPE_OPTIONS = ["FWD", "RWD", "AWD"];

export const BATTERY_TYPE_OPTIONS = ["LFP", "NMC", "NCA", "Inny"];

export const SELLER_TYPE_OPTIONS = [
  { value: "private", label: "Osoba prywatna" },
  { value: "dealer", label: "Dealer" },
];

export const STATUS_OPTIONS = ["active", "sold", "hidden"];

export const VOIVODESHIP_OPTIONS = [
  "Dolnośląskie",
  "Kujawsko-Pomorskie",
  "Lubelskie",
  "Lubuskie",
  "Łódzkie",
  "Małopolskie",
  "Mazowieckie",
  "Opolskie",
  "Podkarpackie",
  "Podlaskie",
  "Pomorskie",
  "Śląskie",
  "Świętokrzyskie",
  "Warmińsko-Mazurskie",
  "Wielkopolskie",
  "Zachodniopomorskie",
];

export const YEAR_OPTIONS = Array.from(
  { length: new Date().getFullYear() - 2000 + 1 },
  (_, i) => new Date().getFullYear() - i,
);
