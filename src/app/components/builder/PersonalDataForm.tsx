import { useState } from 'react';
import { User, Mail, Phone, Building, MapPin } from 'lucide-react';

interface PersonalDataFormProps {
  data?: {
    fullName: string;
    email: string;
    phone: string;
    company?: string;
    address?: string;
  };
  onUpdate: (data: {
    fullName: string;
    email: string;
    phone: string;
    company?: string;
    address?: string;
  }) => void;
}

export function PersonalDataForm({ data, onUpdate }: PersonalDataFormProps) {
  const [formData, setFormData] = useState({
    fullName: data?.fullName || '',
    email: data?.email || '',
    phone: data?.phone || '',
    company: data?.company || '',
    address: data?.address || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAndUpdate = (updatedData: typeof formData) => {
    // Validate and update parent component
    if (updatedData.fullName && updatedData.email && updatedData.phone) {
      const newErrors: Record<string, string> = {};

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updatedData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      // Phone validation (Indonesian format)
      const phoneRegex = /^(08|62|0)[0-9]{9,12}$/;
      if (!phoneRegex.test(updatedData.phone.replace(/[\s-]/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        onUpdate(updatedData);
      }
    } else {
      // Clear errors if required fields are empty
      setErrors({});
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    validateAndUpdate(updatedData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Personal Information</h2>
        <p className="text-gray-600">Please fill in your details to continue</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
              className={`w-full px-4 py-3 pl-12 border-2 rounded-lg focus:outline-none ${
                errors.email
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="08xxxxxxxxxx"
              required
              className={`w-full px-4 py-3 pl-12 border-2 rounded-lg focus:outline-none ${
                errors.phone
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>

        {/* Company (Optional) */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            Company Name <span className="text-gray-400">(Optional)</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your company name"
              className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
            <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Address (Optional) */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Address <span className="text-gray-400">(Optional)</span>
          </label>
          <div className="relative">
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Your complete address"
              rows={3}
              className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
            />
            <MapPin className="absolute left-4 top-4 text-gray-400" size={20} />
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mt-6">
          <p className="text-sm text-blue-900">
            <strong>Privacy Note:</strong> Your information will be used only for order processing and
            communication regarding your website project. We respect your privacy and will not share your
            data with third parties.
          </p>
        </div>
      </div>
    </div>
  );
}