import React from 'react';

const Footer = () => {
  return (
    <section className="relative overflow-hidden bg-white py-8">
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          {/* Brand Section */}
          <div className="w-auto p-4">
            <a href="#">
              <div className="inline-flex items-center">
                {/* You can add a logo here */}
                <span className="ml-4 text-lg font-bold">DevUI</span>
              </div>
            </a>
          </div>
          
          {/* Links Section */}
          <div className="w-auto p-4">
            <ul className="flex flex-wrap items-center">
              <li className="p-4">
                <a className="font-medium text-gray-600 hover:text-gray-700" href="#">
                  Privacy Policy
                </a>
              </li>
              <li className="p-4">
                <a className="font-medium text-gray-600 hover:text-gray-700" href="#">
                  Terms of Service
                </a>
              </li>
              <li className="p-4">
                <a className="font-medium text-gray-600 hover:text-gray-700" href="#">
                  Return Policy
                </a>
              </li>
              <li className="p-4">
                <a className="font-medium text-gray-600 hover:text-gray-700" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          {/* Social Icons Section */}
          <div className="w-auto p-4">
            <div className="flex space-x-4">
              {/* Facebook */}
              <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 hover:border-gray-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12.5C22 6.47647 17.5235 2 12.5 2C7.47647 2 3 6.47647 3 12.5C3 17.2674 6.38809 21.2716 10.9868 22.1169V14.8155H8.14258V12.5H10.9868V10.0203C10.9868 7.74997 12.3045 6.5 14.2575 6.5C15.3065 6.5 16.3808 6.62329 16.8715 6.6718V9.32182H15.6816C14.5696 9.32182 14.2575 9.75854 14.2575 10.6214V12.5H16.8224L16.1534 14.8155H14.2575V22.1169C18.8651 21.2716 22 17.2674 22 12.5Z" fill="#27272A"></path>
                </svg>
              </a>
              {/* Twitter */}
              <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 hover:border-gray-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.6333 8.72413C19.9415 8.58248 20.2117 8.34871 20.3625 8.05743C20.6087 8.20823 20.754 8.50994 20.754 8.81467C20.754 11.5518 18.6543 13.6518 15.7596 13.6518C15.3745 13.6518 14.9996 13.6097 14.6427 13.5286C15.0244 13.7342 15.4167 13.8686 15.8463 13.8686C18.2376 13.8686 20.2545 11.8516 20.2545 8.81467C20.2545 8.69415 20.2453 8.5735 20.2246 8.45426C20.6454 8.28651 20.9923 8.05243 21.2442 7.76127C20.9767 8.01618 20.6375 8.24483 20.2624 8.4109C19.9334 8.56034 19.6333 8.72413 19.6333 8.72413Z" fill="#27272A"></path>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 hover:border-gray-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4.829C8.3139 4.829 5.17471 7.97179 5.17471 11.657C5.17471 15.3422 8.3139 18.485 12 18.485C15.6861 18.485 18.8253 15.3422 18.8253 11.657C18.8253 7.97179 15.6861 4.829 12 4.829ZM12 16.6284C9.98955 16.6284 8.41163 15.0504 8.41163 12.039C8.41163 9.02757 9.98955 7.4465 12 7.4465C14.0104 7.4465 15.5884 9.02757 15.5884 12.039C15.5884 15.0504 14.0104 16.6284 12 16.6284ZM16.9985 7.52355C16.7588 7.52355 16.5292 7.68643 16.5292 7.92634C16.5292 8.16625 16.7588 8.32913 16.9985 8.32913C17.2381 8.32913 17.4678 8.16625 17.4678 7.92634C17.4678 7.68643 17.2381 7.52355 16.9985 7.52355Z" fill="#27272A"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
