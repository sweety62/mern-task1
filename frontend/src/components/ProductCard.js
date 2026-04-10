import "./ProductCard.css";

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="card">
      <div className="card-icon">🛒</div>
      <h3 className="card-name">{product.name}</h3>
      <p className="card-price">₹{Number(product.price).toLocaleString("en-IN")}</p>
      <div className="card-actions">
        <button className="card-btn edit" onClick={() => onEdit(product)}>
          ✏️ Edit
        </button>
        <button className="card-btn delete" onClick={() => onDelete(product._id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;