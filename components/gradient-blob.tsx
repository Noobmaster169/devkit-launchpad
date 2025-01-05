import React from 'react'

export function GradientBlob() {
  return (
    <div className="inset-0 -z-10 overflow-hidden">
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(59,130,246,0.3) 50%, rgba(17,24,39,0) 70%)',
          filter: 'blur(100px)',
        }}
      />
    </div>
  )
}