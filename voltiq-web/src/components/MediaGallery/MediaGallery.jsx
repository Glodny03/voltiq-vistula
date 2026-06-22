import { useEffect, useState } from "react";
import { Box, Stack, ButtonBase } from "@mui/material";
import { BACKEND_URL } from "../../constants/api";

export const MediaGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  if (!images.length) {
    return null;
  }

  return (
    <Stack spacing={{ xs: 1.5, sm: 2 }}>
      <Box
        component="img"
        border={1}
        borderColor="grey.200"
        src={`${BACKEND_URL}${selectedImage}`}
        width="100%"
        sx={{
          aspectRatio: "16 / 9",
          objectFit: "cover",
          borderRadius: 2,
        }}
      />

      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 1.5 }}
        sx={{ overflowX: "auto" }}
        paddingBottom={1}
      >
        {images.map((imgUrl, i) => {
          const isActive = selectedImage === imgUrl;

          return (
            <ButtonBase
              key={`${imgUrl}-${i}`}
              onClick={() => setSelectedImage(imgUrl)}
              sx={{
                borderRadius: 2,
                flexShrink: 0,
                overflow: "hidden",
                border: 2,
                borderColor: isActive ? "primary.main" : "grey.200",
              }}
            >
              <Box
                component="img"
                src={`${BACKEND_URL}${imgUrl}`}
                sx={{
                  width: { xs: 90, sm: 110, md: 130 },
                  height: { xs: 60, sm: 75, md: 85 },
                  objectFit: "cover",
                }}
              />
            </ButtonBase>
          );
        })}
      </Stack>
    </Stack>
  );
};
