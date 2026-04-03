import React from 'react';

/**
 * OrderTimeline Component
 * Visual timeline for order status
 */
// Amazon-like progress bar for order status
const OrderTimeline = ({ status, statusHistory = [] }) => {
  const statuses = ['Pending', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
  const currentIndex = statuses.indexOf(status);

  return (
    <div className="py-6">
      <div className="flex items-center justify-between relative">
        {/* Progress Bar */}
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 -z-10">
          <div
            className="h-full bg-primary-600 transition-all duration-700"
            style={{
              width: `${(currentIndex / (statuses.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Steps with connecting lines */}
        {statuses.map((step, index) => {
          const isCompleted = index <= currentIndex;
          return (
            <div key={step} className="flex flex-col items-center relative z-10 w-1/5">
              {/* Connecting line to previous step */}
              {index > 0 && (
                <div
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 w-1/2 ${index <= currentIndex ? 'bg-primary-600' : 'bg-gray-200'}`}
                  style={{ zIndex: -1 }}
                />
              )}
              {/* Step Dot */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold border-2 transition-all ${
                  isCompleted
                    ? 'bg-primary-600 border-primary-600 text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
              {/* Connecting line to next step */}
              {index < statuses.length - 1 && (
                <div
                  className={`absolute right-0 top-1/2 -translate-y-1/2 h-1 w-1/2 ${index < currentIndex ? 'bg-primary-600' : 'bg-gray-200'}`}
                  style={{ zIndex: -1 }}
                />
              )}
              {/* Step Label */}
              <span className={`mt-2 text-xs font-medium ${isCompleted ? 'text-primary-700' : 'text-gray-400'}`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTimeline;