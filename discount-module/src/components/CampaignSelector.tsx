import React from "react";
import { CampaignType } from "../pages/DiscountCalculator";

const categories = ["Clothing", "Accessories", "Electronics"] as const;
type Category = (typeof categories)[number];

type Props = {
  campaigns: CampaignType[];
  setCampaigns: React.Dispatch<React.SetStateAction<CampaignType[]>>;
};

const CampaignSelector: React.FC<Props> = ({ campaigns, setCampaigns }) => {
  const updateCampaign = (updated: CampaignType) => {
    setCampaigns((prev) => {
      const filtered = prev.filter((c) => c.type !== updated.type);
      return [...filtered, updated];
    });
  };

  return (
    <div className="container">
      <h2 className="title">Discount Campaigns</h2>

      <div className="section">
        {/* Fixed Amount */}
        <div className="input-group">
          <label>Fixed Amount</label>
          <input
            type="number"
            onChange={(e) =>
              updateCampaign({ type: "fixed", amount: Number(e.target.value) })
            }
            placeholder="Amount"
          />
        </div>

        {/* Percentage Discount */}
        <div className="input-group">
          <label>Percentage Discount</label>
          <input
            type="number"
            onChange={(e) =>
              updateCampaign({
                type: "percentage",
                percentage: Number(e.target.value),
              })
            }
            placeholder="%"
          />
        </div>

        {/* Category Discount */}
        <div className="input-group">
          <label>Category Discount</label>
          <select
            onChange={(e) =>
              updateCampaign({
                type: "category",
                category: categories.includes(e.target.value as Category)
                  ? (e.target.value as Category)
                  : "Clothing",
                amount: 0,
              })
            }
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        {/* Category Discount Amount */}
        <div className="input-group">
          <label>Category Discount Amount</label>
          <input
            type="number"
            placeholder="Amount"
            onBlur={(e) => {
              const category = campaigns.find(
                (c) => c.type === "category"
              ) as Extract<CampaignType, { type: "category" }>;
              if (category)
                updateCampaign({ ...category, amount: Number(e.target.value) });
            }}
          />
        </div>

        {/* Points */}
        <div className="input-group">
          <label>Points</label>
          <input
            type="number"
            onChange={(e) =>
              updateCampaign({ type: "points", points: Number(e.target.value) })
            }
            placeholder="Points"
          />
        </div>

        {/* Seasonal Campaign */}
        <div className="input-group">
          <label>Seasonal Campaign</label>
          <input
            type="number"
            placeholder="Every X THB"
            onChange={(e) => {
              const existing = campaigns.find(
                (c) => c.type === "seasonal"
              ) as Extract<CampaignType, { type: "seasonal" }>;
              updateCampaign({
                type: "seasonal",
                every: Number(e.target.value),
                discount: existing?.discount || 0,
              });
            }}
          />
        </div>
        <div className="input-group">
          <label>Discount Y THB</label>
          <input
            type="number"
            placeholder="Discount Y THB"
            onChange={(e) => {
              const existing = campaigns.find(
                (c) => c.type === "seasonal"
              ) as Extract<CampaignType, { type: "seasonal" }>;
              updateCampaign({
                type: "seasonal",
                every: existing?.every || 0,
                discount: Number(e.target.value),
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CampaignSelector;
