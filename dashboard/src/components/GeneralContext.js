import React, { useState, useEffect, useCallback } from "react";
import api from "../utils/api";
import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: () => {},
  closeBuyWindow: () => {},
  user: null,
  refreshData: () => {},
});

export const GeneralContextProvider = ({ children }) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [user, setUser] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    api
      .get("/auth/user")
      .then((res) => setUser(res.data.data.user))
      .catch(() => {});
  }, []);

  const handleOpenBuyWindow = useCallback((uid) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  }, []);

  const handleCloseBuyWindow = useCallback(() => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  }, []);

  const refreshData = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        user,
        refreshKey,
        refreshData,
      }}
    >
      {children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
