'use client'

import React from 'react'

// components/ui/spinner.tsx
export default function Spinner() {
    return (
        <div className="inset-0 h-[100%] z-50 flex items-center justify-center bg-white/60">
          <div className="text-center">
            <img
              src="/loading-gif.gif"
              alt="Loading..."
              className="mx-auto mb-2 w-10 h-10"
            />
            <div className="text-sm text-gray-700">Loading in progress</div>
          </div>
        </div>
      );
}
