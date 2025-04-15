import React from "react";
import styles from "./DiscountSummary.module.css";
import { CampaignType, CartItem } from "../pages/DiscountCalculator";
import {
  applyDiscounts,
  getDiscountCoupon,
  getDiscountByCatagory,
  getDiscountPoint,
  getDiscountSeason,
} from "../utils/discount";

type Props = {
  items: CartItem[];
  campaigns: CampaignType[];
};

const DiscountSummary: React.FC<Props> = ({ items, campaigns }) => {
  const totalBefore = items.reduce((sum, item) => sum + item.price, 0);
  const totalAfter = applyDiscounts(items, campaigns);
  const discount = totalBefore - totalAfter;
  const totalcoupon = getDiscountCoupon();
  const totalbycatagory = getDiscountByCatagory();
  const discountPoint = getDiscountPoint();
  const totalseason = getDiscountSeason();
  return (
    <div className={styles.summaryBox}>
      <h2 className={styles.summaryTitle}>Summary</h2>
      <div className={styles.summaryRow}>
        <span>Total Before Discount:</span>
        <span>{totalBefore.toFixed(2)} THB</span>
      </div>
      {totalcoupon > 0 && (
        <div className={styles.summaryRow}>
          <span>Discount Coupon:</span>
          <span style={{ color: "red" }}>– {totalcoupon.toFixed(2)} THB</span>
        </div>
      )}
      {totalbycatagory > 0 && (
        <div className={styles.summaryRow}>
          <span>Discount By Category %:</span>
          <span style={{ color: "red" }}>
            – {totalbycatagory.toFixed(2)} THB
          </span>
        </div>
      )}

      {discountPoint > 0 && (
        <div className={styles.summaryRow}>
          <span>Discount Point (max 20% on top):</span>
          <span style={{ color: "red" }}>– {discountPoint.toFixed(2)} THB</span>
        </div>
      )}

      {totalseason > 0 && (
        <div className={styles.summaryRow}>
          <span>Discount Season:</span>
          <span style={{ color: "red" }}>– {totalseason.toFixed(2)} THB</span>
        </div>
      )}

      <div className={styles.totalRow}>
        <span>Total Discount : </span>
        <span> {discount.toFixed(2)} THB</span>
      </div>
      <div className={styles.totalRow}>
        <span>Total After Discount : </span>
        <span> {totalAfter.toFixed(2)} THB</span>
      </div>
    </div>
  );
};

export default DiscountSummary;
