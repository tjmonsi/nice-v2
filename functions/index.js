const functions = require('firebase-functions')
const admin = require('firebase-admin');


exports.saveBasedOnPublish = functions.database.ref('/v2/{model}/data/{id}/published')
  .onWrite(event => {
    // Only edit data when it is first created.
    if (event.data.previous.exists()) {
      return;
    }
    // Exit when the data is deleted.
    if (!event.data.exists()) {
      return;
    }
    
    var updates = {}
    var root = event.data.adminRef.parent.parent.parent
    console.log(root.toString())
    
    return Promise.resolve()
  })

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
