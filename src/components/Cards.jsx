import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import ProductContext from "../context/ProductContext.jsx";
import useProducts from "../hooks/UseProducts.jsx";
const Cards = () => {
  /*   const { products, setProducts } = useContext(ProductContext); */

  const { products, setProducts } = useProducts();
  /*   const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Error fetching data from the api");
        }
        const data = await response.json();
        console.log("data", data);
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []); */
  return (
    <div className="grid grid-cols-[300px]  sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 min-h-full place-content-center text-gray-400 my-6 mx-0 sm:mx-6 auto-rows-min  ">
      {products.map(product => {
        return <Card key={product.id} {...product} />;
      })}
    </div>
  );
};

export default Cards;
