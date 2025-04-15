import React, { useState } from "react";
import { CartItemTable, NewItemForm, CampaignSelector } from "../components";
import DiscountSummary from "../components/DiscountSummary";
//import { applyDiscounts } from "@/utils/discount";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  category: "Clothing" | "Accessories" | "Electronics";
};

export type CampaignType =
  | { type: "fixed"; amount: number }
  | { type: "percentage"; percentage: number }
  | { type: "category"; category: CartItem["category"]; amount: number }
  | { type: "points"; points: number }
  | { type: "seasonal"; every: number; discount: number };

const DiscountCalculator: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignType[]>([]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Discount Calculator</h1>
      <NewItemForm onAdd={(item) => setItems([...items, item])} />
      <CartItemTable
        items={items}
        onRemove={(id) => setItems(items.filter((i) => i.id !== id))}
      />
      <CampaignSelector campaigns={campaigns} setCampaigns={setCampaigns} />
      <DiscountSummary items={items} campaigns={campaigns} />
    </div>
  );
};

export default DiscountCalculator;
