import React from 'react';

export function Review() {
  return (
    <section className="relative w-full overflow-hidden bg-white pb-14">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mx-auto md:max-w-4xl">
        <div className="mb-4 max-w-lg text-center ">
          <h2 className="mt-6 text-3xl font-bold leading-tight text-black">
         Review
          </h2>
        </div>
          <div className="flex flex-wrap -m-5">
            {/* Standard Plan */}
            <div className="w-full p-5 md:w-1/2">
              <div className="rounded-md border bg-white bg-opacity-90">
                <div className="border-b">
                  <div className="px-9 py-7">
                    <h3 className="mb-3 text-xl font-bold leading-snug text-gray-900">
                      Standard
                    </h3>
                    <p className="font-medium leading-relaxed text-gray-500">
                      Lorem ipsum dolor sit amet, consect etur adipiscing maror.
                    </p>
                  </div>
                </div>
                <div className="px-9 pb-9 pt-8">
                  <p className="mb-6 font-medium leading-relaxed text-gray-600">
                    {/* Features included: */}
                  </p>
                  {/* <!-- Add features here if needed --> */}
                </div>
              </div>
            </div>
            {/* Pro Plan */}
            <div className="w-full p-5 md:w-1/2">
              <div className="rounded-md border bg-white bg-opacity-90">
                <div className="border-b">
                  <div className="px-9 py-7">
                    <h3 className="mb-3 text-xl font-bold leading-snug text-gray-900">
                      Pro
                    </h3>
                    <p className="font-medium leading-relaxed text-gray-500">
                      Lorem ipsum dolor sit amet, consect etur adipiscing maror.
                    </p>
                  </div>
                </div>
                <div className="px-9 pb-9 pt-8 backdrop:blur-md">
                  <p className="mb-6 font-medium leading-relaxed text-gray-600">
                    {/* Features included: */}
                  </p>
                  {/* <!-- Add features here if needed --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
