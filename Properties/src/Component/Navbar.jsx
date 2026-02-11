import { Building2, Home, LogOut, Menu, Phone, Star, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/home", icon: <Home size={18}/> },
    { name: "Buy", path: "/buy", icon: <Building2 size={18}/> },
    { name: "Rent", path: "/rent", icon: <Building2 size={18}/> },
    { name: "Featured", path: "/featured", icon: <Star size={18}/> },
    { name: "Contact", path: "/contact", icon: <Phone size={18}/> },
  ];

  return (
    <nav className="bg-white sticky top-0 z-[100] shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="text-2xl font-black text-blue-600 tracking-tighter">ESTATE.PRO</div>

          {/* Desktop Links */}
          <ul className="hidden lg:flex gap-8 font-semibold text-slate-600">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className={`transition-colors hover:text-blue-600 ${location.pathname === link.path ? "text-blue-600" : ""}`}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <button onClick={logout} className="flex items-center gap-2 bg-red-50 text-red-500 font-bold px-6 py-2.5 rounded-full hover:bg-red-100 transition-all">
              <LogOut size={18} /> Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-6 py-8 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="block text-lg font-bold text-slate-700">
              {link.name}
            </Link>
          ))}
          <button onClick={logout} className="w-full text-left text-lg font-bold text-red-500 pt-4 border-t border-slate-100">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}