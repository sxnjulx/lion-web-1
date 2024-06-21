import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Club</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="/aboutus" className="text-base text-gray-300 hover:text-white">About</a></li>
              <li><a href="/blogs" className="text-base text-gray-300 hover:text-white">Blog</a></li>
              <li><a href="/projects" className="text-base text-gray-300 hover:text-white">Projects</a></li>
              <li><a href="/team" className="text-base text-gray-300 hover:text-white">Our Team</a></li>
              <li><a href="/contact" className="text-base text-gray-300 hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="" className="text-base text-gray-300 hover:text-white">Claim</a></li>
              <li><a href="" className="text-base text-gray-300 hover:text-white">Privacy</a></li>
              <li><a href="" className="text-base text-gray-300 hover:text-white">Terms</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Subscribe to our email Service</h3>
            <p className="mt-4 text-base text-gray-300">
              The latest news, articles, and resources, sent to your inbox.
            </p>
            <form className="mt-4 sm:flex sm:max-w-md lg:max-w-full lg:justify-end">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md text-gray-900 focus:outline-none"
              />
              <button
                type="submit"
                className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; All right reserved 2024 Lions Clud of Veyangoda Vangauard.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
