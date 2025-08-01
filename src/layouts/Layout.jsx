import React from "react";
import { ToastContainer, Bounce, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Outlet } from "react-router";
import { AiOutlineShoppingCart } from "react-icons/ai";
import useProducts from "../hooks/useProducts";
import Footer from "../components/Footer";
const Layout = () => {
  const { cartProductsQuantity } = useProducts();

  return (
    <>
      <nav className="flex  flex-col sm:flex-row justify-between items-center gap-8 px-16 py-4 bg-fuchsia-600 text-lg sm:text-xl">
        <h1 className="mr-none sm:mr-auto ">E-Commerce</h1>
        <Link to="/">Home</Link>
        <Link to="/cart">
          <div className="indicator flex-col py-1 px-1">
            <AiOutlineShoppingCart className="text-2xl sm:text-3xl " />
            <span className="badge badge-sm indicator-item">
              {cartProductsQuantity}
            </span>
          </div>
        </Link>
      </nav>
      <ToastContainer
        className="text-lg mt-16"
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        limit={2}
        transition={Bounce}
      />
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;
