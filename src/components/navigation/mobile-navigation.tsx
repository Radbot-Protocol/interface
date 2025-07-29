"use client";

import React from "react";
import { Icon } from "@iconify/react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  useDisclosure,
} from "@heroui/react";
import Logo from "../logo";
import { useNavigationStore } from "@/store/navigation-store";

const MobileNavigation = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { setActiveTab } = useNavigationStore();
  const handleTabChange = (tab: "trade" | "dashboard") => {
    setActiveTab(tab);
  };
  return (
    <div>
      <Icon
        onClick={onOpen}
        color="white"
        icon="hugeicons:menu-01"
        width="24"
        height="24"
      />
      <Drawer placement="left" isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent className="max-w-[280px] w-full">
          {(onClose) => (
            <>
              <DrawerBody className="p-6">
                <div className="flex flex-col gap-8">
                  {/* Logo Section */}
                  <div className="flex flex-col gap-2">
                    <Logo width={40} height={40} />
                  </div>

                  {/* Navigation Items */}
                  <div className="flex flex-col gap-4">
                    <button
                      className="text-white text-left text-lg font-medium hover:text-gray-300 transition-colors"
                      onClick={() => {
                        handleTabChange("trade");
                        onClose();
                      }}
                    >
                      Trade
                    </button>
                    <button
                      className="text-white text-left text-lg font-medium hover:text-gray-300 transition-colors"
                      onClick={() => {
                        handleTabChange("dashboard");
                        onClose();
                      }}
                    >
                      Dashboard
                    </button>
                  </div>
                </div>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileNavigation;
