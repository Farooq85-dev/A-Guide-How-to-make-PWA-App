// Add this in your index.html connected JavaScript file

// ServiceWorker And user to show the Install App
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => {
          // console.log("Service worker registered");
          if (res.installing) {
            // console.log("Service worker installing");
          } else if (res.waiting) {
            // console.log("Service worker installed");
          } else if (res.active) {
            // console.log("Service worker active");
          }
          res.addEventListener("updatefound", () => {
            // console.log("New service worker found");
          });
        })
        .catch(err => console.error("Service worker registration failed:", err))
    });
  
    let deferredPrompt;
  
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      deferredPrompt = event;
    });
  
    const installButton = document.getElementById("installButton");
  
    installButton.addEventListener("click", () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice
          .then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
              console.log("User accepted the install prompt");
            } else {
              console.log("User dismissed the install prompt");
            }
            deferredPrompt = null;
          })
          .catch((error) => {
            console.error("Error during prompt:", error);
            deferredPrompt = null;
          });
      }
    });
  }
  