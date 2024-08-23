import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { RiSecurePaymentLine } from "react-icons/ri";

const Features = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white pb-14">
    <div className="relative z-10 mx-auto max-w-7xl px-4">
      <div className="mx-auto md:max-w-4xl main-content">
        <div className="mb-4 max-w-lg text-center">
          <h2 className="mt-6 text-3xl font-bold leading-tight text-black">
            How it works
          </h2>
        </div>
        <div className="mt-8 grid grid-cols-1 items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-9 w-9 text-gray-700"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d={faCreditCard}></path>
            </svg>
            <div className="ml-5">
              <h3 className="text-xl font-semibold text-black">
                Easy Payments:
              </h3>
              <p className="mt-3 text-base text-gray-600">
                Deposit funds quickly and securely with multiple payment options.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <RiSecurePaymentLine size={40} />
            <div className="ml-5">
              <h3 className="text-xl font-semibold text-black">Fast Withdrawals:</h3>
              <p className="mt-3 text-base text-gray-600">
                Enjoy seamless and swift withdrawals with just a few clicks.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-9 w-9 text-gray-700"
            >
              <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
            </svg>
            <div className="ml-5">
              <h3 className="text-xl font-semibold text-black">
                Fun Games: 
              </h3>
              <p className="mt-3 text-base text-gray-600">
                Explore a wide variety of thrilling games and maximize your chances to win big.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

export default Features;
