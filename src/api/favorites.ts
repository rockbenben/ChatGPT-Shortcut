/**
 * Favorites APIs - create, update, and manage favorites
 */
import { apiClient } from "./client";
import { clearMySpaceCache } from "./myspace";

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
    clearMySpaceCache();
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

    clearMySpaceCache(); // ⭐ 清除 MySpace 缓存
    return response;
  } catch (error) {
    console.error("Error updating favorite:", error);
    throw error;
  }
}
