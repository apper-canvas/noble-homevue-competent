import React from 'react'

const Loading = ({ type = 'properties' }) => {
  if (type === 'detail') {
    return (
      <div className="animate-pulse">
        <div className="w-full h-96 bg-gray-300 rounded-lg mb-8 shimmer"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="h-8 bg-gray-300 rounded mb-4 shimmer"></div>
            <div className="h-6 bg-gray-300 rounded mb-2 w-1/3 shimmer"></div>
            <div className="space-y-3 mb-6">
              <div className="h-4 bg-gray-300 rounded shimmer"></div>
              <div className="h-4 bg-gray-300 rounded shimmer"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 shimmer"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-300 rounded shimmer"></div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-card shadow-card">
            <div className="h-6 bg-gray-300 rounded mb-4 shimmer"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-300 rounded shimmer"></div>
              ))}
            </div>
            <div className="h-12 bg-gray-300 rounded mt-6 shimmer"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(9)].map((_, index) => (
        <div key={index} className="bg-white rounded-card shadow-card overflow-hidden animate-pulse">
          <div className="w-full h-48 bg-gray-300 shimmer"></div>
          <div className="p-6">
            <div className="h-8 bg-gray-300 rounded mb-3 shimmer"></div>
            <div className="h-4 bg-gray-300 rounded mb-2 shimmer"></div>
            <div className="h-4 bg-gray-300 rounded mb-4 w-2/3 shimmer"></div>
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <div className="h-4 bg-gray-300 rounded w-12 shimmer"></div>
                <div className="h-4 bg-gray-300 rounded w-12 shimmer"></div>
                <div className="h-4 bg-gray-300 rounded w-16 shimmer"></div>
              </div>
              <div className="h-8 w-8 bg-gray-300 rounded-full shimmer"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Loading