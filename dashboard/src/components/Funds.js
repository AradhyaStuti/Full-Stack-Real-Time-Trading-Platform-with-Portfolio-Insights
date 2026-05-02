import React, { useState, useEffect, useContext } from "react";
import api from "../utils/api";
import GeneralContext from "./GeneralContext";

const formatINR = (n) => {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const Funds = () => {
  const { refreshKey } = useContext(GeneralContext);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/holdings")
      .then((res) => setSummary(res.data.data.summary))
      .catch(() => setSummary(null))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const investment = summary?.totalInvestment;
  const currentValue = summary?.currentValue;
  const pnl = summary?.totalPnl;

  const equityRows = [
    {
      label: "Current value",
      value: loading ? "..." : formatINR(currentValue),
      emphasis: "imp colored",
    },
    {
      label: "Total investment",
      value: loading ? "..." : formatINR(investment),
      emphasis: "imp",
    },
    {
      label: "Holdings",
      value: loading ? "..." : summary?.count ?? 0,
      emphasis: "imp",
    },
  ];

  const pnlClass =
    pnl === undefined || pnl === null ? "" : pnl >= 0 ? "profit" : "loss";

  const placeholderRows = [
    "Opening balance",
    "Payin",
    "SPAN",
    "Delivery margin",
    "Exposure",
    "Options premium",
  ];

  const collateralRows = [
    "Collateral (Liquid funds)",
    "Collateral (Equity)",
    "Total Collateral",
  ];

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI</p>
        <button type="button" className="btn btn-green" disabled>
          Add funds
        </button>
        <button type="button" className="btn btn-blue" disabled>
          Withdraw
        </button>
      </div>

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            {equityRows.map((r) => (
              <div className="data" key={r.label}>
                <p>{r.label}</p>
                <p className={r.emphasis}>{r.value}</p>
              </div>
            ))}
            <div className="data">
              <p>P&amp;L</p>
              <p className={`imp ${pnlClass}`}>
                {loading ? "..." : formatINR(pnl)}
              </p>
            </div>
            <hr />
            {placeholderRows.map((label) => (
              <div className="data" key={label}>
                <p>{label}</p>
                <p>—</p>
              </div>
            ))}
            <hr />
            {collateralRows.map((label) => (
              <div className="data" key={label}>
                <p>{label}</p>
                <p>—</p>
              </div>
            ))}
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <button type="button" className="btn btn-blue" disabled>
              Open Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
