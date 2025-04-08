export function cacheJsonData(jsonData, lang) {
  // 定义缓存的键和过期时间的计算方式
  const getCacheKey = (id) => `cards_${id}${lang ? `_${lang}` : ""}`;
  const getExpirationKey = (cacheKey) => `${cacheKey}_expiration`;
  const expirationTime = 100 * 24 * 60 * 60 * 1000;

  // 遍历传入的 JSON 数据，并缓存到 localStorage
  jsonData.forEach((item) => {
    const cacheKey = getCacheKey(item.id);
    const expirationKey = getExpirationKey(cacheKey);

    // 如果缓存中没有数据，或者缓存已经过期，则将新数据保存到 localStorage
    const cachedDataStr = localStorage.getItem(cacheKey);
    if (!cachedDataStr) {
      // 保存数据和过期时间
      localStorage.setItem(cacheKey, JSON.stringify(item));
      localStorage.setItem(expirationKey, String(Date.now() + expirationTime));
    }
  });
}
