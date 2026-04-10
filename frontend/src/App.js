import { useEffect, useState } from "react";
import "./App.css";

const API = "https://productmanager-7ge5.onrender.com/api/products";

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "" });
  const [editingId, setEditingId] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API);
      const data = await res.json();
      setProducts(data);
    } catch {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.price) return;
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API}/${editingId}` : API;
    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, price: Number(form.price) }),
      });
      setForm({ name: "", price: "" });
      setEditingId(null);
      setEditingIndex(null);
      fetchProducts();
    } catch {
      setError("Failed to save product.");
    }
  };

  const handleEdit = (product, index) => {
    setForm({ name: product.name, price: product.price });
    setEditingId(product._id);
    setEditingIndex(index);
  };

  const cancelEdit = () => {
    setForm({ name: "", price: "" });
    setEditingId(null);
    setEditingIndex(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch {
      setError("Failed to delete.");
    }
  };

  const avg = products.length
    ? Math.round(products.reduce((a, b) => a + b.price, 0) / products.length)
    : null;

  const shortId = (id) => "#" + String(id).slice(-4).toUpperCase();

  const fmtDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "2-digit",
        })
      : "—";

  return (
    <div className="app">

      {/* Topbar */}
      <div className="topbar">
        <div className="topbar-brand">
          <div className="brand-dot" />
          <span className="brand-label">product_manager</span>
        </div>
        <span className="topbar-meta">
          <span className="dot-status" />
          API CONNECTED · OK
        </span>
      </div>

      <div className="layout">

        {/* Sidebar */}
        <div className="sidebar">

          {/* Stats */}
          <div>
            <div className="sidebar-label">Statistics</div>
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-num">{products.length}</div>
                <div className="stat-lbl">Products</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">
                  {avg ? "₹" + avg.toLocaleString("en-IN") : "—"}
                </div>
                <div className="stat-lbl">Avg Price</div>
              </div>
            </div>
          </div>

          <div className="divider" />

          {/* Form */}
          <div>
            <div className="sidebar-label">
              {editingId ? "Edit Product" : "Add Product"}
            </div>
            <div className="form-fields">
              <div className="field-group">
                <div className="field-label">Name</div>
                <input
                  className="field-input"
                  placeholder="e.g. Wireless Keyboard"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="field-group">
                <div className="field-label">Price (₹)</div>
                <input
                  className="field-input"
                  type="number"
                  placeholder="e.g. 1499"
                  min="0"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>
              <button className="btn-primary" onClick={handleSubmit}>
                {editingId ? "Update Product" : "Add Product"}
              </button>
              {editingId && (
                <button className="btn-ghost" onClick={cancelEdit}>
                  Cancel Edit
                </button>
              )}
              {error && <p className="error-msg">{error}</p>}
            </div>
          </div>

        </div>

        {/* Main content */}
        <div className="main">
          <div className="main-header">
            <span className="main-title">Inventory</span>
            <span className="route-tag">GET /api/products</span>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Added</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="empty-state loader-text">
                      Fetching products...
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="empty-state">
                      No products yet — add one from the sidebar.
                    </td>
                  </tr>
                ) : (
                  products.map((p, i) => (
                    <tr
                      key={p._id}
                      style={
                        editingIndex === i
                          ? { background: "#1a1a1a" }
                          : {}
                      }
                    >
                      <td className="id-cell">{shortId(p._id)}</td>
                      <td>{p.name}</td>
                      <td className="price-cell">
                        ₹{Number(p.price).toLocaleString("en-IN")}
                      </td>
                      <td className="id-cell">{fmtDate(p.createdAt)}</td>
                      <td>
                        <div className="actions-cell">
                          <button
                            className="action-btn"
                            onClick={() => handleEdit(p, i)}
                          >
                            Edit
                          </button>
                          <button
                            className="action-btn del"
                            onClick={() => handleDelete(p._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
