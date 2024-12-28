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
export const getPurchaseByIdUser = async (UserId: string) => {
  const purchaseRepository = getInjection("IPurchaseRepository");
  try {
    const purchase = await purchaseRepository.getPurchaseByIdUser(UserId);
    if (!purchase) {
      throw new Error("Purchase not found");
    }
    return purchase;
  } catch (error) {
    console.error("Error retrieving purchase:", error);
    throw new Error("Failed to retrieve purchase");
  }
};
