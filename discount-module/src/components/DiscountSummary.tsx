import React from "react";
import styles from "./DiscountSummary.module.css";
import { CampaignType, CartItem } from "../pages/DiscountCalculator";
import { applyDiscounts } from "../utils/discount";

type Props = {
  items: CartItem[];
  campaigns: CampaignType[];
};

const DiscountSummary: React.FC<Props> = ({ items, campaigns }) => {
  const totalBefore = items.reduce((sum, item) => sum + item.price, 0);
  const totalAfter = applyDiscounts(items, campaigns);
  const discount = totalBefore - totalAfter;

  return (
    <div className={styles.summaryBox}>
      <h2 className={styles.summaryTitle}>Summary</h2>
      <div className={styles.summaryRow}>
        <span>Total Before Discount:</span>
        <span>{totalBefore.toFixed(2)} THB</span>
      </div>
      <div className={styles.summaryRow}>
        <span>Total Discount:</span>
        <span style={{ color: "red" }}>– {discount.toFixed(2)} THB</span>
      </div>
      <div className={styles.totalRow}>
        <span>Total After Discount : </span>
        <span> {totalAfter.toFixed(2)} THB</span>
      </div>
    </div>
  );
};

export default DiscountSummary;
