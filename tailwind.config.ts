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
  plugins: [require("daisyui")],
};
export default config;
