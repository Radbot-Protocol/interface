"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Button,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Divider,
  Progress,
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface SharePackage {
  id: string;
  shares: number;
  purchaseDate: Date;
  purchasePrice: number;
  totalPaid: number;
  isRedeemable: boolean;
  timeRemaining: number; // in seconds
}

const RedeemSharesComponent = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedPackage, setSelectedPackage] = useState<SharePackage | null>(
    null
  );
  const [sharePackages, setSharePackages] = useState<SharePackage[]>([
    {
      id: "1",
      shares: 100,
      purchaseDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      purchasePrice: 1.2,
      totalPaid: 120,
      isRedeemable: false,
      timeRemaining: 4 * 24 * 60 * 60, // 4 days remaining
    },
    {
      id: "2",
      shares: 250,
      purchaseDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
      purchasePrice: 1.15,
      totalPaid: 287.5,
      isRedeemable: true,
      timeRemaining: 0,
    },
    {
      id: "3",
      shares: 75,
      purchaseDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      purchasePrice: 1.18,
      totalPaid: 88.5,
      isRedeemable: false,
      timeRemaining: 2 * 24 * 60 * 60, // 2 days remaining
    },
  ]);

  // Mock current prices
  const currentSRDBTPrice = 1.3; // USD per SRDBT
  const currentUSDCPrice = 1.0; // USD per USDC

  // Update countdown timers
  useEffect(() => {
    const interval = setInterval(() => {
      setSharePackages((prev) =>
        prev.map((pkg) => {
          if (pkg.timeRemaining > 0) {
            const newTimeRemaining = pkg.timeRemaining - 1;
            return {
              ...pkg,
              timeRemaining: newTimeRemaining,
              isRedeemable: newTimeRemaining <= 0,
            };
          }
          return pkg;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeRemaining = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const secs = seconds % 60;

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const calculateRedemptionValue = (shares: number) => {
    const srdbtValue = shares * currentSRDBTPrice;
    const usdcValue = shares * currentUSDCPrice;
    return { srdbtValue, usdcValue };
  };

  const handleRedeem = (pkg: SharePackage) => {
    setSelectedPackage(pkg);
    onOpen();
  };

  const totalShares = sharePackages.reduce((sum, pkg) => sum + pkg.shares, 0);
  const redeemableShares = sharePackages
    .filter((pkg) => pkg.isRedeemable)
    .reduce((sum, pkg) => sum + pkg.shares, 0);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Card className="bg-background/60 backdrop-blur-lg border border-white/10">
        <CardBody className="p-6">
          {/* Mobile Layout (single column) */}
          <div className="block md:hidden space-y-6">
            {/* Header with current prices */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">
                  Redeem sRADB Shares
                </h3>
                <Chip color="warning" variant="flat" size="sm">
                  {redeemableShares > 0
                    ? `${redeemableShares} Redeemable`
                    : "No Redeemable"}
                </Chip>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-sm text-gray-400">Current SRDBT</p>
                  <p className="text-xl font-bold text-white">
                    ${currentSRDBTPrice.toFixed(2)}
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-sm text-gray-400">USDC Value</p>
                  <p className="text-xl font-bold text-white">
                    ${currentUSDCPrice.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Total Shares</span>
                  <span className="text-sm font-medium text-white">
                    {totalShares.toLocaleString()}
                  </span>
                </div>
                <Progress
                  value={(redeemableShares / totalShares) * 100}
                  color="success"
                  size="sm"
                  className="w-full"
                />
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-400">Redeemable</span>
                  <span className="text-xs text-green-400">
                    {redeemableShares.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <Divider />

            {/* Share Packages List */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-white">
                Your Share Packages
              </h4>

              {sharePackages.length === 0 ? (
                <div className="text-center py-8">
                  <Icon
                    icon="lucide:package"
                    className="mx-auto text-gray-400 text-4xl mb-2"
                  />
                  <p className="text-gray-400">No share packages found</p>
                  <p className="text-xs text-gray-500">
                    Purchase shares to see them here
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {sharePackages.map((pkg) => {
                    const { srdbtValue, usdcValue } = calculateRedemptionValue(
                      pkg.shares
                    );
                    const progressPercent = pkg.isRedeemable
                      ? 100
                      : ((7 * 24 * 60 * 60 - pkg.timeRemaining) /
                          (7 * 24 * 60 * 60)) *
                        100;

                    return (
                      <div
                        key={pkg.id}
                        className="bg-white/5 rounded-lg p-4 border border-white/10"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-semibold text-white">
                              {pkg.shares.toLocaleString()} sRADB
                            </p>
                            <p className="text-xs text-gray-400">
                              Purchased {pkg.purchaseDate.toLocaleDateString()}{" "}
                              at ${pkg.purchasePrice}
                            </p>
                          </div>
                          <Chip
                            color={pkg.isRedeemable ? "success" : "warning"}
                            variant="flat"
                            size="sm"
                          >
                            {pkg.isRedeemable ? "Ready" : "Locked"}
                          </Chip>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">SRDBT Value:</span>
                            <span className="text-white">
                              ${srdbtValue.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">USDC Value:</span>
                            <span className="text-white">
                              ${usdcValue.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {!pkg.isRedeemable && (
                          <div className="space-y-2 mb-3">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">
                                Time Remaining:
                              </span>
                              <span className="text-orange-400 font-mono">
                                {formatTimeRemaining(pkg.timeRemaining)}
                              </span>
                            </div>
                            <Progress
                              value={progressPercent}
                              color="warning"
                              size="sm"
                              className="w-full"
                            />
                          </div>
                        )}

                        <Button
                          fullWidth
                          size="sm"
                          color={pkg.isRedeemable ? "success" : "default"}
                          variant={pkg.isRedeemable ? "solid" : "bordered"}
                          isDisabled={!pkg.isRedeemable}
                          onClick={() => handleRedeem(pkg)}
                          className={
                            pkg.isRedeemable ? "bg-green-500/90 text-white" : ""
                          }
                        >
                          <Icon
                            icon={
                              pkg.isRedeemable ? "lucide:gift" : "lucide:clock"
                            }
                            className="mr-2"
                          />
                          {pkg.isRedeemable ? "Redeem Now" : "Locked"}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Desktop/Tablet Layout (two columns) */}
          <div className="hidden md:grid md:grid-cols-12 lg:grid-cols-12 gap-6">
            {/* Left Column - Stats and Overview */}
            <div className="md:col-span-4 lg:col-span-3 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white">
                    Redeem sRADB Shares
                  </h3>
                  <Chip color="warning" variant="flat" size="sm">
                    {redeemableShares > 0
                      ? `${redeemableShares} Redeemable`
                      : "No Redeemable"}
                  </Chip>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-sm text-gray-400">Current SRDBT</p>
                    <p className="text-2xl font-bold text-white">
                      ${currentSRDBTPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-sm text-gray-400">USDC Value</p>
                    <p className="text-2xl font-bold text-white">
                      ${currentUSDCPrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-400">Total Shares</span>
                    <span className="text-lg font-medium text-white">
                      {totalShares.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    value={(redeemableShares / totalShares) * 100}
                    color="success"
                    size="sm"
                    className="w-full"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-400">Redeemable</span>
                    <span className="text-sm text-green-400 font-medium">
                      {redeemableShares.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Share Packages */}
            <div className="md:col-span-8 lg:col-span-9">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold text-white">
                    Your Share Packages
                  </h4>
                  <div className="text-sm text-gray-400">
                    {sharePackages.length} package
                    {sharePackages.length !== 1 ? "s" : ""}
                  </div>
                </div>

                {sharePackages.length === 0 ? (
                  <div className="text-center py-12">
                    <Icon
                      icon="lucide:package"
                      className="mx-auto text-gray-400 text-6xl mb-4"
                    />
                    <p className="text-gray-400 text-lg">
                      No share packages found
                    </p>
                    <p className="text-sm text-gray-500">
                      Purchase shares to see them here
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 max-h-[600px] overflow-y-auto">
                    {sharePackages.map((pkg) => {
                      const { srdbtValue, usdcValue } =
                        calculateRedemptionValue(pkg.shares);
                      const progressPercent = pkg.isRedeemable
                        ? 100
                        : ((7 * 24 * 60 * 60 - pkg.timeRemaining) /
                            (7 * 24 * 60 * 60)) *
                          100;

                      return (
                        <div
                          key={pkg.id}
                          className="bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-colors"
                        >
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                            {/* Package Info */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <p className="text-xl font-semibold text-white">
                                  {pkg.shares.toLocaleString()} sRADB
                                </p>
                                <Chip
                                  color={
                                    pkg.isRedeemable ? "success" : "warning"
                                  }
                                  variant="flat"
                                  size="sm"
                                >
                                  {pkg.isRedeemable ? "Ready" : "Locked"}
                                </Chip>
                              </div>
                              <p className="text-sm text-gray-400">
                                Purchased{" "}
                                {pkg.purchaseDate.toLocaleDateString()} at $
                                {pkg.purchasePrice}
                              </p>
                            </div>

                            {/* Values */}
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">
                                  SRDBT Value:
                                </span>
                                <span className="text-white font-medium">
                                  ${srdbtValue.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">
                                  USDC Value:
                                </span>
                                <span className="text-white font-medium">
                                  ${usdcValue.toFixed(2)}
                                </span>
                              </div>
                            </div>

                            {/* Action and Timer */}
                            <div className="space-y-3">
                              {!pkg.isRedeemable && (
                                <div className="space-y-2">
                                  <div className="flex justify-between text-xs">
                                    <span className="text-gray-400">
                                      Time Remaining:
                                    </span>
                                    <span className="text-orange-400 font-mono">
                                      {formatTimeRemaining(pkg.timeRemaining)}
                                    </span>
                                  </div>
                                  <Progress
                                    value={progressPercent}
                                    color="warning"
                                    size="sm"
                                    className="w-full"
                                  />
                                </div>
                              )}
                              <Button
                                fullWidth
                                size="sm"
                                color={pkg.isRedeemable ? "success" : "default"}
                                variant={
                                  pkg.isRedeemable ? "solid" : "bordered"
                                }
                                isDisabled={!pkg.isRedeemable}
                                onClick={() => handleRedeem(pkg)}
                                className={
                                  pkg.isRedeemable
                                    ? "bg-green-500/90 text-white"
                                    : ""
                                }
                              >
                                <Icon
                                  icon={
                                    pkg.isRedeemable
                                      ? "lucide:gift"
                                      : "lucide:clock"
                                  }
                                  className="mr-2"
                                />
                                {pkg.isRedeemable ? "Redeem Now" : "Locked"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Redemption Details Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent className="bg-background/95 backdrop-blur-lg border border-white/10">
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-white">Redemption Details</h3>
            <p className="text-sm text-gray-400">
              Review your sRADB redemption
            </p>
          </ModalHeader>
          <ModalBody className="space-y-4">
            {selectedPackage && (
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-400">Shares to Redeem</span>
                  <span className="font-semibold text-white">
                    {selectedPackage.shares.toLocaleString()} sRADB
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-400">Purchase Price</span>
                  <span className="font-semibold text-white">
                    ${selectedPackage.purchasePrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-400">Current SRDBT Price</span>
                  <span className="font-semibold text-white">
                    ${currentSRDBTPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-400">SRDBT Value</span>
                  <span className="font-semibold text-white">
                    ${(selectedPackage.shares * currentSRDBTPrice).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-400">USDC Value</span>
                  <span className="font-semibold text-white">
                    ${(selectedPackage.shares * currentUSDCPrice).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-400">Network Fee</span>
                  <span className="font-semibold text-white">~$0.50</span>
                </div>

                <Divider />

                <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <span className="text-gray-300 font-medium">
                    Total USDC to Receive
                  </span>
                  <span className="font-bold text-green-400">
                    $
                    {(selectedPackage.shares * currentUSDCPrice - 0.5).toFixed(
                      2
                    )}
                  </span>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onOpenChange}>
              Cancel
            </Button>
            <Button
              color="success"
              className="bg-green-500/90 text-white"
              onPress={() => {
                // Handle the actual redemption here
                console.log("Processing redemption...", selectedPackage);
                onOpenChange();
              }}
            >
              <Icon icon="lucide:gift" className="mr-2" />
              Confirm Redemption
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default RedeemSharesComponent;
