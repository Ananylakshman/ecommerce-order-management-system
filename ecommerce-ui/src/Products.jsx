import { useEffect, useState } from "react";
import api from "./services/api";

function Products() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response =
          await api.get("/products", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

        setProducts(response.data);

      } catch (error) {

    console.log(
      "Status:",
      error.response?.status
    );

    console.log(
      "Data:",
      error.response?.data
    );

    console.error(error);
}
    };

    fetchProducts();

  }, []);

  const placeOrder = async (productId) => {

  try {

    const token =
      localStorage.getItem("token");

    const order = {

      productId: productId,
      quantity: 1,
      userEmail: "abhishek@gmail.com"

    };

    const response =
      await api.post(
        "/orders",
        order,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    alert("Order Created");

    console.log(response.data);

  } catch (error) {

    console.error(error);

    alert("Order Failed");
  }
};
  return (
    <div>
    <h2>🛍️ Available Products</h2>

      {products.map(product => (
        <div className="card" key={product.id}>

          <h3>{product.name}</h3>

          <p>
            Description: {product.description}
          </p>

          <p>
            Price: ₹{product.price}
          </p>

          <p>
            Stock: {product.stock}
          </p>
          <button
  className="order-btn"
  onClick={() =>
    placeOrder(product.id)
  }
>
  🛒 Order Now
</button>

          <hr />

        </div>
      ))}
    </div>
  );
}

export default Products;