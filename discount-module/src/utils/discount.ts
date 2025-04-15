import { CartItem, CampaignType } from "../pages/DiscountCalculator";
let totalpoint = 0;
let totalseason = 0;
let totalCoupon = 0;
let totalByCatagory = 0;

export const applyDiscounts = (
  items: CartItem[],
  campaigns: CampaignType[]
): number => {
  let total = items.reduce((sum, item) => sum + item.price, 0);
  totalCoupon = 0;
  totalByCatagory = 0;
  totalpoint = 0;
  totalseason = 0;

  // console.log("Total before discounts:", total);

  const getCampaign = (type: CampaignType["type"]) =>
    campaigns.find((c) => c.type === type);

  // Coupon Campaigns
  const fixed = getCampaign("fixed") as Extract<
    CampaignType,
    { type: "fixed" }
  >;
  const percentage = getCampaign("percentage") as Extract<
    CampaignType,
    { type: "percentage" }
  >;
  // console.log("Fixed Campaign:", fixed);
  // console.log("Percentage Campaign:", percentage);
  if (fixed) {
    totalCoupon = fixed.amount;
    total -= fixed.amount;
  }
  if (percentage) {
    totalCoupon = (total * percentage.percentage) / 100;
    total -= (total * percentage.percentage) / 100;
  }

  // On Top Campaigns
  const category = getCampaign("category") as Extract<
    CampaignType,
    { type: "category" }
  >;
  const points = getCampaign("points") as Extract<
    CampaignType,
    { type: "points" }
  >;

  if (category) {
    if (percentage) {
      const catSum = items
        .filter((i) => i.category === category.category)
        .reduce(
          (sum, i) => sum + i.price - (i.price * percentage.percentage) / 100,
          0
        );
      totalByCatagory += catSum * (category.amount / 100);
      total -= catSum * (category.amount / 100);
    } else if (fixed) {
      const catSum = items
        .filter((i) => i.category === category.category)
        .reduce((sum, i) => sum + i.price, 0);

      // หักส่วนลดแบบ fixed แต่ไม่เกินยอดของหมวดหมู่นั้น
      const fixedDiscount = Math.min(fixed.amount, catSum);
      totalByCatagory += (catSum - fixedDiscount) / 10;
      total -= (catSum - fixedDiscount) / 10;
    } else {
      const catSum = items
        .filter((i) => i.category === category.category)
        .reduce((sum, i) => sum + i.price, 0);
      totalByCatagory += catSum * (category.amount / 100);
      total -= catSum * (category.amount / 100);
    }

    // total = Math.min(catSum, category.amount);
    // totalByCatagory += catSum * (category.amount / 100);
    // total -= catSum * (category.amount / 100);
  }
  if (points) {
    const maxDiscount = total * 0.2;
    const discountPoints = Math.min(points.points, maxDiscount);
    total -= discountPoints;
    totalpoint = discountPoints;
  }
  console.log("Bef seasonal:", total);
  // Seasonal Campaigns
  const seasonal = getCampaign("seasonal") as Extract<
    CampaignType,
    { type: "seasonal" }
  >;
  totalseason = 0;
  if (seasonal) {
    if (seasonal.every > 0) {
      const multiplier = Math.floor(total / seasonal.every);
      // console.log("Bef seasonal:", total);
      // console.log("seasonal.every:", seasonal.every);
      // console.log("multiplier:", multiplier);
      // console.log("seasonal.discount:", seasonal.discount);
      const discount_season = multiplier * seasonal.discount;
      //console.log("discount_season:", discount_season);

      totalseason += discount_season;
      total -= discount_season;
    }
  }

  console.log("Total after discounts:", total);

  return Math.max(0, total);
};
export const getDiscountCoupon = () => {
  return totalCoupon;
};
export const getDiscountByCatagory = () => {
  return totalByCatagory;
};
export const getDiscountPoint = () => {
  return totalpoint;
};
export const getDiscountSeason = () => {
  return totalseason;
};
