"use client";

import React, { useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Progress,
  Chip,
  Button,
  Avatar,
  Badge,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import ShareableDashboard from "./shareable-dashboard";

const Dashboard = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isGenerating, setIsGenerating] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const shareImageRef = useRef<HTMLDivElement>(null);

  // Mock data - replace with actual data from your API
  const userData = {
    name: "John Doe",
    walletAddress: "0x1234...5678",
    avatar: "https://i.pravatar.cc/150?img=1",
    totalShares: 15420.5,
    currentValue: 19275.63,
    totalInvested: 15000.0,
    profitLoss: 4275.63,
    profitPercentage: 28.5,
    totalReferrals: 12,
    referralEarnings: 1250.0,
    referralCode: "RADB123",
    recentTransactions: [
      {
        type: "buy",
        amount: 1000,
        shares: 800,
        date: "2024-01-15",
        status: "completed",
      },
      {
        type: "sell",
        amount: 500,
        shares: 400,
        date: "2024-01-10",
        status: "completed",
      },
      {
        type: "referral",
        amount: 100,
        shares: 0,
        date: "2024-01-08",
        status: "completed",
      },
    ],
    performanceData: [
      { month: "Jan", value: 12000 },
      { month: "Feb", value: 13500 },
      { month: "Mar", value: 14200 },
      { month: "Apr", value: 15800 },
      { month: "May", value: 17200 },
      { month: "Jun", value: 19275 },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "danger";
      default:
        return "default";
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "buy":
        return "lucide:trending-up";
      case "sell":
        return "lucide:trending-down";
      case "referral":
        return "lucide:gift";
      default:
        return "lucide:circle";
    }
  };

  const generateShareImage = async () => {
    setIsGenerating(true);
    try {
      // Call the server-side API to generate the image
      const response = await fetch("/api/generate-dashboard-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      // Get the image blob
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `radbot-dashboard-${userData.name
        .replace(/\s+/g, "-")
        .toLowerCase()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsGenerating(false);
      onOpenChange();
    }
  };

  const handleShareDashboard = () => {
    onOpen();
  };

  return (
    <div ref={dashboardRef} className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar
            src={userData.avatar}
            name={userData.name}
            size="lg"
            className="ring-2 ring-fuchsia-500/20"
          />
          <div>
            <h1 className="text-2xl font-bold text-white">{userData.name}</h1>
            <p className="text-gray-400 text-sm">{userData.walletAddress}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            color="secondary"
            variant="flat"
            className="bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20"
            startContent={<Icon icon="lucide:share-2" />}
            onClick={handleShareDashboard}
          >
            Share Dashboard
          </Button>
          <Button
            color="primary"
            className="bg-fuchsia-500/90 text-white"
            startContent={<Icon icon="lucide:download" />}
          >
            Export Data
          </Button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Shares */}
        <Card className="bg-background/60 backdrop-blur-lg border border-white/10">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total sRADB Shares</p>
                <p className="text-2xl font-bold text-white">
                  {userData.totalShares.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-fuchsia-500/10 rounded-full">
                <Icon
                  icon="lucide:coins"
                  className="text-2xl text-fuchsia-400"
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:trending-up" className="text-green-400" />
                <span className="text-sm text-green-400">+2.5% this week</span>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Current Value */}
        <Card className="bg-background/60 backdrop-blur-lg border border-white/10">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Current Value</p>
                <p className="text-2xl font-bold text-white">
                  ${userData.currentValue.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-full">
                <Icon
                  icon="lucide:dollar-sign"
                  className="text-2xl text-blue-400"
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:trending-up" className="text-green-400" />
                <span className="text-sm text-green-400">
                  +{userData.profitPercentage}% total
                </span>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Profit/Loss */}
        <Card className="bg-background/60 backdrop-blur-lg border border-white/10">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Profit/Loss</p>
                <p
                  className={`text-2xl font-bold ${
                    userData.profitLoss >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  ${userData.profitLoss.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-full">
                <Icon
                  icon="lucide:trending-up"
                  className="text-2xl text-green-400"
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:target" className="text-gray-400" />
                <span className="text-sm text-gray-400">
                  From ${userData.totalInvested.toLocaleString()} invested
                </span>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Referral Earnings */}
        <Card className="bg-background/60 backdrop-blur-lg border border-white/10">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Referral Earnings</p>
                <p className="text-2xl font-bold text-white">
                  ${userData.referralEarnings.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-full">
                <Icon
                  icon="lucide:users"
                  className="text-2xl text-purple-400"
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:user-plus" className="text-gray-400" />
                <span className="text-sm text-gray-400">
                  {userData.totalReferrals} referrals
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Detailed Stats and Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Performance */}
        <Card className="bg-background/60 backdrop-blur-lg border border-white/10 lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Portfolio Performance
              </h3>
              <Chip color="success" variant="flat" size="sm">
                6 Months
              </Chip>
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Portfolio Growth</p>
                  <p className="text-xl font-bold text-white">
                    +{userData.profitPercentage}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Total Return</p>
                  <p className="text-xl font-bold text-green-400">
                    +${userData.profitLoss.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Simple Performance Chart */}
              <div className="h-32 bg-white/5 rounded-lg p-4">
                <div className="flex items-end justify-between h-full gap-1">
                  {userData.performanceData.map((data, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center"
                    >
                      <div
                        className="w-full bg-gradient-to-t from-fuchsia-500/60 to-fuchsia-500/20 rounded-t-sm"
                        style={{
                          height: `${(data.value / 20000) * 100}%`,
                          minHeight: "8px",
                        }}
                      />
                      <span className="text-xs text-gray-400 mt-2">
                        {data.month}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Referral Stats */}
        <Card className="bg-background/60 backdrop-blur-lg border border-white/10">
          <CardHeader className="pb-3">
            <h3 className="text-lg font-semibold text-white">
              Referral Program
            </h3>
          </CardHeader>
          <CardBody className="pt-0 space-y-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-400">Your Referral Code</p>
              <p className="text-xl font-mono font-bold text-fuchsia-400">
                {userData.referralCode}
              </p>
              <Button
                size="sm"
                variant="flat"
                className="mt-2 bg-fuchsia-500/10 text-fuchsia-400"
                startContent={<Icon icon="lucide:copy" />}
              >
                Copy Code
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Total Referrals</span>
                <span className="font-semibold text-white">
                  {userData.totalReferrals}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Active Referrals</span>
                <span className="font-semibold text-white">
                  {Math.floor(userData.totalReferrals * 0.8)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Conversion Rate</span>
                <span className="font-semibold text-green-400">80%</span>
              </div>
            </div>

            <Divider />

            <div className="text-center">
              <p className="text-sm text-gray-400">Next Milestone</p>
              <p className="text-lg font-bold text-white">20 Referrals</p>
              <Progress
                value={(userData.totalReferrals / 20) * 100}
                color="secondary"
                className="mt-2"
              />
              <p className="text-xs text-gray-400 mt-1">
                {20 - userData.totalReferrals} more to unlock bonus
              </p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="bg-background/60 backdrop-blur-lg border border-white/10">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              Recent Transactions
            </h3>
            <Button
              variant="light"
              color="primary"
              size="sm"
              className="text-fuchsia-400"
            >
              View All
            </Button>
          </div>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="space-y-3">
            {userData.recentTransactions.map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === "buy"
                        ? "bg-green-500/10"
                        : transaction.type === "sell"
                        ? "bg-red-500/10"
                        : "bg-purple-500/10"
                    }`}
                  >
                    <Icon
                      icon={getTransactionIcon(transaction.type)}
                      className={`text-lg ${
                        transaction.type === "buy"
                          ? "text-green-400"
                          : transaction.type === "sell"
                          ? "text-red-400"
                          : "text-purple-400"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-white capitalize">
                      {transaction.type}{" "}
                      {transaction.type === "referral" ? "Bonus" : "Shares"}
                    </p>
                    <p className="text-sm text-gray-400">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">
                    {transaction.type === "referral" ? "+" : ""}$
                    {transaction.amount}
                  </p>
                  {transaction.shares > 0 && (
                    <p className="text-sm text-gray-400">
                      {transaction.shares} sRADB
                    </p>
                  )}
                </div>
                <Badge
                  color={getStatusColor(transaction.status)}
                  variant="flat"
                  size="sm"
                >
                  {transaction.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-background/60 backdrop-blur-lg border border-white/10">
        <CardHeader className="pb-3">
          <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              fullWidth
              color="secondary"
              variant="flat"
              className="bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 h-16"
              startContent={
                <Icon icon="lucide:trending-up" className="text-xl" />
              }
            >
              Buy More Shares
            </Button>
            <Button
              fullWidth
              color="secondary"
              variant="flat"
              className="bg-blue-500/10 text-blue-400 border border-blue-500/20 h-16"
              startContent={
                <Icon icon="lucide:trending-down" className="text-xl" />
              }
            >
              Redeem Shares
            </Button>
            <Button
              fullWidth
              color="secondary"
              variant="flat"
              className="bg-purple-500/10 text-purple-400 border border-purple-500/20 h-16"
              startContent={<Icon icon="lucide:share-2" className="text-xl" />}
            >
              Invite Friends
            </Button>
            <Button
              fullWidth
              color="secondary"
              variant="flat"
              className="bg-green-500/10 text-green-400 border border-green-500/20 h-16"
              startContent={<Icon icon="lucide:download" className="text-xl" />}
            >
              Export Data
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Share Dashboard Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent className="bg-background/95 backdrop-blur-lg border border-white/10">
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-white">Share Dashboard</h3>
            <p className="text-sm text-gray-400">
              Download your portfolio snapshot
            </p>
          </ModalHeader>
          <ModalBody className="space-y-4">
            <div className="flex justify-center">
              <div ref={shareImageRef} className="scale-75 origin-top">
                <ShareableDashboard userData={userData} />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onOpenChange}>
              Cancel
            </Button>
            <Button
              color="secondary"
              className="bg-fuchsia-500/90 text-white"
              onPress={generateShareImage}
              isLoading={isGenerating}
              startContent={!isGenerating && <Icon icon="lucide:download" />}
            >
              {isGenerating ? "Generating..." : "Download Image"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Dashboard;
