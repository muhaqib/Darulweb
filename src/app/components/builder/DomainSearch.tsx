import { useState } from 'react';
import { Search, Check, Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface DomainSearchProps {
  selectedDomain?: string;
  selectedPrice?: number;
  onSelect: (domain: string, price: number) => void;
}

interface DomainResult {
  domain: string;
  extension: string;
  price: number;
  available: boolean;
  popular?: boolean;
}

const DOMAIN_PRICES = {
  '.com': 150000,
  '.net': 120000,
  '.org': 100000,
  '.id': 200000,
  '.co.id': 180000,
  '.web.id': 150000,
  '.my.id': 140000,
  '.io': 300000,
  '.dev': 250000,
  '.app': 180000,
};

export function DomainSearch({ selectedDomain, selectedPrice, onSelect }: DomainSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<DomainResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const results: DomainResult[] = Object.entries(DOMAIN_PRICES).map(([ext, price]) => ({
        domain: `${searchQuery.toLowerCase().replace(/\s+/g, '')}${ext}`,
        extension: ext,
        price,
        available: Math.random() > 0.3, // Random availability for demo
        popular: ['.com', '.id', '.co.id'].includes(ext),
      }));

      setSearchResults(results);
      setIsSearching(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Domain</h2>
        <p className="text-gray-600">Search for available domain names for your website</p>
      </div>

      {/* Search Input */}
      <div className="mb-8">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your desired domain name..."
              className="w-full px-4 py-4 pl-12 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
            />
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <button
            onClick={handleSearch}
            disabled={!searchQuery.trim() || isSearching}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
          >
            <Search size={20} />
            Search
          </button>
        </div>
      </div>

      {/* Selected Domain Display */}
      {selectedDomain && (
        <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Check className="text-green-600" size={24} />
            <div>
              <p className="font-semibold text-green-900">Selected Domain</p>
              <p className="text-green-700">{selectedDomain}</p>
            </div>
          </div>
          <p className="text-green-900 font-bold text-xl">{formatPrice(selectedPrice || 0)}</p>
        </div>
      )}

      {/* Search Results */}
      {isSearching && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Searching available domains...</p>
        </div>
      )}

      {!isSearching && searchResults.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 mb-4">Available Domains</h3>
          {searchResults.map((result, index) => (
            <motion.div
              key={result.domain}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 border-2 rounded-lg transition-all cursor-pointer ${
                result.available
                  ? selectedDomain === result.domain
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
              }`}
              onClick={() => {
                if (result.available) {
                  onSelect(result.domain, result.price);
                }
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      result.available ? 'bg-green-100' : 'bg-gray-200'
                    }`}
                  >
                    {result.available ? (
                      <Check className="text-green-600" size={20} />
                    ) : (
                      <span className="text-gray-500 font-bold">✕</span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 flex items-center gap-2">
                      {result.domain}
                      {result.popular && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          Popular
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500">
                      {result.available ? 'Available now' : 'Not available'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">{formatPrice(result.price)}</p>
                  <p className="text-xs text-gray-500">/year</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!isSearching && searchResults.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Globe size={64} className="mx-auto mb-4 opacity-30" />
          <p>Enter a domain name to start searching</p>
        </div>
      )}
    </div>
  );
}
