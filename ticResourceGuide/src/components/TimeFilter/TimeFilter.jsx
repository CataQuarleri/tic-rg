import React from 'react';

const options = [
  { label: '5 min', value: 5, description: 'Micro-break' },
  { label: '20 min', value: 20, description: 'Deep breath' },
  { label: '40 min', value: 40, description: 'Focus session' }
];

const TimeFilter = ({ selected, onSelect }) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
      <label className="text-slate-600 font-medium text-center mb-2">
        How much time do you have?
      </label>
      <div className="bg-slate-100 p-1.5 rounded-3xl flex gap-1 relative overflow-hidden">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`flex-1 py-3 px-4 rounded-2xl text-sm font-semibold transition-all duration-300 relative z-10 ${
              selected === option.value 
                ? 'text-sage-700 bg-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <span className="block">{option.label}</span>
            <span className="text-[10px] opacity-60 block font-normal">{option.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeFilter;
