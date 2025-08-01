import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import ButtonGroup from "../components/ButtonGroup";
import useProducts from "../hooks/UseProducts.jsx";

const Cart = () => {
  const {
    products,
    setProducts,
    cartList,
    setCartList,
    cartProductsQuantity,
    setCartProductsQuantity
  } = useProducts();

  console.log("cartList", cartList);

  const handleRemoveFromCartList = id => {
    // const newQuantity = cardQuantity - 1;
    const existingItem = cartList.find(item => item.id === id);
    if (existingItem && existingItem.productQuantity > 0) {
      const updatedCartList = cartList.map(item => {
        if (item.id === id) {
          return {
            ...item,
            productQuantity: item.productQuantity - 1
          };
        } else {
          return item;
        }
      });
      setCartList(updatedCartList);
      // update the  quantity of the products added in the cart
      setCartProductsQuantity(prevQuantity => prevQuantity - 1);
      // setCardQuantity(newQuantity);
    } else {
      return;
    }
  };

  const addCart = id => {
    const updatedCartList = cartList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          productQuantity: item.productQuantity + 1
        };
      } else {
        return item;
      }
    });
    setCartList(updatedCartList);
    // update the  quantity of the products added in the cart
    setCartProductsQuantity(prevQuantity => prevQuantity + 1);
  };

  return (
    <div>
      <h1 className="text-center my-6  text-3xl font-bold ">Cart</h1>
      <table className="table-auto w-full overflow-x-auto ">
        <thead className="bg-gray-700 text-white">
          <tr className=" grid py-4 grid-cols-[2fr_3fr_1fr_1fr] mx-4 place-content-center text-sm sm:text-lg">
            <th>Product</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Line Total</th>
          </tr>
        </thead>
        <tbody className="min-h-full ">
          {cartList.map(product => {
            return (
              <tr
                key={product.id}
                className="grid py-4 grid-cols-[1fr] md:grid-cols-[2fr_3fr_1fr_1fr] border-b-2 gap-8 border-gray-700 place-items-center h-full "
              >
                <td className="flex flex-col justify-center items-center   gap-8 px-4 my-4">
                  <img
                    className="rounded-full h-28 w-full aspect-square object-contain bg-white"
                    src={product.image}
                    alt={product.title}
                  />
                  <div className="px-4">
                    <h2 className="text-white">{product.title}</h2>
                    <p className="text-gray-400">
                      <span>unit Price: </span>
                      {product.price.toFixed(2)} {" €"}
                    </p>
                  </div>
                </td>
                <td className="text-gray-400 px-4 my-4">
                  {product.description}
                </td>
                <td>
                  <ButtonGroup
                    quantity={product.productQuantity}
                    handleAdd={() => addCart(product.id)}
                    handleRemove={() => handleRemoveFromCartList(product.id)}
                  />
                </td>
                <td className="px-4 my-4">
                  {(Number(product.productQuantity) * product.price).toFixed(2)}
                  {" €"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
