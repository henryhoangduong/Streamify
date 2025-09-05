import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
export const Layout = ({ children, showSidear = false }) => {
  return (
    <div className="min-h-screen">
      <div className="flex">
        {showSidear && <Sidebar />}
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="">{children}</main>
        </div>
      </div>
    </div>
  );
};
