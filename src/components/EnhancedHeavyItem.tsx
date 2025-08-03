import React from 'react';
import { Sparkles, Zap } from 'lucide-react';

interface EnhancedHeavyItemProps {
  value: string;
  index: number;
  variant?: 'default' | 'keyed';
}

export function EnhancedHeavyItem({ value, index, variant = 'default' }: EnhancedHeavyItemProps) {
  // Simulate heavy computation
  let total = 0;
  for (let i = 0; i < 100000; i++) {
    total += Math.sqrt(i);
  }
  
  const isKeyed = variant === 'keyed';
  const gradientFrom = isKeyed ? 'from-green-500' : 'from-indigo-500';
  const gradientTo = isKeyed ? 'to-emerald-600' : 'to-purple-600';
  const hoverBorder = isKeyed ? 'hover:border-green-200' : 'hover:border-indigo-200';
  const iconColor = isKeyed ? 'text-green-400' : 'text-indigo-400';
  const Icon = isKeyed ? Zap : Sparkles;
  
  return (
    <li className={`group relative bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-lg ${hoverBorder} transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]`}>
      <div className="flex items-center space-x-4">
        <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
          {index + 1}
        </div>
        <span className="text-gray-800 font-semibold text-lg">{value}</span>
        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
    </li>
  );
}