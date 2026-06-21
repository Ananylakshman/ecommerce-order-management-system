import { useEffect, useState } from "react";
import api from "./services/api";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response =
          await api.get("/orders", {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          });

        setOrders(response.data);

      } catch (error) {

        console.error(error);

        if (
          error.response?.status === 403
        ) {

          localStorage.removeItem(
            "token"
          );

          alert(
            "Session Expired. Please Login Again."
          );

          window.location.reload();
        }
      }
    };

    fetchOrders();

  }, []);

  return (
    <div>

      <h2>📦 Orders</h2>

      {orders.length === 0 ? (

        <p>No Orders Found</p>

      ) : (

        orders.map(order => (

          <div
            className="card"
            key={order.id}
          >

            <p>
              Product: {order.productId}
            </p>

            <p>
              Quantity: {order.quantity}
            </p>

            <p>
              Status: {order.status}
            </p>

            <hr />

          </div>
        ))
      )}

    </div>
  );
}

export default Orders;