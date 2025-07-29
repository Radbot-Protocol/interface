import React from "react";
import { Tabs, Tab } from "@heroui/react";

interface TabNavigationProps {
  activeTab: "trade" | "dashboard";
  onTabChange: (value: "trade" | "dashboard") => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="w-full hidden sm:block">
      <Tabs
        radius="lg"
        selectedKey={activeTab}
        onSelectionChange={(key) => onTabChange(key as "trade" | "dashboard")}
        className="w-fit"
        classNames={{
          tabList: "bg-transparent rounded-2xl p-1",
          tabContent: "text-sm sm:text-base",
        }}
      >
        <Tab key="trade" title="Trade" />
        <Tab key="dashboard" title="Dashboard" />
      </Tabs>
    </div>
  );
};

export { TabNavigation };
