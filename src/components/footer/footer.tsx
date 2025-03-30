// src/components/footer.tsx
const Footer = () => {
  return (
    <footer className="bg-black-100 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
          {/* Support Column */}
          <div>
            <h3 className="text-base font-semibold text-black-900 mb-4 pb-4">Support</h3>
            <ul className="flex flex-col gap-y-4">
              {['Help Center', 'AirCover', 'Anti-discrimination', 'Disability support', 'Cancellation options', 'Report neighborhood concern'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-base text-black-600 gap-y-16 hover:text-black-900 hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hosting Column */}
          <div>
            <h3 className="text-base font-semibold text-black-900 mb-4 pb-4">Hosting</h3>
            <ul className="flex flex-col gap-y-4">
              {['Airbnb your home', 'AirCover for Hosts', 'Hosting resources', 'Community forum', 'Hosting responsibly', 'Airbnb-friendly apartments', 'Join a free Hosting class', 'Find a co-host'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-base text-black-600 hover:text-black-900 hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Airbnb Column */}
          <div>
            <h3 className="text-base font-semibold text-black-900 mb-4 pb-4">Airbnb</h3>
            <ul className="flex flex-col gap-y-4">
              {['Newsroom', 'New features', 'Careers', 'Investors', 'Gift cards', 'Airbnb.org emergency stays'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-base text-black-600 hover:text-black-900 hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4 md:mb-0">
              <span className="text-base text-black-600">© 2025 Airbnb, Inc.</span>
              <span className="text-base text-black-600">·</span>
              {['Terms', 'Sitemap', 'Privacy', 'Your Privacy Choices'].map((item, index) => (
                <>
                  <a key={item} href="#" className="text-base text-black-600 hover:text-black-900 hover:underline cursor-pointer">
                    {item}
                  </a>
                  {index < 3 && <span className="text-base text-black-600">·</span>}
                </>
              ))}
            </div>
            <div className="flex items-center gap-x-8">
  {/* Language Section */}
  <div className="flex items-center">
   
    <div className="flex  gap-x-2 items-center p-1  hover:border-gray-300 hover:bg-gray-100 hover:rounded">
      <span className="text-gray-900">🌐</span>
      <span className="text-base text-gray-900 font-semibold cursor-pointer">
        English (US)
      </span>
    </div>
  </div>

  {/* Currency Section */}
  <div className="flex items-center">
   
    <div className="flex gap-x-2 items-center p-1  hover:border-gray-300 hover:bg-gray-100 hover:rounded">
    <span className="text-gray-900 font-semibold cursor-pointer">đ</span>
      <span className="text-base text-gray-900 font-semibold cursor-pointer">
        VND
      </span>
    </div>
  </div>

  {/* Social Media Icons */}
  <div className="flex gap-x-2">
    <a href="#" className="text-gray-900 ">
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
      </svg>
    </a>
    <a href="#" className="text-gray-900 ">
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    </a>
    <a href="#" className="text-gray-900">
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.332.014 7.052.072c-4.95.232-6.683 2.027-6.915 6.915C.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.232 4.888 2.027 6.683 6.915 6.915C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.888-.232 6.683-2.027 6.915-6.915.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.232-4.888-2.027-6.683-6.915-6.915C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    </a>
  </div>
</div>
  
            </div>
            
            
          </div>
          </div>
        
      
    </footer>
  );
};

export default Footer;