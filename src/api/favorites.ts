/**
 * Favorites APIs - create, update, and manage favorites
 */
import { apiClient, ensureArrayInput, clearUserAllInfoCache } from "./client";

/**
 * Create a new favorite record
 */
export async function createFavorite(loves: number[], isComm: boolean = false) {
  try {
    const response = await apiClient.post(`/favorites`, {
      data: {
        [isComm ? "commLoves" : "loves"]: loves,
      },
    });

    clearUserAllInfoCache();
    return response;
  } catch (error) {
    console.error("Error creating favorite:", error);
    throw error;
  }
}

/**
 * Update existing favorites
 */
export async function updateFavorite(favoriteId: number, loves: number[], isComm: boolean = false) {
  if (!favoriteId) throw new Error("favoriteId is required");
  try {
    const response = await apiClient.put(`/favorites/${favoriteId}`, {
      data: {
        [isComm ? "commLoves" : "loves"]: loves,
      },
    });

    return response;
  } catch (error) {
    console.error("Error updating favorite:", error);
    throw error;
  }
}

/**
 * Update favorites order
 */
export async function updateFavoritesOrder(type: string, order: number[]) {
  try {
    const trimmedType = typeof type === "string" ? type.trim() : "";
    if (!trimmedType) {
      throw new Error("type is required");
    }

    const safeOrder = ensureArrayInput(order, `${trimmedType} order`);

    const response = await apiClient.put(`/favorites/favorite-order`, {
      [trimmedType]: safeOrder,
    });
    return response;
  } catch (error) {
    console.error("Error updating Order:", error);
    throw error;
  }
}
