import React from 'react'

function Button({onClick, children, type = "button", className = ""}) {
  return (
    <button 
      type={type}
      onClick={onClick} 
      className={`bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-sage-500 transition-all duration-300 shadow-sm hover:shadow-lg active:scale-95 disabled:opacity-50 ${className}`}
    >
        {children}
    </button>
  )
}

export default Button;
