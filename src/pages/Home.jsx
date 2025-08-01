import React, { useState, useEffect } from "react";

import { nanoid } from "nanoid";
import Cards from "../components/Cards";
import Button from "../components/Button";

const Home = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        if (!response.ok) {
          throw new Error("Error fetching data from the api");
        }
        const data = await response.json();
        console.log("data", data);
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <main>
      <div className=" flex flex-col sm:flex-row flex-center w-[max-content] sm:flex-start gap-6 mx-auto  sm:mx-16 my-6 ">
        {categories.map(category => {
          return <Button key={nanoid()} category={category} />;
        })}
      </div>
      <Cards />
    </main>
  );
};

export default Home;
