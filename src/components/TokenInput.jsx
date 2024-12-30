import React from 'react'
import TokenSelect from './TokenSelect'

export function TokenInput({
  amount,
  onAmountChange,
  token,
  onTokenChange,
  balance,
  options,
  onMaxClick,
  disabled,
  showMaxButton,
  isLoading
}) {
  return (
    <div className="bg-[#212128] rounded-xl p-4 mb-4">
      <div className="flex gap-4">
        <input
          type="number"
          placeholder="0"
          className="flex-1 bg-transparent text-2xl text-white border-none outline-none placeholder-gray-600"
          onChange={(e) => onAmountChange?.(e.target.value)}
          value={amount}
          disabled={disabled || isLoading}
        />
        <TokenSelect
          value={token}
          onChange={onTokenChange}
          options={options}
          disabled={isLoading}
        />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-gray-500 text-sm">
          {isLoading ? 'Loading...' : `Balance: ${balance.toFixed(6)}`}
        </span>
        {showMaxButton && !isLoading && (
          <button
            className="text-[#00E4FF] text-sm hover:opacity-80"
            onClick={onMaxClick}
          >
            Max
          </button>
        )}
      </div>
    </div>
  )
}

