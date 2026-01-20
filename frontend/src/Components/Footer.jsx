import React from "react";
import {
  FaChevronRight,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between">

        {/* ABOUT US */}
        <div className="mb-6 md:mb-0 md:w-1/3">
          <h2 className="text-2xl font-bold mb-4">HomeEase</h2>
          <p className="text-sm">
            We are a trusted platform providing a wide range of home services
            including repairs, cleaning, and maintenance. Our aim is to deliver
            efficient and affordable solutions for everyday needs.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="mb-6 md:mb-0 md:w-1/3 md:text-center">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 flex flex-col md:items-center">
            {[
              { name: "Home", href: "/" },
              { name: "About Us", href: "#" },
              { name: "Services", href: "#" },
              { name: "Contact Us", href: "#" },
            ].map((link, index) => (
              <li key={index} className="group">
                <a
                  href={link.href}
                  className="flex items-center space-x-2 hover:text-gray-300 transition"
                >
                  <FaChevronRight className="group-hover:text-yellow-400 transform group-hover:translate-x-1 transition" />
                  <span>{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div className="md:w-1/3">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <p className="text-sm">
            Maulana Azad National Institute of Technology, Bhopal, MP, India
          </p>

          <div className="flex flex-col space-y-2 mt-3 text-sm">
            <p>
              <FaEnvelope className="inline mr-2" />
              <a
                href="mailto:info@example.com"
                className="hover:text-yellow-400"
              >
                homeease@gmail.com
              </a>
            </p>

            <p>
              <FaPhoneAlt className="inline mr-2" />
              <a
                href="tel:+1234567890"
                className="hover:text-yellow-400"
              >
                +123 456 7890
              </a>
            </p>

            <div className="flex space-x-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transform hover:scale-110 transition"
              >
                <FaFacebook size={22} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transform hover:scale-110 transition"
              >
                <FaInstagram size={22} />
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
