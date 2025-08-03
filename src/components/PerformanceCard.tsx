import React from 'react';
import { Clock, Zap } from 'lucide-react';

interface PerformanceCardProps {
  title: string;
  time: number;
  variant: 'danger' | 'success';
  description: string;
}

export function PerformanceCard({ title, time, variant, description }: PerformanceCardProps) {
  const isSuccess = variant === 'success';
  const bgColor = isSuccess ? 'from-green-50 to-emerald-50' : 'from-red-50 to-pink-50';
  const borderColor = isSuccess ? 'border-green-100' : 'border-red-100';
  const iconBg = isSuccess ? 'bg-green-100' : 'bg-red-100';
  const iconColor = isSuccess ? 'text-green-600' : 'text-red-600';
  const textColor = isSuccess ? 'text-green-800' : 'text-red-800';
  const valueColor = isSuccess ? 'text-green-600' : 'text-red-600';
  const Icon = isSuccess ? Zap : Clock;

  return (
    <div className={`bg-gradient-to-br ${bgColor} rounded-xl p-6 border ${borderColor} transform hover:scale-105 transition-transform duration-200`}>
      <div className="flex items-center space-x-3 mb-3">
        <div className={`p-2 ${iconBg} rounded-lg`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <h3 className={`text-lg font-semibold ${textColor}`}>{title}</h3>
      </div>
      <div className={`text-3xl font-bold ${valueColor} mb-1`}>
        {time > 0 ? `${time}ms` : '—'}
      </div>
      <p className={`${valueColor} text-sm`}>{description}</p>
    </div>
  );
}