"use client";
import { useState, useEffect } from "react";
import BodyWrapper from "@/src/components/BodyWrapper";
import {
  getItems,
  getItemsByQuery,
} from "@/src/lib/actions/db/inventory/items.actions";
import { Item } from "@prisma/client";
import Link from "next/link";
import Rating from "@/src/components/Rating";
//store page
export const Home = () => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (search === "") {
      getItems().then((data) => {
        setItems(data);
      });
      return;
    }
    getItemsByQuery(search).then((data) => {
      setItems(data);
      console.log(items);
    });
  };
  useEffect(() => {
    getItems().then((data) => {
      setItems(data);
    });
  }, []);
  return (
    <BodyWrapper>
      <div className="min-h-screen bg-base-200 flex  flex-col ">
        <div className="form-wrapper flex  items-center justify-center">
          <form
            className="input input-bordered flex items-center gap-2 mt-10 mx-3 border border-accent max-w-2xl w-full "
            onSubmit={(e) => {
              handleSearch(e);
            }}
          >
            <input
              type="text"
              className="grow"
              placeholder="Search Parts"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-5 h-5  "
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  mt-5 place-items-center ">
          {items.map((item) => (
            <Link
              href={`/store/item?id=${item.id}`}
              key={item.id}
              className="card bordered shadow-lg w-full min-h-96 p-2 min-w-64"
            >
              <figure>
                <img src={"/not-found.png"} alt={"err"} />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-sm">{item.name}</h2>
                <p className="text-primary">${item.price}</p>
                <Rating
                  rating={item.ratings || 5}
                  size="md"
                  name={`rating-${item.id}`}
                />
                <div className="divider"></div>
                <div className="card-actions space-between w-full">
                  <button className="btn btn-accent ">View</button>
                  <button className="btn btn-primary ">Buy Now</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </BodyWrapper>
  );
};

export default Home;
