import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import CartStep from "./CartStep";
import LoginStep from "./LoginStep";
import AddressStep from "./AddressStep";
import PaymentStep from "./PaymentStep";
import OrderSummary from "./OrderSummary";
import { AiOutlineCheck } from "react-icons/ai";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const { user } = useAuth();
  const location = useLocation();

  const buyNowProduct = location.state?.buyNow
    ? location.state.product
    : null;

 const [step, setStep] = useState(() => {
    if (buyNowProduct) return 2;
    const saved = localStorage.getItem("checkoutStep");
    return saved ? Number(saved) : 0;
  });

  const [address, setAddress] = useState(() => {
     if (buyNowProduct) return null;
    const savedAddress = localStorage.getItem("selectedAddress");
    return savedAddress ? JSON.parse(savedAddress) : null;
  });

  useEffect(() => {
    localStorage.setItem("checkoutStep", step);
  }, [step]);

  useEffect(()=>{
          window.scrollTo({ top: 0, behavior: 'smooth' }) 

  },[step])

  useEffect(() => {
    if (address) {
      localStorage.setItem("selectedAddress", JSON.stringify(address));
    }
  }, [address]);


  useEffect(() => {
    if (step === 1 && user) {
      setStep(2);
    }
  }, [step, user]);


  const goToStep = (targetStep) => {
    if (targetStep === 3 && !address) return; 
    if (targetStep === 2 && !user) return;    
    if (targetStep === 1 && user) return;    
    setStep(targetStep);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
     
      <div className="flex items-center md:gap-4 mb-8">
        {!buyNowProduct && (
          <>
            <Step label="Cart" stepIndex={0} currentStep={step} onClick={goToStep} />
            <Divider completed={step > 0} />
          </>
        )}

        {!user && (
          <>
            <Step label="Login" stepIndex={1} currentStep={step} onClick={goToStep} />
            <Divider completed={step > 1} />
          </>
        )}

        <Step label="Address" stepIndex={2} currentStep={step} onClick={goToStep} />
        <Divider completed={step > 2} />
        <Step label="Payment" stepIndex={3} currentStep={step} onClick={goToStep} />
      </div>

      <div className="grid md:grid-cols-[2fr_1fr] gap-6">
   
        {!buyNowProduct && step === 0 && (
          <CartStep onNext={() => setStep(user ? 2 : 1)} />
        )}

      
        {step === 1 && !user && <LoginStep onNext={() => setStep(2)} />}

     
        {step === 2 && (
          <AddressStep  selectedAddress={address}
            onNext={(data) => {
              setAddress(data);
              setStep(3);
            }}
          />
        )}

       
        {step === 3 && address && (
          <PaymentStep address={address} buyNowProduct={buyNowProduct} onEditAddress={()=>setStep(2)} />
        )}

       
         {(buyNowProduct || user) && (
          <OrderSummary buyNowProduct={buyNowProduct} />
        )}
      </div>
    </div>
  );
};

export default Checkout;

const Step = ({ label, stepIndex, currentStep, onClick }) => {
  const completed = currentStep > stepIndex;
  const active = currentStep === stepIndex;

  return (
    <div
      className={`flex items-center gap-2 cursor-pointer select-none
        ${completed ? "cursor-pointer" : "cursor-default"}
      `}
      onClick={completed ? () => onClick(stepIndex) : undefined}
    >
      <div
        className={`h-7 w-7 flex items-center justify-center rounded-full border transition-all
        ${completed
            ? "bg-green-500 border-green-500 text-white"
            : active
              ? "border-orange-500 text-orange-500"
              : "border-gray-300 text-gray-400"
          }`}
      >
        {completed ? <AiOutlineCheck /> : null}
      </div>

      <span
        className={`font-medium transition-colors
          ${active ? "text-black" : completed ? "text-black" : "text-gray-400"}
        `}
      >
        {label}
      </span>
    </div>
  );
};

const Divider = ({ completed }) => (
  <div className="flex-1 h-[3px] bg-gray-300 rounded overflow-hidden">
    <div
      className={`h-full transition-all duration-500 ease-in-out
        ${completed ? "bg-green-500 w-full" : "w-0"}
      `}
    />
  </div>
);
