import { Check, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface TemplateSelectionProps {
  selectedTemplate?: {
    id: string;
    name: string;
    price: number;
  };
  onSelect: (template: { id: string; name: string; price: number }) => void;
}

const TEMPLATES = [
  {
    id: 'business',
    name: 'Business Pro',
    description: 'Perfect for corporate websites and professional services',
    price: 500000,
    features: ['5 Pages', 'Contact Form', 'Responsive Design', 'SEO Ready'],
    image: 'https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidXNpbmVzcyUyMHdlYnNpdGUlMjB0ZW1wbGF0ZXxlbnwxfHx8fDE3NzQ3OTIzNzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    popular: true,
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    description: 'Full-featured online store with shopping cart',
    price: 800000,
    features: ['Product Catalog', 'Shopping Cart', 'Payment Gateway', 'Order Management'],
    image: 'https://images.unsplash.com/photo-1688561807971-728cd39eb71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBvbmxpbmUlMjBzdG9yZXxlbnwxfHx8fDE3NzQ3OTIzNzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    popular: true,
  },
  {
    id: 'portfolio',
    name: 'Creative Portfolio',
    description: 'Showcase your work with style and elegance',
    price: 400000,
    features: ['Gallery', 'Project Showcase', 'About Page', 'Contact Form'],
    image: 'https://images.unsplash.com/photo-1760071744047-5542cbfda184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjBjcmVhdGl2ZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzQ3OTIzNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    popular: false,
  },
  {
    id: 'restaurant',
    name: 'Restaurant & Cafe',
    description: 'Delicious design for food businesses',
    price: 600000,
    features: ['Menu Display', 'Reservation System', 'Gallery', 'Location Map'],
    image: 'https://images.unsplash.com/photo-1710732652617-264d6f860546?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMG1lbnV8ZW58MXx8fHwxNzc0NzkyMzcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    popular: false,
  },
  {
    id: 'corporate',
    name: 'Corporate Elite',
    description: 'Premium template for large organizations',
    price: 900000,
    features: ['10+ Pages', 'Team Section', 'Blog', 'Multi-language Support'],
    image: 'https://images.unsplash.com/photo-1752170080668-fa46b5539cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBwcm9mZXNzaW9uYWwlMjBvZmZpY2V8ZW58MXx8fHwxNzc0Nzc3MzIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    popular: false,
  },
  {
    id: 'blog',
    name: 'Blog & News',
    description: 'Clean and minimal blog template',
    price: 350000,
    features: ['Blog Posts', 'Categories', 'Comments', 'Social Share'],
    image: 'https://images.unsplash.com/photo-1575424909972-82cf8c74e559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9nJTIwbWluaW1hbCUyMGNsZWFufGVufDF8fHx8MTc3NDc5MjM3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    popular: false,
  },
];

export function TemplateSelection({ selectedTemplate, onSelect }: TemplateSelectionProps) {
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
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Template</h2>
        <p className="text-gray-600">Select a professionally designed template that fits your needs</p>
      </div>

      {/* Selected Template Display */}
      {selectedTemplate && (
        <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-500 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Check className="text-blue-600" size={24} />
            <div>
              <p className="font-semibold text-blue-900">Selected Template</p>
              <p className="text-blue-700">{selectedTemplate.name}</p>
            </div>
          </div>
          <p className="text-blue-900 font-bold text-xl">{formatPrice(selectedTemplate.price)}</p>
        </div>
      )}

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(template)}
            className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all hover:shadow-xl ${
              selectedTemplate?.id === template.id
                ? 'border-blue-600 ring-4 ring-blue-200'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            {/* Template Image */}
            <div className="relative h-48 overflow-hidden bg-gray-200">
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-full object-cover"
              />
              {template.popular && (
                <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Sparkles size={12} />
                  Popular
                </div>
              )}
              {selectedTemplate?.id === template.id && (
                <div className="absolute inset-0 bg-blue-600 bg-opacity-20 flex items-center justify-center">
                  <div className="bg-blue-600 text-white rounded-full p-3">
                    <Check size={24} />
                  </div>
                </div>
              )}
            </div>

            {/* Template Info */}
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{template.description}</p>

              {/* Features */}
              <div className="space-y-2 mb-4">
                {template.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={16} className="text-green-600" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">{formatPrice(template.price)}</span>
                <button
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedTemplate?.id === template.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {selectedTemplate?.id === template.id ? 'Selected' : 'Select'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
