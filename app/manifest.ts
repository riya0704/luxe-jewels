import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LUXE Fine Jewellery",
    short_name: "LUXE",
    description:
      "Discover handcrafted luxury jewellery — rings, necklaces, bracelets, earrings, and limited-edition collections.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
