// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js')
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('../firebase-messaging-sw.js')
//       .then(function(registration) {
//         console.log('Registration successful, scope is:', registration.scope);
//       }).catch(function(err) {
//         console.log('Service worker registration failed, error:', err);
//       });
//     }
//     firebase.initializeApp({
//       apiKey: "AIzaSyDFtKdz6u3SpnFWS7YOiZm68fyRo4KH_Sk",
//       authDomain: "tricareservices-2069e.firebaseapp.com",
//       projectId: "tricareservices-2069e",
//       storageBucket: "tricareservices-2069e.appspot.com",
//       messagingSenderId: "674535097134",
//       appId: "1:674535097134:web:0ac3aea613f89088f6f0bf",
//       measurementId: "G-DHJ9RBFDQ8"
//     });



//   const messaging = firebase.messaging()

// messaging.onBackgroundMessage((payload)=>{
//     console.log(
//         "[firebase-messaging-sw.js] Received background message ++ ",
//       payload  
//     );
//     const notificationTitle=payload.notification.title;
//     const notificationOptions={
//         body:payload.notification.body,
//         icon:payload.notification.image,
//     };
    
//     // self.addEventListener('push', function (event) {
//     //   const payload = event.data.json();
//     //   const notification=JSON.parse(localStorage.getItem("notificationArray"))||[];
//     //   notification.push(payload.notification);
//     //   localStorage.setItem("notificationArray",JSON.stringify(notification));
//     // });
//     self.registration.showNotification(notificationTitle,notificationOptions)
// });
