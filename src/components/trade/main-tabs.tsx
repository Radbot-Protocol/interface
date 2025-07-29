import { Tabs, Tab } from "@heroui/react";
import { ReactNode } from "react";

interface MainTabsProps {
  buySharesComponent: ReactNode;
  redeemComponent: ReactNode;
}

export default function MainTabs({
  buySharesComponent,
  redeemComponent,
}: MainTabsProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Tabs aria-label="Options">
        <Tab key="buy-shares" title="Buy Shares">
          {buySharesComponent}
        </Tab>
        <Tab key="redeem" title="Redeem">
          {redeemComponent}
        </Tab>
      </Tabs>
    </div>
  );
}
