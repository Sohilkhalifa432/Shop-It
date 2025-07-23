import Layout from "../layout/Layout";
import UserProfile from "../pages/UserProfile";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const UserDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-[#053f5c] via-[#429ebd] to-[#9fe7f5] flex items-center justify-center py-16">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {/* Sidebar */}
            <aside className="md:w-1/4 w-full bg-[#053f5c] rounded-2xl shadow-lg flex flex-col items-center py-8 px-4">
              <div className="mb-6">
                <i className="bi bi-person-circle text-6xl text-[#f7ad19]"></i>
              </div>
              <h2 className="text-xl font-bold mb-4 text-white">
                Welcome, {auth?.user?.name || "User"}!
              </h2>
              <nav className="flex flex-col w-full space-y-2">
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    `w-full px-4 py-2 rounded-lg text-left font-semibold no-underline ${
                      isActive
                        ? "bg-[#f7ad19] text-[#053f5c]"
                        : "text-white hover:bg-[#429ebd] hover:text-[#f7ad19]"
                    }`
                  }
                >
                  <i className="bi bi-person mr-2"></i> Update Profile
                </NavLink>
                <NavLink
                  to="/dashboard/orders"
                  className={({ isActive }) =>
                    `w-full px-4 py-2 rounded-lg text-left font-semibold no-underline ${
                      isActive
                        ? "bg-[#f7ad19] text-[#053f5c]"
                        : "text-white hover:bg-[#429ebd] hover:text-[#f7ad19]"
                    }`
                  }
                >
                  <i className="bi bi-bag mr-2"></i> Orders
                </NavLink>
              </nav>
            </aside>
            {/* Profile Form */}
            <main className="md:w-3/4 w-full bg-white/90 rounded-2xl shadow-lg p-8">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 text-[#053f5c] font-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    value={auth?.user?.name || ""}
                    readOnly
                    className="w-full px-4 py-2 rounded-lg border-2 border-[#9fe7f5] bg-white text-[#053f5c] focus:border-[#429ebd] outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-[#053f5c] font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    value={auth?.user?.email || ""}
                    readOnly
                    className="w-full px-4 py-2 rounded-lg border-2 border-[#f7ad19] bg-white text-[#053f5c] focus:border-[#429ebd] outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-[#053f5c] font-semibold">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={auth?.user?.phone || ""}
                    readOnly
                    className="w-full px-4 py-2 rounded-lg border-2 border-[#9fe7f5] bg-white text-[#053f5c] focus:border-[#429ebd] outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-[#053f5c] font-semibold">
                    Address
                  </label>
                  <input
                    type="text"
                    value={auth?.user?.address || ""}
                    readOnly
                    className="w-full px-4 py-2 rounded-lg border-2 border-[#f7ad19] bg-white text-[#053f5c] focus:border-[#429ebd] outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-1 text-[#053f5c] font-semibold">
                    Security Answer
                  </label>
                  <input
                    type="text"
                    value={auth?.user?.answer || ""}
                    readOnly
                    className="w-full px-4 py-2 rounded-lg border-2 border-[#9fe7f5] bg-white text-[#053f5c] focus:border-[#429ebd] outline-none"
                  />
                </div>
              </form>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
