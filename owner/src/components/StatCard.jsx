// components/StatCard.jsx
export default function StatCard({ title, value, icon, bg = "primary" }) {
  return (
    <div className={`card text-white bg-${bg} mb-3`} style={{ minWidth: "12rem" }}>
      <div className="card-body d-flex align-items-center justify-content-between">
        <div>
          <h6 className="card-title">{title}</h6>
          <h4 className="card-text">{value}</h4>
        </div>
        <div style={{ fontSize: "2rem" }}>{icon}</div>
      </div>
    </div>
  );
}
