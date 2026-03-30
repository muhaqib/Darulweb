import { useState } from "react";
import { Upload, FileImage, Check, Send, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import type { BuilderData } from "../../pages/WebsiteBuilder";

interface PaymentUploadProps {
  builderData: BuilderData;
  onFileSelect: (file: File | null) => void;
}

export function PaymentUpload({
  builderData,
  onFileSelect,
}: PaymentUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const totalAmount =
    (builderData.domainPrice || 0) + (builderData.template?.price || 0);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile || !builderData.personalData) return;

    setIsSubmitting(true);

    // Create message for WhatsApp
    const message = `
🌐 *NEW WEBSITE ORDER - Attaqonyy Web*

📋 *Order Details:*
━━━━━━━━━━━━━━━━━━━━

👤 *Personal Information:*
Name: ${builderData.personalData.fullName}
Email: ${builderData.personalData.email}
Phone: ${builderData.personalData.phone}
${builderData.personalData.company ? `Company: ${builderData.personalData.company}` : ""}
${builderData.personalData.address ? `Address: ${builderData.personalData.address}` : ""}

🌍 *Domain:*
${builderData.domain} - ${formatPrice(builderData.domainPrice || 0)}

🎨 *Template:*
${builderData.template?.name} - ${formatPrice(builderData.template?.price || 0)}

💰 *Total Amount:*
${formatPrice(totalAmount)}

━━━━━━━━━━━━━━━━━━━━
📎 Payment proof has been uploaded
Please check the attached screenshot.

Thank you for choosing Attaqonyy Web! 🚀
    `.trim();

    // Encode message for WhatsApp URL
    // const encodedMessage = encodeURIComponent(message);
    // const EmailUrl = `https://formspree.io/f/meepalnw?text=${encodedMessage}`;

    try {
      const response = await fetch("https://formspree.io/f/meepalnw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          message: message,
          name: builderData.personalData.fullName,
          email: builderData.personalData.email,
        }),
      });

      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitting(false);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="text-green-600" size={40} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Order Submitted Successfully! 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            Your order has been sent to WhatsApp. Our team will review your
            payment proof and contact you shortly to confirm your order.
          </p>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-blue-900 mb-3">What's Next?</h3>
            <ul className="text-left text-blue-800 space-y-2">
              <li className="flex items-start gap-2">
                <Check className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                <span>Our team will verify your payment within 1-2 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                <span>You'll receive a confirmation message on WhatsApp</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                <span>
                  We'll start building your website immediately after
                  confirmation
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                <span>Your website will be ready in 3-5 business days</span>
              </li>
            </ul>
          </div>
          <a
            href="/"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
          >
            Back to Home
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Payment & Upload
        </h2>
        <p className="text-gray-600">
          Complete your payment and upload the proof
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Order Summary */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 mb-8 border-2 border-blue-200">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            Order Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-blue-200">
              <div>
                <p className="font-medium text-blue-900">Domain</p>
                <p className="text-sm text-blue-700">{builderData.domain}</p>
              </div>
              <p className="font-semibold text-blue-900">
                {formatPrice(builderData.domainPrice || 0)}
              </p>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-blue-200">
              <div>
                <p className="font-medium text-blue-900">Template</p>
                <p className="text-sm text-blue-700">
                  {builderData.template?.name}
                </p>
              </div>
              <p className="font-semibold text-blue-900">
                {formatPrice(builderData.template?.price || 0)}
              </p>
            </div>
            <div className="flex justify-between items-center pt-2">
              <p className="text-xl font-bold text-blue-900">Total Amount</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatPrice(totalAmount)}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8 border-2 border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Payment Details
          </h3>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Bank Transfer</p>
              <p className="text-xl font-bold text-gray-900">
                BSI - 7339306308
              </p>
              <p className="text-sm text-gray-600">a.n. Muhammad Aqib</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">
                E-Wallet (OVO/GoPay/Dana)
              </p>
              <p className="text-xl font-bold text-gray-900">0882005266580</p>
              <p className="text-sm text-gray-600">a.n. Muhammad Aqib</p>
            </div>
          </div>
          <div className="mt-4 flex items-start gap-2 text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <AlertCircle
              className="text-yellow-600 flex-shrink-0 mt-0.5"
              size={18}
            />
            <p>
              Please transfer the exact amount of{" "}
              <strong>{formatPrice(totalAmount)}</strong> to ensure faster
              verification.
            </p>
          </div>
        </div>

        {/* Upload Payment Proof */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Upload Payment Proof
          </h3>
          {!previewUrl ? (
            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="border-3 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Click to upload payment proof
                </p>
                <p className="text-sm text-gray-500">
                  Supports: JPG, PNG, or PDF (Max 5MB)
                </p>
              </div>
            </label>
          ) : (
            <div className="space-y-4">
              <div className="border-2 border-green-500 rounded-xl p-4 bg-green-50">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-white border-2 border-green-500">
                    <img
                      src={previewUrl}
                      alt="Payment proof"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <FileImage className="text-green-600" size={20} />
                      <p className="font-semibold text-green-900">
                        {selectedFile?.name}
                      </p>
                    </div>
                    <p className="text-sm text-green-700">
                      {(selectedFile!.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <Check className="text-green-600" size={32} />
                </div>
              </div>
              <label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="text-center">
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Change File
                  </button>
                </div>
              </label>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            onClick={handleSubmit}
            disabled={!selectedFile || isSubmitting}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
              !selectedFile || isSubmitting
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
                Sending to WhatsApp...
              </>
            ) : (
              <>
                <Send size={24} />
                Submit Order to WhatsApp
              </>
            )}
          </button>
        </div>

        {/* Customer Data Summary */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-2">Your Information:</p>
          <p>Name: {builderData.personalData?.fullName}</p>
          <p>Email: {builderData.personalData?.email}</p>
          <p>Phone: {builderData.personalData?.phone}</p>
        </div>
      </div>
    </div>
  );
}
