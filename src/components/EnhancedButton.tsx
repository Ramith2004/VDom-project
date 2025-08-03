import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface EnhancedButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant: 'danger' | 'success' | 'neutral';
  icon: LucideIcon;
  children: React.ReactNode;
  loading?: boolean;
}

export function EnhancedButton({ 
  onClick, 
  disabled, 
  variant, 
  icon: Icon, 
  children, 
  loading 
}: EnhancedButtonProps) {
  const baseClasses = "group relative px-8 py-4 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
  
  const variantClasses = {
    danger: "bg-gradient-to-r from-red-500 to-pink-600 text-white",
    success: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
    neutral: "bg-gradient-to-r from-gray-500 to-slate-600 text-white"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      <div className="flex items-center space-x-3">
        <Icon className="w-5 h-5" />
        <span>{children}</span>
        {loading && (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        )}
      </div>
    </button>
  );
}