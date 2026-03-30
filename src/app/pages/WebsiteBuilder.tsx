import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router";
import logo from "../../assets/darulweblogo.png";
import { DomainSearch } from "../components/builder/DomainSearch";
import { TemplateSelection } from "../components/builder/TemplateSelection";
import { PersonalDataForm } from "../components/builder/PersonalDataForm";
import { PaymentUpload } from "../components/builder/PaymentUpload";

export interface BuilderData {
  domain?: string;
  domainPrice?: number;
  template?: {
    id: string;
    name: string;
    price: number;
  };
  personalData?: {
    fullName: string;
    email: string;
    phone: string;
    company?: string;
    address?: string;
  };
  paymentProof?: File | null;
}

const STEPS = [
  { id: 1, title: "Domain Search", description: "Find your perfect domain" },
  { id: 2, title: "Choose Template", description: "Select your design" },
  { id: 3, title: "Personal Info", description: "Enter your details" },
  { id: 4, title: "Payment", description: "Complete your order" },
];

export function WebsiteBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [builderData, setBuilderData] = useState<BuilderData>({});

  const updateBuilderData = (data: Partial<BuilderData>) => {
    setBuilderData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return builderData.domain && builderData.domainPrice;
      case 2:
        return builderData.template;
      case 3:
        return (
          builderData.personalData?.fullName &&
          builderData.personalData?.email &&
          builderData.personalData?.phone
        );
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
            >
              <img
                src={logo}
                alt="Logo"
                className="h-16 w-auto" // tinggi 4rem (~64px)
              />
            </Link>
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                      currentStep > step.id
                        ? "bg-green-500 text-white"
                        : currentStep === step.id
                          ? "bg-blue-600 text-white ring-4 ring-blue-200"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {currentStep > step.id ? <Check size={20} /> : step.id}
                  </div>
                  <div className="text-center mt-2">
                    <div
                      className={`text-sm font-medium ${
                        currentStep >= step.id
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-400 hidden md:block">
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-all ${
                      currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                    }`}
                    style={{ maxWidth: "100px" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            {currentStep === 1 && (
              <DomainSearch
                selectedDomain={builderData.domain}
                selectedPrice={builderData.domainPrice}
                onSelect={(domain, price) => {
                  updateBuilderData({ domain, domainPrice: price });
                }}
              />
            )}
            {currentStep === 2 && (
              <TemplateSelection
                selectedTemplate={builderData.template}
                onSelect={(template) => {
                  updateBuilderData({ template });
                }}
              />
            )}
            {currentStep === 3 && (
              <PersonalDataForm
                data={builderData.personalData}
                onUpdate={(personalData) => {
                  updateBuilderData({ personalData });
                }}
              />
            )}
            {currentStep === 4 && (
              <PaymentUpload
                builderData={builderData}
                onFileSelect={(file) => {
                  updateBuilderData({ paymentProof: file });
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="max-w-4xl mx-auto mt-8 flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all ${
              currentStep === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
            }`}
          >
            <ArrowLeft size={20} />
            Previous
          </button>
          <button
            onClick={nextStep}
            disabled={!canProceed() || currentStep === 4}
            className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all ${
              !canProceed() || currentStep === 4
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
