import { useState } from "react";
import Login from "./Login";
import Products from "./Products";
import Orders from "./Orders";
import Cart from "./Cart";
import "./App.css";

function App() {

  const token =
    localStorage.getItem("token");

  const [page, setPage] =
    useState("products");

  if (!token) {
    return <Login />;
  }

  return (
    <div>

      <div className="navbar">

        <button
          onClick={() =>
            setPage("products")
          }
        >
          Products
        </button>

        <button
          onClick={() =>
            setPage("orders")
          }
        >
          Orders
        </button>

        <button
          onClick={() =>
            setPage("cart")
          }
        >
          Cart
        </button>

        <button
          onClick={() => {

            localStorage.removeItem(
              "token"
            );

            window.location.reload();

          }}
        >
          Logout
        </button>

      </div>

      {page === "products" &&
        <Products />}

      {page === "orders" &&
        <Orders />}

      {page === "cart" &&
        <Cart />}

    </div>
  );
}

export default App;