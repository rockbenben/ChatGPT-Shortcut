import { useEffect, useState } from "react";

export function useAppleKeyboard() {
  const [isApple, setIsApple] = useState(false);

  useEffect(() => {
    setIsApple(/Macintosh|iPad|iPhone|iPod/.test(navigator.userAgent));
  }, []);

  return isApple;
}
