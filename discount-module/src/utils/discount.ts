import { CartItem, CampaignType } from "../pages/DiscountCalculator";

export const applyDiscounts = (items: CartItem[], campaigns: CampaignType[]): number => {
    let total = items.reduce((sum, item) => sum + item.price, 0);
  
    const getCampaign = (type: CampaignType['type']) =>
      campaigns.find((c) => c.type === type);
  
    // Coupon Campaigns
    const fixed = getCampaign('fixed') as Extract<CampaignType, { type: 'fixed' }>;
    const percentage = getCampaign('percentage') as Extract<CampaignType, { type: 'percentage' }>;
    if (fixed) {
      total -= fixed.amount;
    } else if (percentage) {
      total -= (total * percentage.percentage) / 100;
    }
  
    // On Top Campaigns
    const category = getCampaign('category') as Extract<CampaignType, { type: 'category' }>;
    const points = getCampaign('points') as Extract<CampaignType, { type: 'points' }>;
    if (category) {
      const catSum = items
        .filter((i) => i.category === category.category)
        .reduce((sum, i) => sum + i.price, 0);
      total -= Math.min(catSum, category.amount);
    } else if (points) {
      const maxDiscount = total * 0.2;
      total -= Math.min(points.points, maxDiscount);
    }
  
    // Seasonal Campaigns
    const seasonal = getCampaign('seasonal') as Extract<CampaignType, { type: 'seasonal' }>;
    if (seasonal) {
      const multiplier = Math.floor(total / seasonal.every);
      total -= multiplier * seasonal.discount;
    }
  
    return Math.max(0, total);
  };
  

// export const applyDiscounts = (
//   items: CartItem[],
//   campaigns: CampaignType[]
// ): number => {
//   let total = items.reduce((sum, item) => sum + item.price, 0);
//   const getCampaign = (type: string) =>
//     campaigns.find((c) => "type" in c && c.type === type);

//   const fixed = getCampaign("fixed") as Extract<
//     CampaignType,
//     { type: "fixed" }
//   >;
//   const percentage = getCampaign("percentage") as Extract<
//     CampaignType,
//     { type: "percentage" }
//   >;
//   if (fixed) total -= fixed.amount;
//   else if (percentage) total -= (total * percentage.percentage) / 100;

//   const category = getCampaign("category") as Extract<
//     CampaignType,
//     { type: "category" }
//   >;
//   const points = getCampaign("points") as Extract<
//     CampaignType,
//     { type: "points" }
//   >;
//   if (category) {
//     const catSum = items
//       .filter((i) => i.category === category.category)
//       .reduce((sum, i) => sum + i.price, 0);
//     total -= Math.min(catSum, category.amount);
//   } else if (points) {
//     const maxDiscount = total * 0.2;
//     total -= Math.min(points.points, maxDiscount);
//   }

//   const seasonal = getCampaign("seasonal") as Extract<
//     CampaignType,
//     { type: "seasonal" }
//   >;
//   if (seasonal) {
//     const multiplier = Math.floor(total / seasonal.every);
//     total -= multiplier * seasonal.discount;
//   }

//   return Math.max(total, 0);
// };
