"use client";

import React, { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Slider,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Divider,
} from "@heroui/react";
import { Icon } from "@iconify/react";

const BuySharesComponent = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [amount, setAmount] = useState<string>("");
  const [percentage, setPercentage] = useState<number>(0);

  // Mock data - replace with actual data from your API
  const currentPrice = 1.25; // USD per sRADB
  const availableShares = 1000000; // Total shares available
  const userBalance = 5000; // User's USD balance

  const handlePercentageChange = (value: number) => {
    setPercentage(value);
    const calculatedAmount = (userBalance * value) / 100;
    setAmount(calculatedAmount.toFixed(2));
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    const numValue = parseFloat(value) || 0;
    const calculatedPercentage = (numValue / userBalance) * 100;
    setPercentage(Math.min(calculatedPercentage, 100));
  };

  const sharesToBuy = parseFloat(amount) / currentPrice;
  const totalCost = parseFloat(amount) || 0;

  const handleBuy = () => {
    if (parseFloat(amount) > 0) {
      onOpen();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="bg-background/60 backdrop-blur-lg border border-white/10">
        <CardBody className="p-6 space-y-6">
          {/* Header with current price and available shares */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">
                Buy sRADB Shares
              </h3>
              <Chip color="success" variant="flat" size="sm">
                Live
              </Chip>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-sm text-gray-400">Current Price</p>
                <p className="text-xl font-bold text-white">
                  ${currentPrice.toFixed(2)}
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-sm text-gray-400">Available</p>
                <p className="text-xl font-bold text-white">
                  {availableShares.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <Divider />

          {/* Amount Input */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-300">
                Amount (USD)
              </label>
              <span className="text-xs text-gray-400">
                Balance: ${userBalance.toLocaleString()}
              </span>
            </div>

            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                classNames={{
                  input: "text-right text-lg font-semibold",
                  inputWrapper:
                    "bg-white/5 border-white/10 hover:border-white/20 focus-within:border-fuchsia-500",
                }}
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-gray-400 text-sm">USD</span>
                  </div>
                }
              />
            </div>

            {/* Shares to receive */}
            {parseFloat(amount) > 0 && (
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-sm text-gray-400">You will receive</p>
                <p className="text-lg font-bold text-white">
                  {sharesToBuy.toFixed(2)} sRADB
                </p>
              </div>
            )}
          </div>

          {/* Percentage Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-300">
                Quick Select
              </label>
              <span className="text-xs text-gray-400">
                {percentage.toFixed(0)}%
              </span>
            </div>

            <Slider
              size="sm"
              step={25}
              color="secondary"
              showSteps={true}
              maxValue={100}
              minValue={0}
              value={percentage}
              onChange={(value) => handlePercentageChange(value as number)}
              className="max-w-md"
            />

            <div className="flex justify-between text-xs text-gray-400">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>

          <Divider />

          {/* Buy Button */}
          <Button
            fullWidth
            size="lg"
            color="secondary"
            className="bg-fuchsia-500/90 text-white font-semibold"
            onClick={handleBuy}
            isDisabled={!parseFloat(amount) || parseFloat(amount) <= 0}
          >
            <Icon icon="lucide:shopping-cart" className="mr-2" />
            Buy sRADB Shares
          </Button>
        </CardBody>
      </Card>

      {/* Transaction Details Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent className="bg-background/95 backdrop-blur-lg border border-white/10">
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-white">
              Transaction Details
            </h3>
            <p className="text-sm text-gray-400">Review your sRADB purchase</p>
          </ModalHeader>
          <ModalBody className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-gray-400">Amount to Pay</span>
                <span className="font-semibold text-white">
                  ${totalCost.toFixed(2)} USD
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-gray-400">sRADB to Receive</span>
                <span className="font-semibold text-white">
                  {sharesToBuy.toFixed(2)} sRADB
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-gray-400">Price per Share</span>
                <span className="font-semibold text-white">
                  ${currentPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-gray-400">Network Fee</span>
                <span className="font-semibold text-white">~$0.50</span>
              </div>

              <Divider />

              <div className="flex justify-between items-center p-3 bg-fuchsia-500/10 rounded-lg border border-fuchsia-500/20">
                <span className="text-gray-300 font-medium">Total Cost</span>
                <span className="font-bold text-fuchsia-400">
                  ${(totalCost + 0.5).toFixed(2)}
                </span>
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
              onPress={() => {
                // Handle the actual transaction here
                console.log("Processing transaction...");
                onOpenChange();
              }}
            >
              Confirm Purchase
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BuySharesComponent;
