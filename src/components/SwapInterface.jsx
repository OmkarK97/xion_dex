import React, { useState, useCallback, useEffect } from "react";
import { TokenInput } from "./TokenInput";
import SkeletonLoader from "./SkeletonLoader";
import { useTokenContract } from "../hooks/useTokenContract";
import { useSwap } from "../hooks/useSwap";
import { useTokenPrice } from "../hooks/useTokenPrice";
import { token_weth, lp_address } from "../lib/utils";
import { useDebounce } from "../hooks/useDebounce";

export default function SwapInterface() {
  const [fromToken, setFromToken] = useState("XION");
  const [toToken, setToToken] = useState("WETH");
  const [amount, setAmount] = useState("");
  const [token1Balance, setToken1Balance] = useState(0);
  const [token2Balance, setToken2Balance] = useState(0);
  const [isBalancesLoading, setIsBalancesLoading] = useState(true);
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { queryBalance, isConnected, bech32Address } = useTokenContract();
  const { handleSwap, loading: swapLoading } = useSwap();
  const {
    calculatedAmount,
    isLoading: priceLoading,
    queryPrice,
  } = useTokenPrice(lp_address);
  const debouncedAmount = useDebounce(amount, 300);

  const updateBalances = useCallback(async () => {
    if (!isConnected) {
      setIsBalancesLoading(false);
      return;
    }

    setIsBalancesLoading(true);
    try {
      const [balance1, balance2] = await Promise.all([
        queryBalance(),
        queryBalance(token_weth),
      ]);

      setToken1Balance(balance1);
      setToken2Balance(balance2);
    } catch (error) {
      console.error("Failed to fetch balances:", error);
    } finally {
      setIsBalancesLoading(false);
    }
  }, [queryBalance, isConnected]);

  useEffect(() => {
    updateBalances();
  }, [updateBalances]);

  useEffect(() => {
    const fetchPrice = async () => {
      setIsPriceLoading(true);
      await queryPrice(debouncedAmount);
      setIsPriceLoading(false);
    };
    fetchPrice();
  }, [debouncedAmount, queryPrice]);

  useEffect(() => {
    if (!isBalancesLoading && !isPriceLoading) {
      setIsLoading(isBalancesLoading || isPriceLoading);
    }
  }, [isBalancesLoading, isPriceLoading]);

  console.log(isLoading);

  const handleSwapClick = async () => {
    await handleSwap(Number(amount), token_weth, updateBalances);
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-[#00E4FF] text-4xl font-bold mb-2">XION Swap</h1>
        <p className="text-gray-400">
          Trade tokens instantly on XION blockchain
        </p>
      </div>

      <div className="bg-[#1A1B23] rounded-2xl p-6">
        <TokenInput
          amount={amount}
          onAmountChange={setAmount}
          token={fromToken}
          onTokenChange={setFromToken}
          balance={token1Balance}
          options={["XION", "ETH", "USDC"]}
          onMaxClick={() => setAmount(token1Balance.toString())}
          showMaxButton
          isLoading={isBalancesLoading}
        />

        <TokenInput
          amount={calculatedAmount}
          token={toToken}
          onTokenChange={setToToken}
          balance={token2Balance}
          options={["WETH", "USDC", "XION"]}
          disabled
          isLoading={isPriceLoading}
        />

        <div className="bg-[#212128] rounded-xl p-3 mb-4">
          <div className="flex justify-between text-gray-400 text-sm">
            <span>Rate</span>
            <span>
              1 XION ={" "}
              {calculatedAmount
                ? (Number(calculatedAmount) / Number(amount)).toFixed(6)
                : "0.000000"}{" "}
              WETH
            </span>
          </div>
        </div>

        {isConnected && bech32Address && !isLoading ? (
          <button
            className={`w-full py-4 rounded-xl bg-gradient-to-r from-[#00E4FF] to-[#0066FF] text-white font-medium hover:opacity-90 ${
              swapLoading ? "opacity-70 cursor-progress" : ""
            }`}
            onClick={handleSwapClick}
            disabled={swapLoading || !amount || isLoading}
          >
            {swapLoading ? "Swapping..." : "Swap"}
          </button>
        ) : (
          <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00E4FF] to-[#0066FF] text-white font-medium hover:opacity-90">
            Connect Wallet to Swap
          </button>
        )}
      </div>
    </div>
  );
}
``