import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Link from "next/link";
import { Item } from "@prisma/client";
import { getItemById } from "../lib/actions/db/inventory/items.actions";

const ItemBody = () => {
  // get the item id from the query string
  const params = useSearchParams();
  const itemID = params.get("id");

  // get the item from the database
  const [item, setItem] = useState<Item | null>(null);
  useEffect(() => {
    if (itemID) {
      getItemById(itemID).then((item) => {
        setItem(item);
      });
    }
  }, [itemID]);

  return item ? (
    // Item available
    <div className="bg-base-100 p-8 mt-8 border rounded-xl border-accent">
      <h1 className="text-4xl font-bold text-center">
        {item.name}
        <div className="divider "></div>
      </h1>
      <p className="text-center mt-4 text-xl">{item.description}</p>
      <div className="divider "></div>
      <p className="text-center mt-4">
        <span className="font-bold">Price: </span>
        {item.price} USD
      </p>
      <div className="divider "></div>
      <Link
        href="/checkout"
        className="text-center mt-4 text-xl btn btn-primary btn-lg w-full text-white"
      >
        Buy Now
      </Link>
    </div>
  ) : (
    //No item available
    <div className="bg-base-100 p-8 mt-8 border rounded-xl border-accent">
      <h1 className="text-4xl font-bold text-center">
        Item not found
        <div className="divider "></div>
      </h1>
      <p className="text-center mt-4 text-xl">
        The item you are looking for does not exist.
      </p>
    </div>
  );
};

export default ItemBody;
