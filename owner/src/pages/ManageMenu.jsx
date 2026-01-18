import { useState, useEffect } from "react";

export default function ManageMenu() {
  const [menu, setMenu] = useState([]);
  const [newItem, setNewItem] = useState({
    itemName: "",
    description: "",
    price: ""
  });

  // Hardcode or pass restaurantId as prop/context
  const restaurantId = 1;

  // GET menu for restaurant
  useEffect(() => {
    fetch(`http://localhost:8080/api/menus/${restaurantId}`)
      .then(res => res.json())
      .then(data => setMenu(data))
      .catch(err => console.error("Error fetching menu:", err));
  }, [restaurantId]);

  // POST new menu item
  const handleAddItem = () => {
    if (!newItem.itemName || !newItem.price) return;

    fetch("http://localhost:8080/api/menus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newItem,
        restaurant: { id: restaurantId }   // ✅ important: send restaurant as object
      })
    })
      .then(res => res.json())
      .then(data => {
        setMenu([...menu, data]);
        setNewItem({ itemName: "", description: "", price: "" });
      })
      .catch(err => console.error("Error adding item:", err));
  };

  // DELETE menu item
  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/menus/${id}`, { method: "DELETE" })
      .then(() => setMenu(menu.filter(item => item.id !== id)))
      .catch(err => console.error("Error deleting item:", err));
  };

  // PUT update menu item
  const handleEdit = (id, field, value) => {
    const updatedItem = menu.find(item => item.id === id);
    if (!updatedItem) return;

    const newData = { ...updatedItem, [field]: value };

    fetch(`http://localhost:8080/api/menus/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData)
    })
      .then(res => res.json())
      .then(data => {
        setMenu(menu.map(item => (item.id === id ? data : item)));
      })
      .catch(err => console.error("Error updating item:", err));
  };

  return (
    <div>
      <h2 className="mb-4">Manage Menu</h2>

      {/* Add Item Form */}
      <div className="card mb-4">
        <div className="card-header">Add New Menu Item</div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Dish Name"
                value={newItem.itemName}
                onChange={(e) =>
                  setNewItem({ ...newItem, itemName: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Price ₹"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: Number(e.target.value) })
                }
              />
            </div>
            <div className="col-md-2 d-grid">
              <button className="btn btn-success" onClick={handleAddItem}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Table */}
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item) => (
              <tr key={item.id}>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={item.itemName}
                    onChange={(e) =>
                      handleEdit(item.id, "itemName", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={item.description || ""}
                    onChange={(e) =>
                      handleEdit(item.id, "description", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.price}
                    onChange={(e) =>
                      handleEdit(item.id, "price", Number(e.target.value))
                    }
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
