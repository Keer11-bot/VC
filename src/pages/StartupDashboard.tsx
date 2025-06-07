import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ref, set, get, onValue } from 'firebase/database';
import { database } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

interface StartupForm {
  startupName: string;
  domain: string;
  description: string;
  fundingNeeded: string;
  teamSize: string;
  stage: string;
  location: string;
  website: string;
}

interface Investor {
  name: string;
  email: string;
  interestedDomains: string[];
  id: string;
}

const StartupDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [potentialInvestors, setPotentialInvestors] = useState<Investor[]>([]);
  const [formData, setFormData] = useState<StartupForm>({
    startupName: '',
    domain: '',
    description: '',
    fundingNeeded: '',
    teamSize: '',
    stage: '',
    location: '',
    website: ''
  });

  useEffect(() => {
    if (currentUser) {
      const startupRef = ref(database, `startups/${currentUser.uid}`);
      get(startupRef).then((snapshot) => {
        if (snapshot.exists()) {
          setFormSubmitted(true);
          setFormData(snapshot.val());
        }
        setLoading(false);
      });

      // Listen for potential investors
      const investorsRef = ref(database, 'investors');
      onValue(investorsRef, (snapshot) => {
        const investors: Investor[] = [];
        snapshot.forEach((childSnapshot) => {
          const investor = childSnapshot.val();
          if (investor.interestedDomains?.includes(formData.domain)) {
            investors.push({
              ...investor,
              id: childSnapshot.key
            });
          }
        });
        setPotentialInvestors(investors);
      });
    }
  }, [currentUser, formData.domain]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      await set(ref(database, `startups/${currentUser.uid}`), {
        ...formData,
        userId: currentUser.uid,
        email: currentUser.email,
        createdAt: new Date().toISOString()
      });
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error saving startup data:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
            <h2 className="text-2xl font-bold mb-6">Complete Your Startup Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Startup Name</label>
                  <input
                    type="text"
                    name="startupName"
                    value={formData.startupName}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-700 border border-gray-600 text-black rounded-lg px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Domain</label>
                  <select
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-700 border text-black border-gray-600 rounded-lg px-4 py-2"
                  >
                    <option value="">Select Domain</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Education">Education</option>
                    <option value="E-commerce">E-commerce</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-dark-700 border text-black border-gray-600 rounded-lg px-4 py-2"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Funding Needed</label>
                  <input
                    type="text"
                    name="fundingNeeded"
                    value={formData.fundingNeeded}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-700 border text-black border-gray-600 rounded-lg px-4 py-2"
                    placeholder="e.g., $500,000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Team Size</label>
                  <input
                    type="number"
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-700 border text-black border-gray-600 rounded-lg px-4 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Stage</label>
                  <select
                    name="stage"
                    value={formData.stage}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-700 border text-black border-gray-600 rounded-lg px-4 py-2"
                  >
                    <option value="">Select Stage</option>
                    <option value="Idea">Idea</option>
                    <option value="MVP">MVP</option>
                    <option value="Early Traction">Early Traction</option>
                    <option value="Growth">Growth</option>
                  </select>
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
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Website (optional)</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full bg-dark-700 border text-black border-gray-600 rounded-lg px-4 py-2"
                  placeholder="https://"
                />
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
              <h2 className="text-2xl font-bold mb-6">Your Startup Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Startup Details</h3>
                  <dl className="space-y-2">
                    <dt className="text-gray-400">Name</dt>
                    <dd className="font-medium">{formData.startupName}</dd>
                    <dt className="text-gray-400">Domain</dt>
                    <dd className="font-medium">{formData.domain}</dd>
                    <dt className="text-gray-400">Stage</dt>
                    <dd className="font-medium">{formData.stage}</dd>
                  </dl>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Funding Details</h3>
                  <dl className="space-y-2">
                    <dt className="text-gray-400">Funding Needed</dt>
                    <dd className="font-medium">{formData.fundingNeeded}</dd>
                    <dt className="text-gray-400">Team Size</dt>
                    <dd className="font-medium">{formData.teamSize}</dd>
                    <dt className="text-gray-400">Location</dt>
                    <dd className="font-medium">{formData.location}</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Potential Investors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {potentialInvestors.length > 0 ? (
                  potentialInvestors.map((investor) => (
                    <motion.div
                      key={investor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-dark-700/50 rounded-lg p-6"
                    >
                      <h3 className="text-lg font-semibold mb-2">{investor.name}</h3>
                      <p className="text-gray-400 mb-4">Interested in: {investor.interestedDomains.join(', ')}</p>
                      <button
                        className="text-primary-400 hover:text-primary-300 font-medium"
                        onClick={() => window.location.href = `mailto:${investor.email}`}
                      >
                        Contact Investor
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-400 col-span-2 text-center py-8">
                    No potential investors found for your domain yet. Check back later!
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

export default StartupDashboard;