import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Tytuł jest wymagany"],
      trim: true,
      minLength: [5, "Tytuł musi mieć przynajmniej 5 znaków"],
      maxLength: [128, "Tytuł może mieć maksymalnie 128 znaków"],
    },

    description: {
      type: String,
      required: [true, "Opis jest wymagany"],
      trim: true,
      minLength: [10, "Opis musi mieć przynajmniej 10 znaków"],
      maxLength: [20000, "Opis może mieć maksymalnie 20k znaków"],
    },

    price: {
      type: Number,
      required: [true, "Cena jest wymagana"],
      min: [1, "Cena musi być większa od 0"],
    },

    brand: {
      type: String,
      required: [true, "Marka jest wymagana"],
      enum: {
        values: [
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
        ],
        message: "Niepoprawna marka",
      },
    },

    model: {
      type: String,
      required: [true, "Model jest wymagany"],
      trim: true,
      minLength: [1, "Model musi mieć przynajmniej 1 znak"],
      maxLength: [64, "Model może mieć maksymalnie 64 znaki"],
    },

    year: {
      type: Number,
      required: [true, "Rok produkcji jest wymagany"],
      min: [1900, "Niepoprawny rok produkcji"],
      validate: {
        validator: function (value) {
          return value <= new Date().getFullYear() + 1;
        },
        message: "Rok nie może być z przyszłości",
      },
    },

    mileage: {
      type: Number,
      required: [true, "Przebieg jest wymagany"],
      min: [0, "Przebieg nie może być ujemny"],
    },

    bodyType: {
      type: String,
      required: [true, "Typ nadwozia jest wymagany"],
      enum: {
        values: [
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
        ],
        message: "Niepoprawny typ nadwozia",
      },
    },

    transmission: {
      type: String,
      required: [true, "Skrzynia biegów jest wymagana"],
      enum: {
        values: ["automatic"],
        message: "Niepoprawny typ skrzyni biegów",
      },
      default: "automatic",
    },

    driveType: {
      type: String,
      required: [true, "Typ napędu jest wymagany"],
      enum: {
        values: ["FWD", "RWD", "AWD"],
        message: "Niepoprawny typ napędu",
      },
    },

    powerHP: {
      type: Number,
      required: [true, "Moc jest wymagana"],
      min: [1, "Moc musi być większa od 0"],
    },

    batteryCapacityKWh: {
      type: Number,
      required: [true, "Pojemność baterii jest wymagana"],
      min: [1, "Pojemność baterii musi być większa od 0"],
    },

    batteryType: {
      type: String,
      required: [true, "Typ baterii jest wymagany"],
      enum: {
        values: ["LFP", "NMC", "NCA", "Inny"],
        message: "Niepoprawny typ baterii",
      },
    },

    rangeKm: {
      type: Number,
      required: [true, "Zasięg jest wymagany"],
      min: [1, "Zasięg musi być większy od 0"],
    },

    chargingPowerDC: {
      type: Number,
      min: [0, "Moc ładowania nie może być ujemna"],
    },

    city: {
      type: String,
      required: [true, "Miasto jest wymagane"],
      trim: true,
      minLength: [2, "Miasto musi mieć przynajmniej 2 znaki"],
      maxLength: [64, "Miasto może mieć maksymalnie 64 znaki"],
    },

    voivodeship: {
      type: String,
      required: [true, "Województwo jest wymagane"],
      enum: {
        values: [
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
        ],
        message: "Niepoprawne województwo",
      },
    },

    sellerType: {
      type: String,
      required: [true, "Typ sprzedawcy jest wymagany"],
      enum: {
        values: ["private", "dealer"],
        message: "Niepoprawny typ sprzedawcy",
      },
      default: "private",
    },

    status: {
      type: String,
      required: [true, "Status ogłoszenia jest wymagany"],
      enum: {
        values: ["active", "sold", "hidden"],
        message: "Niepoprawny status ogłoszenia",
      },
      default: "active",
    },

    isBatteryOwned: {
      type: Boolean,
      required: [true, "Informacja o własności baterii jest wymagana"],
      default: true,
    },

    accidentFree: {
      type: Boolean,
      required: [true, "Informacja o bezwypadkowości jest wymagana"],
      default: true,
    },

    serviceHistory: {
      type: Boolean,
      default: false,
    },

    vatInvoice: {
      type: Boolean,
      required: [true, "Informacja o fakturze VAT jest wymagana"],
      default: false,
    },

    imageUrls: [
      {
        type: String,
      },
    ],

    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Użytkownik jest wymagany"],
    },
  },
  {
    timestamps: true,
  },
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
