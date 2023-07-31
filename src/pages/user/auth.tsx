import React, { useEffect } from 'react';

const CallbackPage = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      window.opener.postMessage({ code }, '*');
      window.close();
    } else {
      // Handle the error
      console.error('No code present in URL');
    }
  }, []);

  return null; // or a loading spinner, or whatever you want to show while waiting
};

export default CallbackPage;
