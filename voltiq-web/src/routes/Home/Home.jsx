import { Hero } from "../../components/Hero/Hero";
import { CenteredContent } from "../../components/CenteredContent/CenteredContent";
import { LatestListings } from "../../components/LatestListings/LatestListings";
import { ContentBox } from "../../components/ContentBox/ContentBox";
import { FeaturedCities } from "../../components/FeaturedCities/FeaturedCities";
import { Faq } from "../../components/Faq/Faq";

export const Home = () => {
  return (
    <>
      <Hero />
      <CenteredContent>
        <ContentBox title="Nowe samochody elektryczne">
          <LatestListings status="active" condition="new" />
        </ContentBox>

        <ContentBox title="Najpopularniejsze miasta">
          <FeaturedCities />
        </ContentBox>

        <ContentBox title="Używane samochody elektryczne">
          <LatestListings status="active" condition="used" />
        </ContentBox>

        <ContentBox>
          <Faq />
        </ContentBox>
      </CenteredContent>
    </>
  );
};
