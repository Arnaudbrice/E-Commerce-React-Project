import React, { useState, useEffect, use } from "react";

import { toast } from "react-toastify";
import Card from "../components/Card";
import ButtonGroup from "../components/ButtonGroup";
import useProducts from "../hooks/useProducts.jsx";

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

  const [cartAmount, setCartAmount] = useState(0);

  console.log("cardQuantity", cartProductsQuantity);

  useEffect(() => {
    const calculateCartTotalAmount = () => {
      console.log("cartList", cartList);

      const cartTotalAmount = cartList.reduce((acc, item) => {
        const itemPrice = Number(item.price) * Number(item.productQuantity);
        return acc + itemPrice;
      }, 0);

      setCartAmount(cartTotalAmount);

      console.log("cartTotalAmount:", cartTotalAmount);
    };

    calculateCartTotalAmount();
  }, [cartList]);

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

  const handleReset = () => {
    setCartList([]);
    setCartProductsQuantity(0);
  };

  const handleCheckout = () => {
    toast.success(
      <div className="mx-auto text-center">
        Checkout Successfully <br />
        We Will implement the logic later
      </div>
    );
  };

  return (
    <div>
      {cartAmount === 0 ? (
        <div
          role="alert"
          className="w-2/3 mx-auto mt-8 text-xl alert alert-info"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6 stroke-current shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Your Cart is empty 😕</span>
        </div>
      ) : (
        <>
          <div className="w-2/3 mx-auto my-6 text-3xl font-bold text-center divider divider-secondary">
            Cart
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full table-md table-zebra">
              <thead className="invisible text-white bg-gray-700 sm:visible">
                <tr className=" grid py-4 grid-cols-[2fr_3fr_1fr_1fr] mx-4 place-content-center text-sm sm:text-lg">
                  <th>Product</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Line Total</th>
                </tr>
              </thead>
              <tbody className="min-h-full ">
                {cartList.map(
                  product =>
                    product.productQuantity > 0 && (
                      <tr
                        key={product.id}
                        className="grid grid-cols-[1fr] md:grid-cols-[2fr_3fr_1fr_1fr] border-b-2 gap-2 md:gap-8 border-gray-700 place-items-center h-full space-y-4 "
                      >
                        <td className="flex flex-col items-center justify-center gap-4 ">
                          <div className="avatar  h-[120px] ">
                            <img
                              className="object-contain w-full h-auto bg-white rounded-full "
                              src={product.image}
                              alt={product.title}
                            />
                          </div>
                          <div className="px-0 text-center">
                            <h2 className="text-white">{product.title}</h2>
                            <p className="text-gray-400">
                              <span>Unit Price: </span>
                              {product.price.toFixed(2)} {" €"}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 text-gray-400">
                          {product.description}
                        </td>
                        <td>
                          <ButtonGroup
                            quantity={product.productQuantity}
                            handleAdd={() => addCart(product.id)}
                            handleRemove={() =>
                              handleRemoveFromCartList(product.id)
                            }
                          />
                        </td>
                        <td className="px-4 ">
                          {(
                            Number(product.productQuantity) * product.price
                          ).toFixed(2)}
                          {" €"}
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
            <div className="flex items-center justify-center gap-4 my-4">
              <button
                className="btn btn-lg bg-fuchsia-600 hover:bg-fuchsia-700 "
                onClick={handleReset}
              >
                Reset Cart
              </button>
              <button
                className="btn btn-lg btn-success"
                onClick={handleCheckout}
              >
                Checkout: {cartAmount.toFixed(2)} {" €"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
