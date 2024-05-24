import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#E1410D",

          secondary: "#00daff",

          accent: "#00daff",

          neutral: "#0c030a",

          "base-100": "#121212",

          info: "#00dcff",

          success: "#4b8200",

          warning: "#cea200",

          error: "#da0044",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    require("tailwindcss-fluid")({
      textSizes: {
        "fluid-xs": { min: "0.75rem", max: "1rem" },
        "fluid-sm": { min: "0.875rem", max: "1.125rem" },
        "fluid-base": { min: "1rem", max: "1.25rem" },
        "fluid-lg": { min: "1.125rem", max: "1.5rem" },
        "fluid-xl": { min: "1.25rem", max: "1.75rem" },
        "fluid-2xl": { min: "1.5rem", max: "2rem" },
        "fluid-3xl": { min: "1.875rem", max: "2.25rem" },
        "fluid-4xl": { min: "2.25rem", max: "2.5rem" },
        "fluid-5xl": { min: "3rem", max: "3.5rem" },
        "fluid-6xl": { min: "4rem", max: "5rem" },
      },
    }),
  ],
};
export default config;
