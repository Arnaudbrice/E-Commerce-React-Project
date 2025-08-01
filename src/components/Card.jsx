import React, { useState } from "react";
import { toast } from "react-toastify";
import useProducts from "../hooks/useProducts.jsx";
import ButtonGroup from "./ButtonGroup.jsx";

const Card = ({
  id,
  image,
  title,
  price,
  category,
  description,
  productQuantity
}) => {
  const {
    cartProductsQuantity,
    setCartProductsQuantity,
    cartList,
    setCartList
  } = useProducts();
  const [isClicked, setIsClicked] = useState(false);
  // const [productQuantity, setProductQuantity] = useState(0);

  console.log("productQuantity", productQuantity);
  const handleAddToCartListClick = id => {
    addCart(id);

    setIsClicked(!isClicked);
  };

  const handleAddToCartList = id => {
    addCart(id);
  };

  const handleRemoveFromCartList = id => {
    // const newProductQuantity = productQuantity - 1;
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
      // setProductQuantity(newProductQuantity);
    } else {
      return;
    }
  };

  const addCart = id => {
    // const newProductQuantity = productQuantity + 1;
    const existingItem = cartList.find(item => item.id === id);
    if (existingItem) {
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
      toast.success("Product Added to Cart Successfully!");
    } else {
      const newCartItem = {
        id,
        title,
        price,
        category,
        image,
        productQuantity: 1,
        description
      };

      //  we use useEffect with cart as a dependency to update the localstorage whenever cart changes (no need to update localstorage here)
      setCartList([...cartList, newCartItem]);

      // update the  quantity of the products added in the cart
      setCartProductsQuantity(prevQuantity => prevQuantity + 1);
      // setProductQuantity(newProductQuantity);
    }
  };
  return (
    <div className="card card-lg  bg-base-100 h-full shadow-sm  transition-transform duration-200 hover:scale-105 hover:drop-shadow-[0_0_10px_gray]  border rounded-lg  ">
      <figure>
        <img
          className="w-full h-52 block object-contain aspect-square  bg-white"
          src={image}
          alt={title}
        />
      </figure>
      <div className="card-body px-4    ">
        <h2 className="card-title truncate ">{title}</h2>
        <p className="text-left">
          {price.toFixed(2)}
          {" €"}
        </p>

        <div className="card-actions w-full justify-between items-center  ">
          {/* TODO:
          -on click on more from category show a page with all articles from this category
          -add href to the page to be called */}

          <a
            className="text-xs  hover:link my-4 sm:my-none"
            href={`/category/${category}`}
          >
            More from {category}
          </a>
          {!isClicked ? (
            <button
              onClick={() => handleAddToCartListClick(id)}
              className="btn btn-primary  "
            >
              Add To Cart
            </button>
          ) : (
            <ButtonGroup
              quantity={
                cartList.find(item => item.id === id)?.productQuantity || 0
              }
              handleAdd={() => handleAddToCartList(id)}
              handleRemove={() => handleRemoveFromCartList(id)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
