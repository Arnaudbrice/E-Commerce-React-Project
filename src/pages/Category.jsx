import React, { useContext } from "react";
import { useParams } from "react-router";
import ProductContext from "../context/ProductContext.jsx";

import useProducts from "../hooks/useProducts.jsx";
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
      <h1 className="my-6 text-3xl font-bold text-center ">
        Category {category}
      </h1>
      <div className="grid min-h-full grid-cols-2 gap-6 mx-0 my-6 text-gray-400 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] place-content-center sm:mx-6 auto-rows-min ">
        {filteredProductsByCategory.map(product => {
          return <Card key={product.id} {...product} />;
        })}
      </div>
    </div>
  );
};

export default Category;
