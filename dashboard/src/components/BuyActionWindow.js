import React, { useState, useContext } from "react";
import api from "../utils/api";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { closeBuyWindow, refreshData } = useContext(GeneralContext);

  const handleBuyClick = async () => {
    if (stockQuantity < 1) {
      setError("Quantity must be at least 1");
      return;
    }
    if (stockPrice <= 0) {
      setError("Price must be greater than 0");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.post("/orders", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "BUY",
      });
      refreshData();
      closeBuyWindow();
    } catch (err) {
      const message =
        err.response?.data?.error?.message || "Order failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(Number(e.target.value))}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              min="0.01"
              onChange={(e) => setStockPrice(Number(e.target.value))}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      {error && <p className="order-error">{error}</p>}

      <div className="buttons">
        <span>
          Margin required ₹{(stockQuantity * stockPrice).toFixed(2)}
        </span>
        <div>
          <button
            className="btn btn-blue"
            onClick={handleBuyClick}
            disabled={loading}
          >
            {loading ? "Placing..." : "Buy"}
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
