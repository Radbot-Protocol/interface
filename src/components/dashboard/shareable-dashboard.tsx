"use client";

import React from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";

interface ShareableDashboardProps {
  userData: {
    name: string;
    totalShares: number;
    currentValue: number;
    totalInvested: number;
    profitLoss: number;
    profitPercentage: number;
    totalReferrals: number;
    referralEarnings: number;
    performanceData: Array<{ month: string; value: number }>;
  };
}

const ShareableDashboard: React.FC<ShareableDashboardProps> = ({
  userData,
}) => {
  return (
    <div className="w-[800px] h-[600px] bg-black p-8 relative overflow-hidden">
      {/* Simple Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500 rounded-full blur-2xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-10">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-gray-800/50 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
            <Image
              src="/logo.png"
              alt="RADBOT"
              width={60}
              height={60}
              className="object-contain dark:invert"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              {userData.name}
            </h1>
            <p className="text-gray-400 text-lg">RADBOT Portfolio Dashboard</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400 mb-1">Generated on</p>
          <p className="text-white font-semibold text-lg">
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-8 mb-10">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/20 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-sm font-medium">
                Portfolio Value
              </p>
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Icon
                  icon="lucide:trending-up"
                  className="text-green-400 text-lg"
                />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-2">
              ${userData.currentValue.toLocaleString()}
            </p>
            <div className="flex items-center gap-2">
              <Icon icon="lucide:arrow-up" className="text-green-400 text-sm" />
              <p className="text-green-400 text-sm font-semibold">
                +{userData.profitPercentage}% total return
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-fuchsia-500/20 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-sm font-medium">sRADB Shares</p>
              <div className="p-2 bg-fuchsia-500/20 rounded-lg">
                <Icon
                  icon="lucide:coins"
                  className="text-fuchsia-400 text-lg"
                />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-2">
              {userData.totalShares.toLocaleString()}
            </p>
            <div className="flex items-center gap-2">
              <Icon icon="lucide:plus" className="text-fuchsia-400 text-sm" />
              <p className="text-fuchsia-400 text-sm font-semibold">
                +2.5% this week
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">
              Portfolio Performance
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-fuchsia-500 rounded-full"></div>
              <span className="text-gray-400 text-sm font-medium">
                6 Month Growth
              </span>
            </div>
          </div>
          <div className="h-32 flex items-end justify-between gap-2">
            {userData.performanceData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-fuchsia-500/80 via-fuchsia-500/40 to-fuchsia-500/20 rounded-t-lg"
                  style={{
                    height: `${(data.value / 20000) * 100}%`,
                    minHeight: "12px",
                  }}
                />
                <span className="text-xs text-gray-400 mt-3 font-medium">
                  {data.month}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Icon
              icon="lucide:dollar-sign"
              className="text-green-400 text-xl"
            />
          </div>
          <p className="text-gray-400 text-sm mb-2 font-medium">Total Profit</p>
          <p className="text-2xl font-bold text-green-400">
            ${userData.profitLoss.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Icon icon="lucide:gift" className="text-purple-400 text-xl" />
          </div>
          <p className="text-gray-400 text-sm mb-2 font-medium">
            Referral Earnings
          </p>
          <p className="text-2xl font-bold text-purple-400">
            ${userData.referralEarnings.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Icon icon="lucide:users" className="text-blue-400 text-xl" />
          </div>
          <p className="text-gray-400 text-sm mb-2 font-medium">
            Total Referrals
          </p>
          <p className="text-2xl font-bold text-blue-400">
            {userData.totalReferrals}
          </p>
        </div>
      </div>

      {/* RADBOT Logo */}
      <div className="absolute bottom-6 right-6">
        <div className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20">
          <Image
            src="/logo.png"
            alt="RADBOT"
            width={30}
            height={30}
            className="object-contain dark:invert"
          />
          <span className="text-white font-bold text-lg">RADBOT</span>
        </div>
      </div>
    </div>
  );
};

export default ShareableDashboard;
