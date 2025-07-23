import { Link, useLocation } from "react-router-dom";

const AdminMenu = () => {
  const location = useLocation();

  // Helper to highlight the active link
  const linkClass = (path) =>
    `text-lg py-2 px-4 rounded 
    ${
      location.pathname === path
        ? "bg-[#429ebd] text-white font-bold"
        : "text-white"
    }
    no-underline`;

  return (
    <div className="flex flex-col p-4 text-center space-y-3">
      <Link
        to="/admin/admin-category"
        className={linkClass("/admin/admin-category")}
      >
        Categorie
      </Link>
      <Link
        to="/admin/create-product"
        className={linkClass("/admin/create-product")}
      >
        Create Product
      </Link>
      <Link to="/admin/user" className={linkClass("/admin/user")}>
        User
      </Link>
      <Link to="/admin/allorders" className={linkClass("/admin/allorders")}>
        Orders
      </Link>
    </div>
  );
};

export default AdminMenu;
