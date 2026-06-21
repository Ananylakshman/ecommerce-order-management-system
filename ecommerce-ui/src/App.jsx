import { useState } from "react";



import Products from "./Products";



import Orders from "./Orders";



import "./App.css";







function App() {







  const [page, setPage] = useState("products");







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

        onClick={() => {

          localStorage.removeItem("token");

          alert("Logged Out");

        }}

      >

        Logout

      </button>



    </div>



    <hr />



    {page === "products" &&

      <Products />}



    {page === "orders" &&

      <Orders />}



  </div>



  );



}







export default App;