import React, { useState } from "react";
import { CartItem } from "../pages/DiscountCalculator";
import { v4 as uuidv4 } from "uuid";

type Props = {
  onAdd: (item: CartItem) => void;
};

const NewItemForm: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<CartItem["category"]>("Clothing");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || price <= 0) return;
    onAdd({ id: uuidv4(), name, price, category });
    setName("");
    setPrice(0);
    setCategory("Clothing");
  };

  return (
    <div className="container">
      <h2 className="title">Add New Item</h2>
      <form onSubmit={handleSubmit} className="section">
        <div className="input-group">
          <label htmlFor="item-name">Item Name</label>
          <input
            id="item-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Item name"
          />
        </div>

        <div className="input-group">
          <label htmlFor="item-price">Price</label>
          <input
            id="item-price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Price"
          />
        </div>

        <div className="input-group">
          <label htmlFor="item-category">Category</label>
          <select
            id="item-category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as CartItem["category"])
            }
          >
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>

        <button type="submit" className="button-primary">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default NewItemForm;
