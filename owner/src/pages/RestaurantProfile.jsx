import { useState, useEffect } from "react";
import axios from "axios";

export default function RestaurantProfile({ restaurantId }) {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Fetch restaurant by ID
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/restaurants/${restaurantId}`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, [restaurantId]);

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:8080/api/restaurants/${restaurantId}`, profile)
      .then(() => {
        setEditMode(false);
        alert("Profile updated!");
      })
      .catch((err) => console.error("Error updating profile:", err));
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="mb-4">Restaurant Profile</h2>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>Restaurant Details</span>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Restaurant Name</label>
              <input
                type="text"
                className="form-control"
                value={profile.name || ""}
                disabled={!editMode}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                value={profile.phone || ""}
                disabled={!editMode}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            <div className="col-md-12">
              <label className="form-label">Address</label>
              <textarea
                className="form-control"
                value={profile.address || ""}
                disabled={!editMode}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>
          </div>
        </div>

        {editMode && (
          <div className="card-footer text-end">
            <button className="btn btn-success" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
