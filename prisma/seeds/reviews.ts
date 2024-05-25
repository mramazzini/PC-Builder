import { Review } from "@prisma/client";

const reviews: Review[] = [
  {
    id: 1,
    content: "Great mouse, very responsive and comfortable.",
    rating: 5,
    itemId: 1,
  },
  {
    id: 2,
    content: "Excellent product! Does exactly what it says on the box.",
    rating: 5,
    itemId: 2,
  },
  {
    id: 3,
    content: "Superb quality and performance. Highly recommended!",
    rating: 5,
    itemId: 3,
  },
  {
    id: 4,
    content: "This mouse exceeded my expectations. Love it!",
    rating: 5,
    itemId: 4,
  },
  {
    id: 5,
    content: "The best mouse I've ever used. So glad I bought it.",
    rating: 5,
    itemId: 5,
  },
  {
    id: 6,
    content: "Responsive, comfortable, and durable. Couldn't ask for more.",
    rating: 5,
    itemId: 6,
  },
  {
    id: 7,
    content: "Impressed by the quality and precision of this mouse.",
    rating: 5,
    itemId: 7,
  },
  {
    id: 8,
    content: "Feels great in hand and performs exceptionally well.",
    rating: 5,
    itemId: 8,
  },
  {
    id: 9,
    content: "Absolutely fantastic mouse. Makes work a breeze.",
    rating: 5,
    itemId: 9,
  },
  {
    id: 10,
    content: "Couldn't be happier with this purchase. 10/10.",
    rating: 5,
    itemId: 10,
  },
  {
    id: 11,
    content: "Incredibly responsive and comfortable to use for long periods.",
    rating: 5,
    itemId: 11,
  },
  {
    id: 12,
    content: "This mouse is a game-changer. Highly recommended!",
    rating: 5,
    itemId: 12,
  },
  {
    id: 13,
    content: "Sleek design, comfortable grip, and precise tracking.",
    rating: 5,
    itemId: 13,
  },
  {
    id: 14,
    content: "The build quality is top-notch. Worth every penny.",
    rating: 5,
    itemId: 14,
  },
  {
    id: 15,
    content: "Absolutely love this mouse. Makes computing a joy.",
    rating: 5,
    itemId: 15,
  },
  {
    id: 16,
    content: "This mouse feels like an extension of my hand. Perfect!",
    rating: 5,
    itemId: 16,
  },
  {
    id: 17,
    content: "Responsive, comfortable, and stylish. Couldn't ask for more.",
    rating: 5,
    itemId: 17,
  },
  {
    id: 18,
    content: "Flawless performance and ergonomic design. A must-buy!",
    rating: 5,
    itemId: 1,
  },
  {
    id: 19,
    content: "Best mouse I've ever owned. It's like it reads my mind.",
    rating: 5,
    itemId: 2,
  },
  {
    id: 20,
    content: "This mouse has improved my workflow tremendously. Thank you!",
    rating: 5,
    itemId: 3,
  },
  {
    id: 21,
    content: "No more wrist strain with this mouse. Truly ergonomic.",
    rating: 5,
    itemId: 4,
  },
  {
    id: 22,
    content: "Works flawlessly on any surface. Highly versatile.",
    rating: 5,
    itemId: 5,
  },
  {
    id: 23,
    content: "Perfect for gaming and productivity alike. A true all-rounder.",
    rating: 5,
    itemId: 6,
  },
  {
    id: 24,
    content: "The precision is unmatched. Great for graphic design work.",
    rating: 5,
    itemId: 7,
  },
  {
    id: 25,
    content:
      "I can't imagine using any other mouse after experiencing this one.",
    rating: 5,
    itemId: 8,
  },
  {
    id: 26,
    content: "This mouse fits my hand perfectly. It's like it was made for me.",
    rating: 5,
    itemId: 9,
  },
  {
    id: 27,
    content:
      "The scroll wheel is so smooth. Makes scrolling through long documents effortless.",
    rating: 5,
    itemId: 10,
  },
  {
    id: 28,
    content: "Battery life is impressive. Rarely need to recharge it.",
    rating: 5,
    itemId: 11,
  },
  {
    id: 29,
    content: "The customizable buttons are a game-changer for productivity.",
    rating: 5,
    itemId: 12,
  },
  {
    id: 30,
    content:
      "Works seamlessly with my laptop and desktop. Great compatibility.",
    rating: 5,
    itemId: 13,
  },
  {
    id: 31,
    content:
      "The matte finish feels great and resists fingerprints. Looks sleek on my desk.",
    rating: 5,
    itemId: 14,
  },
  {
    id: 32,
    content: "Even after hours of use, my hand never feels fatigued.",
    rating: 5,
    itemId: 15,
  },
  {
    id: 33,
    content: "The sensor is incredibly accurate. Perfect for precision work.",
    rating: 5,
    itemId: 16,
  },
  {
    id: 34,
    content: "The wireless connection is stable with no noticeable lag.",
    rating: 5,
    itemId: 17,
  },
  {
    id: 35,
    content:
      "This mouse has made gaming much more enjoyable. No more missed shots due to lag.",
    rating: 5,
    itemId: 1,
  },
  {
    id: 36,
    content: "The design is sleek and modern. Looks great on my gaming setup.",
    rating: 5,
    itemId: 2,
  },
  {
    id: 37,
    content:
      "The RGB lighting adds a cool aesthetic touch. Can customize it to match my mood.",
    rating: 5,
    itemId: 3,
  },
  {
    id: 38,
    content:
      "The software is intuitive and easy to use for customizing settings.",
    rating: 5,
    itemId: 4,
  },
  {
    id: 39,
    content: "The weight distribution is perfect. Feels balanced in my hand.",
    rating: 5,
    itemId: 5,
  },
  {
    id: 40,
    content:
      "The DPI settings are adjustable on the fly, great for switching between tasks.",
    rating: 5,
    itemId: 6,
  },
  {
    id: 41,
    content:
      "The build quality is outstanding. Feels like it will last for years.",
    rating: 5,
    itemId: 7,
  },
  {
    id: 42,
    content:
      "The side buttons are positioned perfectly for quickaccess during gaming. No more fumbling around.",
    rating: 5,
    itemId: 8,
  },
  {
    id: 43,
    content:
      "The click feedback is satisfyingly tactile. Makes every click feel deliberate.",
    rating: 5,
    itemId: 9,
  },
  {
    id: 44,
    content:
      "The battery lasts for days on a single charge. Perfect for long gaming sessions.",
    rating: 5,
    itemId: 10,
  },
  {
    id: 45,
    content:
      "The ergonomics are top-notch. No more hand cramps after marathon gaming sessions.",
    rating: 5,
    itemId: 11,
  },
  {
    id: 46,
    content:
      "The mouse glides smoothly across my mousepad. Makes aiming in FPS games effortless.",
    rating: 5,
    itemId: 12,
  },
  {
    id: 47,
    content:
      "The build materials feel premium. Doesn't feel cheap or plasticky.",
    rating: 5,
    itemId: 13,
  },
  {
    id: 48,
    content:
      "The braided cable is durable and tangle-resistant. Great for those who prefer wired connections.",
    rating: 5,
    itemId: 14,
  },
  {
    id: 49,
    content:
      "The onboard memory stores my custom settings, even when switching computers.",
    rating: 5,
    itemId: 15,
  },
  {
    id: 50,
    content:
      "The customer support is excellent. Had a minor issue and it was resolved quickly.",
    rating: 5,
    itemId: 16,
  },
];

export default reviews;
