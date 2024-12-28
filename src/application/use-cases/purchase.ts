import { getInjection } from "di/container";
import type { InsertPurchase } from "domain/purchase/purchase.schema";

export const createPurchase = async (purchase: InsertPurchase) => {
  const purchaseRepository = getInjection("IPurchaseRepository");

  try {
    const result = await purchaseRepository.insert(purchase);
    return result;
  } catch (error) {
    console.error("Error creating purchase:", error);
    throw new Error("Failed to create purchase");
  }
};
