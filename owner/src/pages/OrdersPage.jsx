import { useState, useEffect } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  // Fetch orders (for restaurant/owner)
  useEffect(() => {
    fetch("http://localhost:8080/api/orders") // <-- needs to return list
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Error fetching orders:", err));
  }, []);

  // Update order status
  const updateStatus = (orderId, newStatus) => {
    fetch(`http://localhost:8080/api/orders/${orderId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }) // backend expects status only
    })
      .then(res => res.json())
      .then(data => {
        setOrders(orders.map(o => (o.id === orderId ? data : o)));
      })
      .catch(err => console.error("Error updating order status:", err));
  };

  const statusFlow = ["Preparing", "Out for Delivery", "Delivered"];

  return (
    <div>
      <h2 className="mb-4">Orders</h2>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Restaurant</th>
              <th>Status</th>
              <th>Order Date</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                {/* show customer name (assuming backend sends nested user object) */}
                <td>{order.customer?.name || "N/A"}</td>
                {/* show restaurant name */}
                <td>{order.restaurant?.name || "N/A"}</td>
                <td>
                  <span
                    className={`badge ${
                      order.status === "Preparing"
                        ? "bg-warning"
                        : order.status === "Out for Delivery"
                        ? "bg-info"
                        : "bg-success"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>₹{order.totalAmount}</td>
                <td>
                  {statusFlow.map(
                    (status) =>
                      status !== order.status && (
                        <button
                          key={status}
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => updateStatus(order.id, status)}
                        >
                          Mark as {status}
                        </button>
                      )
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
