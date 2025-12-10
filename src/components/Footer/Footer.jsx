import { Link } from "react-router";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
       
        <div>
          <h2 className="text-2xl font-bold">
            Asset<span className="text-primary">Verse</span>
          </h2>
          <p className="mt-3 text-sm opacity-80">
            A corporate asset management system designed to help companies
            track, assign, and manage workplace assets efficiently.
          </p>
        </div>

       
        <div>
          <h3 className="footer-title mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="link link-hover">
                Home
              </Link>
            </li>
            <li>
              <Link to="/register/employee" className="link link-hover">
                Join as Employee
              </Link>
            </li>
            <li>
              <Link to="/register/hr" className="link link-hover">
                Join as HR Manager
              </Link>
            </li>
            <li>
              <Link to="/login" className="link link-hover">
                Login
              </Link>
            </li>
          </ul>
        </div>

      
        <div>
          <h3 className="footer-title mb-2">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@assetverse.com</li>
            <li>Phone: +880 1234-567890</li>
            <li>Working Hours: Sun–Thu, 9AM – 6PM</li>
          </ul>
        </div>

      
        <div>
          <h3 className="footer-title mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-3">
            <a
              href="#"
              className="btn btn-circle btn-outline btn-sm"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="btn btn-circle btn-outline btn-sm"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="btn btn-circle btn-outline btn-sm"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

    
      <div className="border-t border-base-300 py-4 text-center text-sm">
        © {new Date().getFullYear()} AssetVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
