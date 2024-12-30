import { useState, useEffect, useCallback } from 'react'
import { useAbstraxionSigningClient } from "@burnt-labs/abstraxion"
import { parseMantra } from "../lib/utils"

export function useTokenPrice(lpPoolAddress) {
  const [calculatedAmount, setCalculatedAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { client } = useAbstraxionSigningClient()

  const queryPrice = useCallback(async (amount) => {
    if (!client || !amount || parseFloat(amount) === 0) {
      setCalculatedAmount("")
      return
    }

    setIsLoading(true)
    try {
      const fromValue = parseMantra(parseFloat(amount)).toString()
      const response = await client.queryContractSmart(lpPoolAddress, {
        token1_for_token2_price: { token1_amount: fromValue },
      })
      setCalculatedAmount((response.token2_amount / 1000000).toString())
    } catch (error) {
      console.error('Price query failed:', error)
      setCalculatedAmount("")
    } finally {
      setIsLoading(false)
    }
  }, [client, lpPoolAddress])

  return { calculatedAmount, isLoading, queryPrice }
}

