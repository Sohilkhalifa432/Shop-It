import Layout from "../layout/Layout";
import Order from "../pages/Order";
import UserProfile from "../pages/UserProfile";
import { NavLink } from "react-router-dom";

const UserDashboard = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center py-15">
        <div className="container mx-auto">
          <div className="row justify-content-center">
            {/* Sidebar */}
            <div className="col-md-4 mb-4 md:mb-0">
              <div className="bg-white/10 rounded-lg shadow-lg p-6 text-white h-full flex flex-col items-center">
                <div className="mb-4">
                  <i className="bi bi-person-circle text-6xl text-blue-400"></i>
                </div>
                <h2 className="text-xl font-bold mb-2">Welcome, User!</h2>
                <ul className="list-group w-100">
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `list-group-item bg-transparent text-white border-0 d-flex align-items-center ${
                        isActive ? "fw-bold text-blue-400" : ""
                      }`
                    }
                  >
                    <i className="bi bi-person me-2"></i> Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard/orders"
                    className={({ isActive }) =>
                      `list-group-item bg-transparent text-white border-0 d-flex align-items-center ${
                        isActive ? "fw-bold text-blue-400" : ""
                      }`
                    }
                  >
                    <i className="bi bi-bag me-2"></i> Orders
                  </NavLink>
                  <NavLink
                    to="/dashboard/settings"
                    className={({ isActive }) =>
                      `list-group-item bg-transparent text-white border-0 d-flex align-items-center ${
                        isActive ? "fw-bold text-blue-400" : ""
                      }`
                    }
                  >
                    <i className="bi bi-gear me-2"></i> Settings
                  </NavLink>
                </ul>
              </div>
            </div>
            {/* Profile Form */}
            <div className="col-md-8">
              <div className="bg-white/10 rounded-lg shadow-lg p-6">
                <Order />
              </div>
            </div>
            {/* End Profile Form */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
