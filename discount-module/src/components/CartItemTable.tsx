import React from "react";
import { CartItem } from "../pages/DiscountCalculator";

type Props = {
  items: CartItem[];
  onRemove: (id: string) => void;
};

const CartItemTable: React.FC<Props> = ({ items, onRemove }) => {
  return (
    <div className="container">
      <h2 className="title">Cart Items</h2>
      {items.length === 0 ? (
        <p style={{ color: "#888" }}>No items in cart.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price (THB)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price.toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="button-primary"
                    style={{ backgroundColor: "#e53935" }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CartItemTable;
