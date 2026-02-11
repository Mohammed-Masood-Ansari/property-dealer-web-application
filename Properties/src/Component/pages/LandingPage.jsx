import { AnimatePresence, motion } from 'framer-motion';
import {
  Bath,
  Bed,
  Mail,
  MapPin,
  Maximize,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Coastal from '../../assets/Images/Coastal.png';
import Contemporary from '../../assets/Images/Contemporary.png';
import Mountain from '../../assets/Images/Mountain.png';
import Rustic from '../../assets/Images/Rustic.png';
import Ultra from '../../assets/Images/Ultra.png';
import Warm from '../../assets/Images/Warm.png';

// Import your login components
import Login from '../Auth/Login';

const heroImages = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1974&h=700',Coastal,Contemporary,Mountain
];

const featuredProperties = [
  { id: 1, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600', price: '$1,250,000', title: 'Skyline Modern Villa', location: 'Beverly Hills, CA', beds: 4, baths: 3, sqft: 3200 },
  { id: 2, img: Coastal, price: '$899,000', title: 'Garden Oasis Home', location: 'Santa Monica, CA', beds: 3, baths: 2, sqft: 2800 },
  { id: 3, img: Contemporary, price: '$1,500,000', title: 'Coastal Retreat', location: 'Malibu, CA', beds: 5, baths: 4, sqft: 4500 },
  { id: 4, img:  Mountain, price: '$720,000', title: 'Urban Loft Penthouse', location: 'Downtown LA, CA', beds: 2, baths: 2, sqft: 1800 },
  { id: 5, img:  Warm, price: '$1,100,000', title: 'Suburban Family Home', location: 'Orange County, CA', beds: 4, baths: 2, sqft: 3000 },
  { id: 6, img:  Ultra, price: '$950,000', title: 'Lakefront Cabin', location: 'Lake Tahoe, CA', beds: 3, baths: 3, sqft: 2500 },
  { id: 7, img:  Rustic, price: '$950,00', title: 'Lakefront', location: 'Lake, CA', beds: 2, baths: 1, sqft: 1500 },
];

const propertyTypes = [
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'condo', label: 'Condo' },
  { value: 'villa', label: 'Villa' },
];

const bedOptions = [
  { value: '1', label: '1+ Bed' },
  { value: '2', label: '2+ Beds' },
  { value: '3', label: '3+ Beds' },
  { value: '4', label: '4+ Beds' },
];

const priceOptions = [
  { value: '0-250000', label: '$0 - $250K' },
  { value: '250000-500000', label: '$250K - $500K' },
  { value: '500000-750000', label: '$500K - $750K' },
  { value: '750000-1000000', label: '$750K - $1M' },
  { value: '1000000-max', label: '$1M+' },
];

const selectStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: '0.75rem',
    borderColor: '#e2e8f0',
    boxShadow: 'none',
    '&:hover': { borderColor: '#93c5fd' },
    minHeight: '52px',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
  }),
  placeholder: (provided) => ({ ...provided, color: '#94a3b8' }),
  singleValue: (provided) => ({ ...provided, color: '#1e293b' }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#eff6ff' : 'white',
    color: '#1e293b',
  }),
  menu: (provided) => ({ ...provided, borderRadius: '0.75rem', zIndex: 99 }),
};

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  // Search state
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState(null);
  const [beds, setBeds] = useState(null);
  const [priceRange, setPriceRange] = useState(null);

  useEffect(() => {
    // const token = localStorage.getItem('accessToken');
    // if (token) setIsLoggedIn(true);
    
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('accessToken'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    toast.success('Logged out successfully.');
    navigate('/');
  };

  // Restrict feature logic
  const handleRestrictedAction = (e) => {
    if (e) e.preventDefault();
    if (!isLoggedIn) {
      toast.error("Please login to perform this task", {
        duration: 3000,
        position: 'top-center',
      });
      setShowLoginModal(true);
      return false;
    }
    return true;
  };

  const handleSearch = () => {
    if (handleRestrictedAction()) {
      toast.success(`Searching ${location} for ${propertyType?.label}...`);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ESTATE.PRO
          </Link>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="px-6 py-2.5 rounded-full border border-slate-300 font-semibold hover:bg-slate-50 transition">
                Logout
              </button>
            ) : (
              <button onClick={() => setShowLoginModal(true)} className="px-6 py-2.5 rounded-full border border-slate-300 font-semibold hover:bg-slate-50 transition">
                Sign In
              </button>
            )}
            <button onClick={handleRestrictedAction} className="hidden md:block px-6 py-2.5 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition">
              List Property
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Carousel */}
      <section className="relative pt-20 h-[650px] lg:h-[750px] overflow-hidden">
        <Carousel
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
          transitionTime={800}
          className="absolute inset-0"
        >
          {heroImages.map((img, index) => (
            <div key={index} className="h-full">
              <img src={img} className="w-full h-full object-cover brightness-[0.5]" alt={`Luxury Home ${index + 1}`} />
            </div>
          ))}
        </Carousel>

        <div className="absolute inset-0 flex items-center justify-center p-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center text-blue-300 max-w-4xl">
            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-extrabold leading-[1.1] ">
              Discover Your <span className="text-blue-400">Dream</span> Home
            </motion.h1>
            
            {/* Main Search Bar */}
            {/* <motion.div variants={fadeInUp} className="mt-10 p-2 bg-white rounded-2xl shadow-2xl flex flex-col md:row gap-2 max-w-3xl mx-auto">
              <div className="flex-1 flex items-center px-4 py-3 gap-3 border-r border-slate-100">
                <MapPin className="text-blue-600" size={20} />
                <input
                  type="text"
                  placeholder="Enter Location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full outline-none text-slate-800"
                />
              </div>
              <div className="w-full md:w-48">
                <Select
                  options={bedOptions}
                  placeholder="Features"
                  styles={selectStyles}
                  onChange={setBeds}
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
              >
                <Search size={20} /> Search
              </button>
            </motion.div> */}
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Featured Properties</h2>
          <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <motion.div
                key={property.id}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                onClick={handleRestrictedAction}
                className="group relative rounded-3xl overflow-hidden border border-slate-100 bg-white hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={property.img} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt={property.title} />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-sm font-bold text-blue-600">{property.price}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{property.title}</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-4"><MapPin size={16} /> {property.location}</div>
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-50 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1"><Bed size={14} /> {property.beds} BD</span>
                    <span className="flex items-center gap-1"><Bath size={14} /> {property.baths} BA</span>
                    <span className="flex items-center gap-1"><Maximize size={14} /> {property.sqft} SQFT</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Poster */}
      <section className="py-24 px-6 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-6">Ready to find your next home?</h2>
          <p className="text-xl mb-10 opacity-90">Unlock exclusive deals and expert support by signing in today.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleRestrictedAction}
            className="bg-white text-blue-600 font-bold px-12 py-4 rounded-full text-lg shadow-xl"
          >
            {isLoggedIn ? "Contact an Agent" : "Sign in to contact"}
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div><h4 className="text-xl font-bold mb-4">ESTATE.PRO</h4><p className="text-slate-400">Your trusted real estate partner.</p></div>
          <div><h4 className="font-bold mb-4">Quick Links</h4><ul className="text-slate-400 space-y-2"><li>Buy</li><li>Sell</li></ul></div>
          <div><h4 className="font-bold mb-4">Support</h4><ul className="text-slate-400 space-y-2"><li>FAQs</li><li>Privacy</li></ul></div>
          <div><h4 className="font-bold mb-4">Contact</h4><ul className="text-slate-400 space-y-2"><li className="flex items-center gap-2"><Mail size={16}/> info@estate.pro</li></ul></div>
        </div>
      </footer>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex justify-center items-center z-[100]" onClick={() => setShowLoginModal(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} className="relative bg-white rounded-3xl shadow-3xl max-w-md w-full overflow-hidden">
              <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-[110]"><X size={24} /></button>
              <Login />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;