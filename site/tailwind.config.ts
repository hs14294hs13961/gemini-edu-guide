import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.mdx"],
  theme: {
    extend: {
      colors: {
        primary: "#0066cc",
        "primary-focus": "#0071e3",
        "primary-on-dark": "#2997ff",
        canvas: "#ffffff",
        parchment: "#f5f5f7",
        pearl: "#fafafc",
        "tile-1": "#272729",
        "tile-2": "#2a2a2c",
        "tile-3": "#252527",
        ink: "#1d1d1f",
        "ink-80": "#333333",
        "ink-48": "#7a7a7a",
        hairline: "#e0e0e0",
        "divider-soft": "#f0f0f0",
      },
      borderRadius: {
        card: "18px",
        utility: "8px",
        capsule: "11px",
      },
      fontFamily: {
        sans: [
          "-apple-system", "SF Pro TC", "PingFang TC", "Noto Sans TC",
          "Inter", "Microsoft JhengHei", "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
