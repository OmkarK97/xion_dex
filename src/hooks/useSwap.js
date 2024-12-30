import { useState, useCallback } from "react";
import { useTokenContract } from "./useTokenContract";
import { coin } from "@cosmjs/stargate";
import { lp_address, parseMantra } from "../lib/utils";

export function useSwap() {
  const [loading, setLoading] = useState(false);
  const { executeTransaction } = useTokenContract();

  const increaseAllowance = useCallback(
    async (contractAddress, amount) => {
      const amountInMantra = parseMantra(amount).toString();
      await executeTransaction(contractAddress, {
        increase_allowance: {
          spender: lp_address,
          amount: amountInMantra,
        },
      });
    },
    [executeTransaction]
  );

  const swapTokens = useCallback(
    async (amount) => {
      const amountInMantra = parseMantra(amount).toString();
      await executeTransaction(
        lp_address,
        {
          swap: {
            input_token: "Token1",
            input_amount: amountInMantra,
            min_output: "0",
          },
        },
        [coin(amountInMantra, "uxion")]
      );
    },
    [executeTransaction]
  );

  const handleSwap = useCallback(
    async (amount, tokenAddress, onSuccess) => {
      try {
        setLoading(true);
        await increaseAllowance(tokenAddress, amount);
        await swapTokens(amount);
        onSuccess?.();
      } catch (error) {
        console.error("Swap failed:", error);
      } finally {
        setLoading(false);
      }
    },
    [increaseAllowance, swapTokens]
  );

  return {
    handleSwap,
    loading,
  };
}
