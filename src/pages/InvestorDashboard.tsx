import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ref, set, get, onValue } from 'firebase/database';
import { database } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

interface InvestorForm {
  name: string;
  interestedDomains: string[];
  investmentRange: string;
  investmentStage: string[];
  location: string;
  about: string;
}

interface Startup {
  startupName: string;
  domain: string;
  description: string;
  fundingNeeded: string;
  stage: string;
  location: string;
  email: string;
  id: string;
}

const InvestorDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [availableStartups, setAvailableStartups] = useState<Startup[]>([]);
  const [formData, setFormData] = useState<InvestorForm>({
    name: '',
    interestedDomains: [],
    investmentRange: '',
    investmentStage: [],
    location: '',
    about: ''
  });

  useEffect(() => {
    if (currentUser) {
      const investorRef = ref(database, `investors/${currentUser.uid}`);
      get(investorRef).then((snapshot) => {
        if (snapshot.exists()) {
          setFormSubmitted(true);
          setFormData(snapshot.val());
        }
        setLoading(false);
      });

      // Listen for available startups
      const startupsRef = ref(database, 'startups');
      onValue(startupsRef, (snapshot) => {
        const startups: Startup[] = [];
        snapshot.forEach((childSnapshot) => {
          const startup = childSnapshot.val();
          if (formData.interestedDomains.includes(startup.domain)) {
            startups.push({
              ...startup,
              id: childSnapshot.key
            });
          }
        });
        setAvailableStartups(startups);
      });
    }
  }, [currentUser, formData.interestedDomains]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      await set(ref(database, `investors/${currentUser.uid}`), {
        ...formData,
        userId: currentUser.uid,
        email: currentUser.email,
        createdAt: new Date().toISOString()
      });
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error saving investor data:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'interestedDomains' || name === 'investmentStage') {
      const options = e.target as HTMLSelectElement;
      const values = Array.from(options.selectedOptions, option => option.value);
      setFormData(prev => ({ ...prev, [name]: values }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>;
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {!formSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Complete Your Investor Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-700 border text-black border-gray-600 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Interested Domains</label>
                <select
                  name="interestedDomains"
                  value={formData.interestedDomains}
                  onChange={handleChange}
                  required
                  multiple
                  className="w-full bg-dark-700 border text-black border-gray-600 rounded-lg px-4 py-2"
                >
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
                  <option value="E-commerce">E-commerce</option>
                </select>
                <p className="text-sm text-gray-400 mt-1">Hold Ctrl/Cmd to select multiple domains</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Investment Range</label>
                <select
                  name="investmentRange"
                  value={formData.investmentRange}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-700 border text-black border-gray-600 rounded-lg px-4 py-2"
                >
                  <option value="">Select Range</option>
                  <option value="0-50k">$0 - $50,000</option>
                  <option value="50k-200k">$50,000 - $200,000</option>
                  <option value="200k-1m">$200,000 - $1,000,000</option>
                  <option value="1m+">$1,000,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Preferred Investment Stage</label>
                <select
                  name="investmentStage"
                  value={formData.investmentStage}
                  onChange={handleChange}
                  required
                  multiple
                  className="w-full bg-dark-700 border text-black border-gray-600 rounded-lg px-4 py-2"
                >
                  <option value="Idea">Idea</option>
                  <option value="MVP">MVP</option>
                  <option value="Early Traction">Early Traction</option>
                  <option value="Growth">Growth</option>
                </select>
                <p className="text-sm text-gray-400 mt-1">Hold Ctrl/Cmd to select multiple stages</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-700 border text-black border-gray-600 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">About</label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-dark-700 border text-black border-gray-600 rounded-lg px-4 py-2"
                  placeholder="Tell us about your investment experience and interests..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
              >
                Submit Profile
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Your Investor Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
                  <dl className="space-y-2">
                    <dt className="text-gray-400">Name</dt>
                    <dd className="font-medium">{formData.name}</dd>
                    <dt className="text-gray-400">Location</dt>
                    <dd className="font-medium">{formData.location}</dd>
                  </dl>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Investment Preferences</h3>
                  <dl className="space-y-2">
                    <dt className="text-gray-400">Interested Domains</dt>
                    <dd className="font-medium">{formData.interestedDomains.join(', ')}</dd>
                    <dt className="text-gray-400">Investment Range</dt>
                    <dd className="font-medium">{formData.investmentRange}</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Available Startups</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {availableStartups.length > 0 ? (
                  availableStartups.map((startup) => (
                    <motion.div
                      key={startup.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-dark-700/50 rounded-lg p-6"
                    >
                      <h3 className="text-lg font-semibold mb-2">{startup.startupName}</h3>
                      <p className="text-gray-400 mb-2">{startup.description}</p>
                      <dl className="grid grid-cols-2 gap-2 mb-4">
                        <div>
                          <dt className="text-gray-400 text-sm">Domain</dt>
                          <dd className="font-medium">{startup.domain}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-400 text-sm">Stage</dt>
                          <dd className="font-medium">{startup.stage}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-400 text-sm">Funding Needed</dt>
                          <dd className="font-medium">{startup.fundingNeeded}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-400 text-sm">Location</dt>
                          <dd className="font-medium">{startup.location}</dd>
                        </div>
                      </dl>
                      <button
                        className="text-primary-400 hover:text-primary-300 font-medium"
                        onClick={() => window.location.href = `mailto:${startup.email}`}
                      >
                        Contact Startup
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-400 col-span-2 text-center py-8">
                    No startups found matching your interests yet. Check back later!
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InvestorDashboard;