import { useCallback } from "react";
import {
  useAbstraxionAccount,
  useAbstraxionSigningClient,
} from "@burnt-labs/abstraxion";

export function useTokenContract() {
  const {
    data: { bech32Address },
    isConnected,
  } = useAbstraxionAccount();
  const { client } = useAbstraxionSigningClient();

  const executeTransaction = useCallback(
    async (contractAddress, msg, funds) => {
      if (!client || !bech32Address) return;

      try {
        const result = await client.execute(
          bech32Address,
          contractAddress,
          msg,
          {
            amount: [{ amount: "0", denom: "uxion" }],
            gas: "500000",
            granter:
              "xion1h82c0efsxxq4pgua754u6xepfu6avglup20fl834gc2ah0ptgn5s2zffe9",
          },
          "",
          funds
        );
        return result;
      } catch (error) {
        console.error("Transaction failed:", error);
        throw error;
      }
    },
    [client, bech32Address]
  );

  const queryBalance = useCallback(
    async (tokenAddress) => {
      if (!client || !bech32Address) return 0;

      try {
        if (!tokenAddress) {
          const response = await client.getBalance(bech32Address, "uxion");
          return parseInt(response.amount) / 1000000;
        }

        const response = await client.queryContractSmart(tokenAddress, {
          balance: { address: bech32Address },
        });
        return parseInt(response.balance) / 1000000;
      } catch (error) {
        console.error("Balance query failed:", error);
        return 0;
      }
    },
    [client, bech32Address]
  );

  return {
    executeTransaction,
    queryBalance,
    bech32Address,
    isConnected,
  };
}
