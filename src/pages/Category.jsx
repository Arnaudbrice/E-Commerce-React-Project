import React, { useContext } from "react";
import { useParams } from "react-router";
import ProductContext from "../context/ProductContext.jsx";

import useProducts from "../hooks/UseProducts.jsx";
import Card from "../components/Card";
import NotFound from "./NotFound.jsx";
const Category = () => {
  /* const { products, setProducts } = useContext(ProductContext);
   */
  const { products, setProducts } = useProducts();
  const { category } = useParams();
  const filteredProductsByCategory = products.filter(
    product => product.category === category
  );

  if (!filteredProductsByCategory || filteredProductsByCategory.length === 0) {
    return <NotFound />;
  }
  console.log(category);
  return (
    <div>
      <h1 className="text-center my-6 text-3xl font-bold ">
        Category {category}
      </h1>
      <div className="grid grid-cols-[300px]  sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 min-h-full place-content-center text-gray-400 my-6 mx-0 sm:mx-6 auto-rows-min  ">
        {filteredProductsByCategory.map(product => {
          return <Card key={product.id} {...product} />;
        })}
      </div>
    </div>
  );
};

export default Category;
