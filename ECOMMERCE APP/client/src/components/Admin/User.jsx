import React from "react";
import { useAuth } from "../../context/authContext";
import AdminMenu from "../layout/AdminMenu";
import Layout from "../layout/Layout";

const User = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="min-h-screen bg-[#f4faff] py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Sidebar */}
            <aside className="md:col-span-3 bg-[#053f5c] rounded-2xl shadow-lg h-fit flex flex-col">
              <div className="text-center py-5 text-[#9fe7f5] font-bold text-2xl border-b-2 border-[#429ebd] tracking-wide">
                Admin Menu
              </div>
              <div className="p-4">
                <AdminMenu />
              </div>
            </aside>
            {/* Main Content */}
            <main className="md:col-span-9 bg-white rounded-2xl shadow-lg px-8 py-8 border-l-8 border-[#429ebd] flex flex-col justify-center">
              <h1 className="text-2xl font-bold text-[#053f5c] mb-6 flex items-center gap-2">
                <span className="inline-block w-4 h-4 rounded-full bg-[#f7ad19]"></span>
                User Profile
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-[#053f5c]">Name</span>
                  <span className="bg-[#9fe7f5] text-[#053f5c] px-4 py-2 rounded font-medium">
                    {auth?.user?.name || (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-[#053f5c]">Email</span>
                  <span className="bg-[#f7ad19] text-[#053f5c] px-4 py-2 rounded font-medium">
                    {auth?.user?.email || (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-[#053f5c]">Phone</span>
                  <span className="bg-[#9fe7f5] text-[#053f5c] px-4 py-2 rounded font-medium">
                    {auth?.user?.phone || (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-[#053f5c]">Address</span>
                  <span className="bg-[#f7ad19] text-[#053f5c] px-4 py-2 rounded font-medium">
                    {auth?.user?.address || (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </span>
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <span className="font-semibold text-[#053f5c]">
                    Security Answer
                  </span>
                  <span className="bg-[#9fe7f5] text-[#053f5c] px-4 py-2 rounded font-medium">
                    {auth?.user?.answer || (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </span>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default User;
