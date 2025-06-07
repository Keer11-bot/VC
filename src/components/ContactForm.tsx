import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin } from 'lucide-react';
import { database } from '../firebase';
import { ref, push, set } from 'firebase/database';

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create a reference to the 'contacts' node in your database
      const contactsRef = ref(database, 'contacts');
      
      // Create a new contact entry with a unique key
      const newContactRef = push(contactsRef);
      
      // Prepare the data to be saved
      const contactData = {
        ...formState,
        timestamp: new Date().toISOString(),
        status: 'new'
      };
      
      // Save the data to Firebase
      await set(newContactRef, contactData);
      
      // Reset form state
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      alert('Thank you for your message! We will get back to you soon.');
    } catch (error) {
      console.error('Error saving contact form:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5 text-primary-400" />,
      title: 'Email Us',
      details: 'Adminoffice@vivarancreations.com',
      link: 'mailto:Adminoffice@vivarancreations.com',
    },
    {
      icon: <Phone className="h-5 w-5 text-primary-400" />,
      title: 'Call Us',
      details: '+91 80741 71058',
      link: 'tel:+918074171058',
    },
    {
      icon: <MapPin className="h-5 w-5 text-primary-400" />,
      title: 'Visit Us',
      details: '123 Innovation Way, HiTech City, TC 12345',
      link: 'https://maps.google.com',
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-dark-400">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center mb-4">Get in Touch</h1>
          <p className="text-gray-400 text-center mb-12">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="glass rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="p-2 bg-primary-500/10 rounded-lg mr-4">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-medium">{item.title}</h4>
                        <a 
                          href={item.link} 
                          className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.details}
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-xl p-6">
                <h4 className="text-lg font-medium mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {['linkedin'].map((platform, _index) => (
                    <a 
                      key={platform}
                      href="https://www.bing.com/ck/a?!&&p=f7d4505eab487bcf20ddb74fbc19a010292913d148137f01d4a3fa7a04028f9bJmltdHM9MTc0OTI1NDQwMA&ptn=3&ver=2&hsh=4&fclid=09f1fc4d-1497-6d8d-0718-eed4153a6cb4&psq=vivarancreations+linkedin&u=a1aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2NvbXBhbnkvdml2YXJhbi1jcmVhdGlvbnMv&ntb=1"
                      className="w-10 h-10 rounded-full bg-dark-300 flex items-center justify-center hover:bg-primary-500 transition-colors duration-300"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">{platform}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="glass rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white disabled:opacity-50"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white disabled:opacity-50"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white disabled:opacity-50"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Project Request">Project Request</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Support">Support</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    rows={5}
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white resize-none disabled:opacity-50"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${isSubmitting ? 'animate-pulse' : ''}`} />
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Background elements */}
      <div className="absolute top-1/3 right-0 w-64 h-64 rounded-full bg-primary-500/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full bg-accent-500/5 blur-3xl -z-10"></div>
    </div>
  );
};

export default ContactForm;