import React, { useState, useEffect } from "react";
import { Container, Header } from "../../styles/components/OrderStyle";
import OrderCard from "../../components/OrderCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("userToken");
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?.id;
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/get-orders/${userId}`,
          {
            // Include your JWT token in the request headers for authentication
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <Container>
      <Header>
        <h1> Your Order is Successful </h1>
      </Header>
      {orders.map((order) => {
        return (
          <OrderCard
            key={order._id}
            dateAdded={order.date_added}
            totalAmount={order.bill}
            status={order.status}
            items={order.items}
          />
        );
      })}
    </Container>
  );
}
