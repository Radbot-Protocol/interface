"use client";

import { Button } from "@heroui/react";
import React from "react";

interface ConnectWalletProps {
  type?: "lg" | "sm";
}

const ConnectWallet = ({ type = "sm" }: ConnectWalletProps) => {
  return (
    <div>
      {type === "lg" ? (
        <Button
          fullWidth
          radius="lg"
          color="primary"
          size="lg"
          className="bg-fuchsia-500/90 text-black"
        >
          Connect Wallet
        </Button>
      ) : (
        <Button
          radius="lg"
          color="primary"
          size="md"
          className="bg-fuchsia-500/10 text-fuchsia-400"
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default ConnectWallet;
