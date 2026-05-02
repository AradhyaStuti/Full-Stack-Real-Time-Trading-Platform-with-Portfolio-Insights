import React, { useState, useEffect, useContext } from "react";
import api from "../utils/api";
import GeneralContext from "./GeneralContext";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { refreshKey } = useContext(GeneralContext);

  useEffect(() => {
    setLoading(true);
    api
      .get("/positions")
      .then((res) => {
        setPositions(res.data.data.positions);
        setError("");
      })
      .catch((err) => {
        setError(err.response?.data?.error?.message || "Failed to load positions");
      })
      .finally(() => setLoading(false));
  }, [refreshKey]);

  if (loading) {
    return <p style={{ textAlign: "center", padding: "40px" }}>Loading positions...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", padding: "40px", color: "red" }}>{error}</p>;
  }

  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const pnl = curValue - stock.avg * stock.qty;
              const isProfit = pnl >= 0;
              const profClass = isProfit ? "profit" : "loss";

              return (
                <tr key={stock._id || index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td className={profClass}>{pnl.toFixed(2)}</td>
                  <td>{stock.day?.toFixed(2) || "0.00"}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
