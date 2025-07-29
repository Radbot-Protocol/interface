import React from "react";
import MainTabs from "./main-tabs";
import BuySharesComponent from "./buy-shares-component";
import RedeemSharesComponent from "./redeem-shares-component";

const Trade = () => {
  return (
    <div>
      <MainTabs
        buySharesComponent={<BuySharesComponent />}
        redeemComponent={<RedeemSharesComponent />}
      />
    </div>
  );
};

export default Trade;
