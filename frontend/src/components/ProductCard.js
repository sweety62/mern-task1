import "./ProductCard.css";

function ProductCard({ name, price }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Price: ₹{price}</p>
    </div>
  );
}

export default ProductCard;