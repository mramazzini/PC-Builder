import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
          primary: "#00daff",

          secondary: "#0098c7",

          accent: "#00d356",

          neutral: "#0c030a",

          "base-100": "#24273c",

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
