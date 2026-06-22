import { useLoaderData } from "react-router-dom";
import { CenteredContent } from "../../components/CenteredContent/CenteredContent";
import { ContentBox } from "../../components/ContentBox/ContentBox";
import { MediaGallery } from "../../components/MediaGallery/MediaGallery";
import { formatDate } from "../../utils/formatDate";
import { DataSpecs } from "../../components/DataSpecs/DataSpecs";
import { Box } from "@mui/material";
import { ListingSidebar } from "../../components/ListingSidebar/ListingSidebar";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { getSellerLabel } from "../../utils/getSellerLabel";
import { RecommendedListings } from "../../components/RecommendedListings/RecommendedListings ";

export const ListingPage = () => {
  const listing = useLoaderData();

  const detailsSections = [
    {
      title: "Podstawowe",
      icon: DirectionsCarIcon,
      data: [
        { label: "Rok produkcji", value: listing.year },
        {
          label: "Przebieg",
          value: `${listing.mileage?.toLocaleString("pl-PL")} km`,
        },
        { label: "Typ nadwozia", value: listing.bodyType },
        { label: "Napęd", value: listing.driveType },
        { label: "Skrzynia biegów", value: listing.transmission },
      ],
    },

    {
      title: "Elektryka",
      icon: ElectricBoltIcon,
      data: [
        { label: "Moc", value: `${listing.powerHP} KM` },
        {
          label: "Pojemność baterii",
          value: `${listing.batteryCapacityKWh} kWh`,
        },
        { label: "Typ baterii", value: listing.batteryType },
        { label: "Zasięg (WLTP)", value: `${listing.rangeKm} km` },
        {
          label: "Maks. ładowanie DC",
          value: `${listing.chargingPowerDC} kW`,
        },
      ],
    },

    {
      title: "Lokalizacja",
      icon: LocationOnIcon,
      data: [
        { label: "Miasto", value: listing.city },
        { label: "Województwo", value: listing.voivodeship },
      ],
    },

    {
      title: "Informacje handlowe",
      icon: StorefrontIcon,
      data: [
        {
          label: "Sprzedawca",
          value: getSellerLabel(listing.sellerType),
        },
        { label: "Faktura VAT", value: listing.vatInvoice, type: "boolean" },
        { label: "Bezwypadkowy", value: listing.accidentFree, type: "boolean" },
        {
          label: "Historia serwisowa",
          value: listing.serviceHistory,
          type: "boolean",
        },
        {
          label: "Własność baterii",
          value: listing.isBatteryOwned,
          type: "boolean",
        },
        { label: "Aktualizacja", value: formatDate(listing.updatedAt) },
      ],
    },
  ];

  return (
    <CenteredContent>
      <ContentBox title={listing.title}>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", md: "2fr 1fr" }}
          gap={3}
        >
          <MediaGallery images={listing.imageUrls} />

          <ListingSidebar listing={listing} />
        </Box>
      </ContentBox>

      <ContentBox isSection title="Opis">
        <div dangerouslySetInnerHTML={{ __html: listing.description }} />
      </ContentBox>

      <ContentBox isSection>
        <DataSpecs sections={detailsSections} />
      </ContentBox>

      <ContentBox title="Zobacz również">
        <RecommendedListings excludeId={listing._id} />
      </ContentBox>
    </CenteredContent>
  );
};
