import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import GeneralContext from "./GeneralContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [meta, setMeta] = useState(null);
  const { refreshKey } = useContext(GeneralContext);

  useEffect(() => {
    setLoading(true);
    api
      .get("/orders")
      .then((res) => {
        setOrders(res.data.data.orders);
        setMeta(res.data.meta);
        setError("");
      })
      .catch((err) => {
        setError(err.response?.data?.error?.message || "Failed to load orders");
      })
      .finally(() => setLoading(false));
  }, [refreshKey]);

  if (loading) {
    return <p style={{ textAlign: "center", padding: "40px" }}>Loading orders...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", padding: "40px", color: "red" }}>{error}</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to="/" className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Orders ({meta?.total || orders.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Mode</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.name}</td>
                <td>{order.qty}</td>
                <td>{order.price.toFixed(2)}</td>
                <td className={order.mode === "BUY" ? "profit" : "loss"}>
                  {order.mode}
                </td>
                <td>{order.status}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
