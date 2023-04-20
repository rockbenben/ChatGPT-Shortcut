import axios from "axios";

export async function fetchAllCopyCounts() {
  try {
    const response = await axios.get(
      "https://api-count.newzone.top/api/cards/allcounts"
    );
    const counts = response.data.reduce((acc, item) => {
      acc[item.card_id] = item.count;
      return acc;
    }, {});
    return counts;
  } catch (error) {
    console.error("Error fetching all copy counts:", error);
    return {};
  }
}
export async function updateCopyCount(cardId) {
  try {
    const response = await axios.post(
      `https://api-count.newzone.top/api/cards/${cardId}/copy`
    );
    const updatedCount = response.data.copyCount;
    return updatedCount;
  } catch (error) {
    console.error("Error updating copy count:", error);
    return null;
  }
}
