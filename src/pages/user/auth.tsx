import { useEffect } from "react";

const CallbackPage = () => {
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        if (window.opener) {
          window.opener.postMessage({ code }, "*");
          window.close();
        } else {
          // Handle the situation where window.opener is null
          console.error("Please do not close the main login page during the login process");
        }
      } else {
        // Handle the error
        console.error("No code present in URL");
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  }, []);

  return null; // or a loading spinner, or whatever you want to show while waiting
};

export default CallbackPage;
