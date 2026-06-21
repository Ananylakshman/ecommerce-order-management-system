import { useEffect, useState } from "react";
import api from "./services/api";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const fetchOrders = async () => {

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
    };

    fetchOrders();

  }, []);

  return (
    <div>
      <h2>Orders</h2>

      {orders.map(order => (
       <div className="card" key={order.id}>

          <p>Product: {order.productId}</p>

          <p>Quantity: {order.quantity}</p>

          <p>Status: {order.status}</p>

          <hr />

        </div>
      ))}
    </div>
  );
}

export default Orders;