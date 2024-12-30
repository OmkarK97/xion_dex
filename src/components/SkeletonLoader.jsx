import React from 'react'

const SkeletonLoader = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-12 animate-pulse">
      <div className="text-center mb-8">
        <div className="h-10 bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
      </div>

      <div className="bg-[#1A1B23] rounded-2xl p-6">
        {/* First Input Skeleton */}
        <div className="bg-[#212128] rounded-xl p-4 mb-4">
          <div className="flex gap-4">
            <div className="h-8 bg-gray-700 rounded flex-1"></div>
            <div className="h-8 bg-gray-700 rounded w-24"></div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="h-4 bg-gray-700 rounded w-24"></div>
            <div className="h-4 bg-gray-700 rounded w-12"></div>
          </div>
        </div>

        {/* Second Input Skeleton */}
        <div className="bg-[#212128] rounded-xl p-4 mb-4">
          <div className="flex gap-4">
            <div className="h-8 bg-gray-700 rounded flex-1"></div>
            <div className="h-8 bg-gray-700 rounded w-24"></div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="h-4 bg-gray-700 rounded w-24"></div>
          </div>
        </div>

        {/* Rate Skeleton */}
        <div className="bg-[#212128] rounded-xl p-3 mb-4">
          <div className="flex justify-between">
            <div className="h-4 bg-gray-700 rounded w-12"></div>
            <div className="h-4 bg-gray-700 rounded w-32"></div>
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="h-12 bg-gray-700 rounded-xl w-full"></div>
      </div>
    </div>
  )
}

export default SkeletonLoader;