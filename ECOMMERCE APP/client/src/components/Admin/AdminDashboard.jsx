import React from "react";
import AdminMenu from "../layout/AdminMenu";
import { useAuth } from "../../context/authContext";
import Layout from "../layout/Layout";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="min-h-screen bg-[#f4faff] py-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-3 bg-[#053f5c] rounded-2xl shadow-lg h-fit flex flex-col">
              <div className="text-center py-5 text-[#9fe7f5] font-bold text-2xl border-b-2 border-[#429ebd] tracking-wide">
                Admin Menu
              </div>
              <div className="p-4">
                <AdminMenu />
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-9 bg-white rounded-2xl shadow-lg px-10 py-8 border-l-8 border-[#429ebd] flex flex-col justify-center">
              <h1 className="text-3xl font-bold text-[#053f5c] mb-8 flex items-center gap-2">
                <span className="inline-block w-4 h-4 rounded-full bg-[#f7ad19]"></span>
                Admin Dashboard
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[#053f5c] font-semibold">Name</label>
                  <input
                    type="text"
                    value={auth?.user?.name || ""}
                    readOnly
                    className="bg-[#9fe7f5] text-[#053f5c] px-4 py-2 rounded-lg font-medium border-none focus:ring-2 focus:ring-[#429ebd]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#053f5c] font-semibold">Email</label>
                  <input
                    type="email"
                    value={auth?.user?.email || ""}
                    readOnly
                    className="bg-[#f7ad19] text-[#053f5c] px-4 py-2 rounded-lg font-medium border-none focus:ring-2 focus:ring-[#429ebd]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#053f5c] font-semibold">Phone</label>
                  <input
                    type="text"
                    value={auth?.user?.phone || ""}
                    readOnly
                    className="bg-[#9fe7f5] text-[#053f5c] px-4 py-2 rounded-lg font-medium border-none focus:ring-2 focus:ring-[#429ebd]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#053f5c] font-semibold">
                    Address
                  </label>
                  <input
                    type="text"
                    value={auth?.user?.address || ""}
                    readOnly
                    className="bg-[#f7ad19] text-[#053f5c] px-4 py-2 rounded-lg font-medium border-none focus:ring-2 focus:ring-[#429ebd]"
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[#053f5c] font-semibold">
                    Security Answer
                  </label>
                  <input
                    type="text"
                    value={auth?.user?.answer || ""}
                    readOnly
                    className="bg-[#9fe7f5] text-[#053f5c] px-4 py-2 rounded-lg font-medium border-none focus:ring-2 focus:ring-[#429ebd]"
                  />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
