import { useState } from "react";
import {
  FaHome,
  FaShoppingCart,
  FaChartLine,
  FaMoneyBill,
  FaTrafficLight,
  FaPlug,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard2");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-gray-200 relative">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gray-900 text-white p-4 transition-all duration-300 fixed inset-y-0 left-0 z-50 flex flex-col items-center shadow-lg`}
      >
        {/* Toggle Button */}
        <button
          className="text-white p-2 bg-gray-700 rounded-md mb-4"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <FaChevronLeft size={28} />
          ) : (
            <FaChevronRight size={28} />
          )}
        </button>

        {/* Sidebar Menu */}
        <div className="flex flex-col space-y-3 w-full items-center">
          {[
            "Home",
            "Enrolled course",
            "Bookmarks",
            "Notes",
            "traffic2",
            "integrations2",
          ].map((section, index) => {
            const icons = [
              FaHome,
              FaShoppingCart,
              FaChartLine,
              FaMoneyBill,
              FaTrafficLight,
              FaPlug,
            ];
            const Icon = icons[index];
            return (
              <button
                key={section}
                className={`w-full flex items-center justify-start p-3 rounded-lg transition-all duration-300 ${
                  activeSection === section
                    ? "bg-blue-600"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => setActiveSection(section)}
              >
                <Icon size={sidebarOpen ? 28 : 32} />
                {sidebarOpen && (
                  <span className="ml-3 text-lg">
                    {section.replace("2", "")}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"} p-6`}
      >
        {/* Top Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-4 rounded-lg shadow-md flex justify-between items-center text-white">
          <h1 className="text-3xl font-semibold capitalize">
            {activeSection.replace("2", "")}
          </h1>
          <button className="px-4 py-2 bg-red-500 hover:bg-red-600 transition-all duration-200 text-white rounded-md shadow-md">
            Logout
          </button>
        </div>

        {/* Section Content */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg border border-gray-300">
          <h3 className="text-xl font-semibold">
            {activeSection.replace("2", "")}
          </h3>
          <p className="text-gray-600 mt-4">
            This is the {activeSection.replace("2", "1")} content. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Laboriosam in tenetur
            doloremque modi corrupti consequatur animi esse incidunt, libero
            eveniet eligendi asperiores, perspiciatis sit consequuntur ad
            quidem, recusandae dolorem sunt?????
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
