import { useEffect, useState } from "react";
import api from "./services/api";

function Cart() {

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {

    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    setCartItems(cart);

  }, []);

  const removeFromCart = (index) => {

    const updatedCart =
      cartItems.filter(
        (_, i) => i !== index
      );

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setCartItems(updatedCart);

    alert("Product Removed");
  };
 const checkout = async () => {

  try {

    const token =
      localStorage.getItem("token");

    for (const item of cartItems) {

      const order = {

        productId: item.id,
        quantity: 1,
        userEmail:
          "abhishek@gmail.com"

      };

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
    }

    localStorage.removeItem(
      "cart"
    );

    setCartItems([]);

    alert(
      "Order Placed Successfully"
    );

  } catch (error) {

    console.error(error);

    alert(
      "Checkout Failed"
    );
  }
};
  return (
    <div>

      <h2>🛒 Cart</h2>

      {cartItems.length === 0 ? (

        <p>Cart is Empty</p>

      ) : (

        cartItems.map(
          (item, index) => (

            <div
              className="card"
              key={index}
            >

              <h3>{item.name}</h3>

              <p>
                Description:
                {item.description}
              </p>

              <p>
                Price: ₹{item.price}
              </p>

              <p>
                Stock: {item.stock}
              </p>

              <button
                onClick={() =>
                  removeFromCart(index)
                }
              >
                ❌ Remove
              </button>
              <button
  className="order-btn"
  onClick={checkout}
>
  ✅ Checkout
</button>

              <hr />

            </div>
          )
        )
      )}

    </div>
  );
}

export default Cart;