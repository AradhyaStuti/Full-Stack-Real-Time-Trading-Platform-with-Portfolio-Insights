import React, { useState, useEffect, useContext } from "react";
import api from "../utils/api";
import GeneralContext from "./GeneralContext";

const Summary = () => {
  const { user, refreshKey } = useContext(GeneralContext);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/holdings")
      .then((res) => {
        setSummary(res.data.data.summary);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const formatValue = (val) => {
    if (!val && val !== 0) return "0.00";
    if (val >= 1000) return `${(val / 1000).toFixed(2)}k`;
    return val.toFixed(2);
  };

  return (
    <>
      <div className="username">
        <h6>Hi, {user?.name || "User"}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{loading ? "..." : formatValue(summary?.currentValue || 0)}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>
            </p>
            <p>
              Opening balance{" "}
              <span>{loading ? "..." : formatValue(summary?.currentValue || 0)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({loading ? "..." : summary?.count || 0})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={summary?.totalPnl >= 0 ? "profit" : "loss"}>
              {loading
                ? "..."
                : `${formatValue(Math.abs(summary?.totalPnl || 0))} ${
                    summary?.totalPnlPercent
                      ? `${summary.totalPnl >= 0 ? "+" : "-"}${Math.abs(
                          summary.totalPnlPercent
                        ).toFixed(2)}%`
                      : ""
                  }`}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value{" "}
              <span>{loading ? "..." : formatValue(summary?.currentValue || 0)}</span>
            </p>
            <p>
              Investment{" "}
              <span>
                {loading ? "..." : formatValue(summary?.totalInvestment || 0)}
              </span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
