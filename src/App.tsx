import React, { useState, useEffect } from 'react';
import { Shuffle, Clock, Zap, List, Sparkles } from 'lucide-react';

interface HeavyItemProps {
  value: string;
  index: number;
}

function HeavyItem({ value, index }: HeavyItemProps) {
  // Simulate heavy computation
  let total = 0;
  for (let i = 0; i < 100000; i++) {
    total += Math.sqrt(i);
  }
  
  return (
    <li className="group relative bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
          {index + 1}
        </div>
        <span className="text-gray-700 font-medium">{value}</span>
        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Sparkles className="w-4 h-4 text-indigo-400" />
        </div>
      </div>
    </li>
  );
}

function App() {
  const [items, setItems] = useState<string[]>([]);
  const [noKeyItems, setNoKeyItems] = useState<React.ReactElement[]>([]);
  const [keyedItems, setKeyedItems] = useState<React.ReactElement[]>([]);
  const [timeNoKey, setTimeNoKey] = useState<number>(0);
  const [timeWithKey, setTimeWithKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeDemo, setActiveDemo] = useState<'none' | 'nokey' | 'keyed'>('none');

  useEffect(() => {
    const generatedItems = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
    setItems(generatedItems);
  }, []);

  const shuffle = (array: string[]): string[] => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const renderWithoutKeys = async () => {
    setIsLoading(true);
    setActiveDemo('nokey');
    
    // Add a small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const shuffled = shuffle(items);
    const t0 = performance.now();
    const rendered = shuffled.map((item, index) => <HeavyItem value={item} index={index} />);
    const t1 = performance.now();
    
    setNoKeyItems(rendered);
    setTimeNoKey(parseFloat((t1 - t0).toFixed(2)));
    setIsLoading(false);
  };

  const renderWithKeys = async () => {
    setIsLoading(true);
    setActiveDemo('keyed');
    
    // Add a small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const shuffled = shuffle(items);
    const t0 = performance.now();
    const rendered = shuffled.map((item, index) => <HeavyItem key={item} value={item} index={index} />);
    const t1 = performance.now();
    
    setKeyedItems(rendered);
    setTimeWithKey(parseFloat((t1 - t0).toFixed(2)));
    setIsLoading(false);
  };

  const resetDemo = () => {
    setActiveDemo('none');
    setNoKeyItems([]);
    setKeyedItems([]);
    setTimeNoKey(0);
    setTimeWithKey(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="relative overflow-hidden bg-white shadow-sm border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                React VDOM Diffing Demo
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore the performance difference between React components with and without keys. 
              Watch how the Virtual DOM optimization affects rendering performance.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Control Panel */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Performance Test Controls</h2>
            <p className="text-gray-600">Click the buttons below to test rendering performance</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={renderWithoutKeys}
              disabled={isLoading}
              className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5" />
                <span>Render With Keys</span>
                {isLoading && activeDemo === 'nokey' && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                )}
              </div>
            </button>

            <button
              onClick={renderWithKeys}
              disabled={isLoading}
              className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="flex items-center space-x-3">
                <List className="w-5 h-5" />
                <span>Render Without Keys</span>
                {isLoading && activeDemo === 'keyed' && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                )}
              </div>
            </button>

            <button
              onClick={resetDemo}
              disabled={isLoading}
              className="group relative px-8 py-4 bg-gradient-to-r from-gray-500 to-slate-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="flex items-center space-x-3">
                <Shuffle className="w-5 h-5" />
                <span>Reset Demo</span>
              </div>
            </button>
          </div>

          {/* Performance Stats */}
          {(timeNoKey > 0 || timeWithKey > 0) && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-800">With Keys</h3>
                </div>
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {timeNoKey > 0 ? `${timeNoKey}ms` : '—'}
                </div>
                <p className="text-green-600 text-sm">Optimized rendering with key-based diffing</p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Clock className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-red-800">Without Keys</h3>
                </div>
                <div className="text-3xl font-bold text-red-600 mb-1">
                  {timeWithKey > 0 ? `${timeWithKey}ms` : '—'}
                </div>
                <p className="text-red-600 text-sm">Slower rendering due to full reconciliation</p>
              </div>
            </div>
          )}

          {/* Performance Comparison */}
          {timeNoKey > 0 && timeWithKey > 0 && (
            <div className="mt-6 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-indigo-800 mb-2">Performance Improvement</h4>
                <div className="text-2xl font-bold text-indigo-600">
                  {timeNoKey > timeWithKey 
                    ? `${((timeNoKey - timeWithKey) / timeNoKey * 100).toFixed(1)}% faster than without keys`
                    : timeWithKey > timeNoKey 
                    ? `${((timeWithKey - timeNoKey) / timeWithKey * 100).toFixed(1)}% faster than without keys`
                    : 'Similar performance'
                  }
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Display */}
        {(noKeyItems.length > 0 || keyedItems.length > 0) && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Without Keys */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
                <div className="flex items-center space-x-3">
                  <List className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-bold text-white">With Keys</h3>
                </div>
                <p className="text-red-100 text-sm mt-1">
                  React can efficiently identify and reuse elements
                </p>
              </div>
              <div className="p-6">
                <div className="max-h-96 overflow-y-auto">
                  <ul className="space-y-3">
                    {noKeyItems}
                  </ul>
                </div>
              </div>
            </div>

            {/* With Keys */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 px-6 py-4">
                <div className="flex items-center space-x-3">
                  <Zap className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-bold text-white">Without Keys</h3>
                </div>
                <p className="text-green-100 text-sm mt-1">
                  React must reconcile each element individually
                </p>
              </div>
              <div className="p-6">
                <div className="max-h-96 overflow-y-auto">
                  <ul className="space-y-3">
                    {keyedItems}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Educational Content */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Why Keys Matter</h2>
            <p className="text-gray-600">Understanding React's Virtual DOM optimization</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <List className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Without Keys</h3>
              <p className="text-blue-600 text-sm">
                React compares elements by position, leading to unnecessary re-renders and DOM manipulations.
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">With Keys</h3>
              <p className="text-green-600 text-sm">
                React uses keys to identify elements, enabling efficient reordering and minimal DOM updates.
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Best Practice</h3>
              <p className="text-purple-600 text-sm">
                Always use stable, unique keys when rendering lists to optimize performance and avoid bugs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;