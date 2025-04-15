import { Home, Users, MapPin, MessageSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around z-10">
      <Link to="/" className={`flex flex-col items-center ${isActive('/') ? 'text-safehaven-DEFAULT' : 'text-gray-500'}`}>
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link to="/contacts" className={`flex flex-col items-center ${isActive('/contacts') ? 'text-safehaven-DEFAULT' : 'text-gray-500'}`}>
        <Users size={24} />
        <span className="text-xs mt-1">Contacts</span>
      </Link>
      <Link to="/safeplaces" className={`flex flex-col items-center ${isActive('/safeplaces') ? 'text-safehaven-DEFAULT' : 'text-gray-500'}`}>
        <MapPin size={24} />
        <span className="text-xs mt-1">Safe Places</span>
      </Link>
      <Link to="/keywords" className={`flex flex-col items-center ${isActive('/keywords') ? 'text-safehaven-DEFAULT' : 'text-gray-500'}`}>
        <MessageSquare size={24} />
        <span className="text-xs mt-1">Keywords</span>
      </Link>
    </div>
  );
};

export default Footer;
