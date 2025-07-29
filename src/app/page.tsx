"use client";

import Logo from "@/components/logo";
import ConnectWallet from "@/components/connect-wallet";
import { TabNavigation } from "@/components/navigation/desktop-navigation";
import MobileNavigation from "@/components/navigation/mobile-navigation";
import useScreenSizeStore from "@/store/use-screen-size-store";
import Trade from "@/components/trade/trade";
import Dashboard from "@/components/dashboard/dashbaord";
import { useNavigationStore } from "@/store/navigation-store";
import { Icon } from "@iconify/react";

export default function Home() {
  const { activeTab, setActiveTab } = useNavigationStore();
  const { isMobile } = useScreenSizeStore();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <nav className="flex justify-between items-center w-full">
        <div className="flex items-center gap-4">
          {isMobile && <MobileNavigation />}
          <Logo width={50} height={50} />
          {!isMobile && (
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          )}
        </div>
        <ConnectWallet type="sm" />
      </nav>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {activeTab === "trade" && <Trade />}
        {activeTab === "dashboard" && <Dashboard />}
      </main>
      <footer className="row-start-3 flex flex-col gap-4 items-center justify-center">
        <div className="flex gap-6 items-center">
          <a
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            href="https://github.com/radbot"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Icon icon="mdi:github" className="text-white text-xl" />
          </a>
          <a
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            href="https://discord.gg/radbot"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
          >
            <Icon icon="mdi:discord" className="text-white text-xl" />
          </a>
          <a
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            href="https://x.com/radbot_pro"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
          >
            <Icon icon="hugeicons:new-twitter" className="text-white text-xl" />
          </a>
          <a
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            href="https://docs.radbot.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Documentation"
          >
            <Icon icon="mdi:file-document" className="text-white text-xl" />
          </a>
        </div>
        <div className="text-sm text-gray-400">
          © 2025 Radbot. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
