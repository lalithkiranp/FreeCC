import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import { FaShoppingCart, FaUtensils, FaMoneyBillWave, FaClipboardList } from "react-icons/fa";

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Dummy stats API
    fetch("http://localhost:5000/ownerStats")
      .then((res) => res.json())
      .then((data) => setStats(data));

    // Fetch orders for restaurantId = 1
    fetch("http://localhost:8080/api/orders/1") // ✅ Spring Boot backend
      .then((res) => res.json())
      .then((data) => {
        // If API returns a single object, wrap it in an array
        setRecentOrders(Array.isArray(data) ? data : [data]);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <div>
      <h2 className="mb-4">Owner Dashboard</h2>

      {/* Stats Section */}
      <div className="d-flex flex-wrap gap-3">
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<FaShoppingCart />}
          bg="primary"
        />
        <StatCard
          title="Active Orders"
          value={stats.activeOrders}
          icon={<FaClipboardList />}
          bg="warning"
        />
        <StatCard
          title="Revenue"
          value={stats.revenue}
          icon={<FaMoneyBillWave />}
          bg="success"
        />
        <StatCard
          title="Menu Items"
          value={stats.menuItems}
          icon={<FaUtensils />}
          bg="info"
        />
      </div>

      {/* Orders Table */}
      <div className="card mt-4">
        <div className="card-header">Recent Orders</div>
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No orders found.
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer?.name || "Unknown"}</td>
                    <td>
                      {order.items
                        ? order.items.map((item) => item.name).join(", ")
                        : "—"}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          order.status === "Preparing"
                            ? "bg-warning"
                            : order.status === "Delivered"
                            ? "bg-success"
                            : "bg-info"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>{order.total}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
