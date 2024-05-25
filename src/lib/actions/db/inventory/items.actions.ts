"use server";

import { Item, PrismaClient, Review } from "@prisma/client";
import { searchItems } from "@/src/lib/utils/helpers";
const db = new PrismaClient();

export const getItems = async (): Promise<Item[]> => {
  const data = await db.item.findMany();
  return data;
};

export const getItemsByQuery = async (query: string): Promise<Item[]> => {
  const data = await db.item.findMany();
  return searchItems(data, ["name", "description"], query);
};

export const getItemById = async (
  id: string | number
): Promise<Item | null> => {
  if (typeof id === "string") {
    id = parseInt(id);
  }
  const data = await db.item.findUnique({
    where: {
      id: id,
    },
    //with review
    include: {
      reviews: true,
    },
  });
  return data;
};
