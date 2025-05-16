import React from 'react';
import { ArrowUp, Twitter, Facebook, Instagram, Linkedin, Github, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, href: 'https://twitter.com', name: 'Twitter' },
    { icon: <Facebook className="h-5 w-5" />, href: 'https://facebook.com', name: 'Facebook' },
    { icon: <Instagram className="h-5 w-5" />, href: 'https://instagram.com', name: 'Instagram' },
    { icon: <Linkedin className="h-5 w-5" />, href: 'https://linkedin.com', name: 'LinkedIn' },
    { icon: <Github className="h-5 w-5" />, href: 'https://github.com', name: 'GitHub' },
    { icon: <Youtube className="h-5 w-5" />, href: 'https://youtube.com', name: 'YouTube' },
  ];
  
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About', href: 'about' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Blog', href: '#' },
        { name: 'Press', href: '#' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Web Development', href: '#services' },
        { name: 'Mobile Apps', href: '#services' },
        { name: 'UI/UX Design', href: '#services' },
        { name: 'Digital Marketing', href: '#services' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#' },
        { name: 'Guides', href: '#' },
        { name: 'Case Studies', href: '#' },
        { name: 'FAQ', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Cookie Policy', href: '#' },
        { name: 'GDPR', href: '#' },
      ],
    },
  ];
  
  return (
    <footer className="bg-dark-400 relative">
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
            <img
                src="/images/Vivaran_logo-removebg-preview.png"
                alt="Vivaran Creations Logo"
                className="h-10 w-10 mr-2"
              />
              <span className="text-xl font-bold text-gradient">Vivaran Creations</span>
            </div>
            <p className="text-gray-400 mb-6">
              We create digital solutions that transform businesses and deliver exceptional user experiences.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-300 flex items-center justify-center hover:bg-primary-500 transition-all duration-300 transform hover:scale-110 hover:rotate-6"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerLinks.map((column, index) => (
              <div key={index}>
                <h4 className="text-white font-semibold mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link, idx) => (
                    <li key={idx}>
                      <a 
                        href={link.href} 
                        className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Vivaran Creations. All rights reserved.
          </p>
          
          <div className="flex items-center">
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-dark-300 text-gray-400 hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-110"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-dark-300 to-transparent"></div>
    </footer>
  );
};

export default Footer;