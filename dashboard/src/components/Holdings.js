import React, { useState, useEffect, useContext } from "react";
import api from "../utils/api";
import { VerticalGraph } from "./VerticalGraph";
import GeneralContext from "./GeneralContext";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { refreshKey } = useContext(GeneralContext);

  useEffect(() => {
    setLoading(true);
    api
      .get("/holdings")
      .then((res) => {
        setAllHoldings(res.data.data.holdings);
        setSummary(res.data.data.summary);
        setError("");
      })
      .catch((err) => {
        setError(err.response?.data?.error?.message || "Failed to load holdings");
      })
      .finally(() => setLoading(false));
  }, [refreshKey]);

  if (loading) {
    return <p style={{ textAlign: "center", padding: "40px" }}>Loading holdings...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", padding: "40px", color: "red" }}>{error}</p>;
  }

  const labels = allHoldings.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const formatValue = (val) => {
    if (val >= 1000) return `${(val / 1000).toFixed(2)}k`;
    return val.toFixed(2);
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const pnl = curValue - stock.avg * stock.qty;
              const isProfit = pnl >= 0;
              const profClass = isProfit ? "profit" : "loss";

              return (
                <tr key={stock._id || index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>{pnl.toFixed(2)}</td>
                  <td className={profClass}>{stock.net?.toFixed(2) || "0.00"}%</td>
                  <td>{stock.day?.toFixed(2) || "0.00"}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {summary && (
        <div className="row">
          <div className="col">
            <h5>{formatValue(summary.totalInvestment)}</h5>
            <p>Total investment</p>
          </div>
          <div className="col">
            <h5>{formatValue(summary.currentValue)}</h5>
            <p>Current value</p>
          </div>
          <div className="col">
            <h5 className={summary.totalPnl >= 0 ? "profit" : "loss"}>
              {formatValue(Math.abs(summary.totalPnl))} (
              {summary.totalPnl >= 0 ? "+" : "-"}
              {Math.abs(summary.totalPnlPercent).toFixed(2)}%)
            </h5>
            <p>P&L</p>
          </div>
        </div>
      )}

      {allHoldings.length > 0 && <VerticalGraph data={data} />}
    </>
  );
};

export default Holdings;
