/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
      if (typeof Notification !== typeof undefined) { //First check if the API is available in the browser
        Notification.requestPermission().then(function (result) {
          //If accepted, then save subscriberinfo in database
          if (result === "granted") {
            console.log("Browser: User accepted receiving notifications, save as subscriber data!");
            navigator.serviceWorker.ready.then(function (serviceworker) { //When the Service Worker is ready, generate the subscription with our Serice Worker's pushManager and save it to our list
              const VAPIDPublicKey = "BCwHP9NAvndYcGZEIxRPerI4mYM2pWLlQq6wLYjim6zMvX-0dvRYIs53C2oUg_KLR_TwXS97gfhmzKA8J8n5s4U"; // Fill in your VAPID publicKey here
              const options = {applicationServerKey: VAPIDPublicKey, userVisibleOnly: true} //Option userVisibleOnly is neccesary for Chrome
              serviceworker.pushManager.subscribe(options).then((subscription) => {
                //POST the generated subscription to our saving script (this needs to happen server-side, (client-side) JavaScript can't write files or databases)
                let subscriberFormData = new FormData();
                subscriberFormData.append("json", JSON.stringify(subscription));
                fetch("data/saveSubscription.php", {method: "POST", body: subscriberFormData});
                console.log("is subscribed");
              });
            });
          }
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      console.log('New content is available; please refresh.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
