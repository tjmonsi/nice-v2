const functions = require('firebase-functions')
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.saveBasedOnPublish = functions.database.ref('/v2/{model}/data/{id}/')
  .onWrite(event => {
    // // Exit when the data is deleted.
    // if (!event.data.exists()) {
    //   return 0;
    // }
    
    var updates = {}
    var model = event.data.adminRef.parent.parent.parent
    var root = model.root
    var type = event.params.model
    var id = event.params.id
    
    console.log(root)
    
    return Promise.all([
      root.child('/v2/categoryMain/data').once('value'),
      root.child('/v2/categorySub/data').once('value')
    ])
    .then(results => {
      const mainSnapshot = results[0];
      const subSnapshot = results[1];
      const data = event.data.val();
      
      console.log(data)
      
      if (data.published) {
        if (type === 'about') {
          updates[`/query/published/${id}/value`] = data.order
        } else {
          updates[`/query/published/${id}/value`] = admin.database.ServerValue.TIMESTAMP
        }
        
        updates[`/query/draft/${id}`] = null
      } else {
        updates[`/query/draft/${id}/value`] = admin.database.ServerValue.TIMESTAMP
        updates[`/query/published/${id}`] = null
      }
      
      mainSnapshot.forEach(item => {
        if (data.categoryMain && data.categoryMain[item.key] && data.published) {
          updates[`/query/${item.key}/${id}/value`] = admin.database.ServerValue.TIMESTAMP
        } else {
          updates[`/query/${item.key}/${id}`] = null
        }
      })
      
      subSnapshot.forEach(item => {
        if (data.categorySub && data.categorySub[item.key] && data.published) {
          updates[`/query/${item.key}/${id}/value`] = admin.database.ServerValue.TIMESTAMP
        } else {
          updates[`/query/${item.key}/${id}`] = null
        }
      })
      
      if (data.type && data.type.farmer && data.type.farmer.value && data.published) {
        updates[`/query/farmer/${id}/value`] = admin.database.ServerValue.TIMESTAMP
      } else {
        updates[`/query/farmer/${id}`] = null
      }
      
      if (data.type && data.type.socialagripreneurs && data.type.socialagripreneurs.value && data.published) {
        updates[`/query/socialagripreneurs/${id}/value`] = admin.database.ServerValue.TIMESTAMP
      } else {
        updates[`/query/socialagripreneurs/${id}`] = null
      }
      
      if (data.type && data.type.agroprocessing && data.type.agroprocessing.value && data.published) {
        updates[`/query/agroprocessing/${id}/value`] = admin.database.ServerValue.TIMESTAMP
      } else {
        updates[`/query/agroprocessing/${id}`] = null
      }
      
      if (data.type && data.type.bayanihan && data.type.bayanihan.value && data.published) {
        updates[`/query/bayanihan/${id}/value`] = admin.database.ServerValue.TIMESTAMP
      } else {
        updates[`/query/bayanihan/${id}`] = null
      }
      
      return model.update(updates);
    })
  })

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
