import { Outlet, Link } from "react-router-dom";

export default function OwnerLayout() {
  return (
    <div className="d-flex">
      
      <div className="bg-dark text-white p-3" style={{ minHeight: "100vh", width: "220px" }}>
        <h4>Owner Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item"><Link className="nav-link text-white" to="/owner">Dashboard</Link></li>
          <li className="nav-item"><Link className="nav-link text-white" to="/owner/orders">Orders</Link></li>
          <li className="nav-item"><Link className="nav-link text-white" to="/owner/menu">Manage Menu</Link></li>
          <li className="nav-item"><Link className="nav-link text-white" to="/owner/profile">Profile</Link></li>
          <li className="nav-item"><Link className="nav-link text-white" to="/owner/reviews">Reviews</Link></li>
        </ul>
      </div>


      <div className="p-4 flex-grow-1">
        <Outlet />
      </div>
    </div>
  );
}
