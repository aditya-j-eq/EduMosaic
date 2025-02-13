import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import {
  FaHome,
  FaShoppingCart,
  FaChartLine,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Navbar */}
      <div
        className={`${
          isExpanded ? "w-48" : "w-16"
        } bg-gray-800 text-white flex flex-col items-center transition-all duration-300 p-4`}
      >
        {/* Toggle Button */}
        <button
          className="mb-6 text-white p-2 bg-gray-700 rounded-md"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Navigation Buttons */}
        <div className="flex flex-col space-y-4 w-full">
          <NavItem icon={FaHome} label="Home" isExpanded={isExpanded} />
          <NavItem icon={FaShoppingCart} label="Shop" isExpanded={isExpanded} />
          <NavItem icon={FaChartLine} label="Reports" isExpanded={isExpanded} />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-semibold">Welcome to the Dashboard</h1>
      </div>
    </div>
  );
};

/* Navigation Item Component */
const NavItem = ({ icon: Icon, label, isExpanded }) => {
  return (
    <button className="flex items-center space-x-4 p-2 rounded-lg w-full transition-all duration-300 hover:bg-gray-700">
      <Icon size={24} />
      {isExpanded && <span className="text-lg">{label}</span>}
    </button>
  );
};

/* Prop Types Validation */
NavItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

export default Navbar;
