import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const WS_URL = process.env.REACT_APP_WS_URL || "http://localhost:3002";

const useMarketData = () => {
  const [prices, setPrices] = useState({});
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io(WS_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("market:prices", (data) => {
      const priceMap = {};
      data.prices.forEach((item) => {
        priceMap[item.symbol] = item;
      });
      setPrices(priceMap);
    });

    socket.on("market:update", (data) => {
      setPrices((prev) => {
        const updated = { ...prev };
        data.prices.forEach((item) => {
          updated[item.symbol] = item;
        });
        return updated;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { prices, connected };
};

export default useMarketData;
