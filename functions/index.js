const functions = require('firebase-functions')
const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');
const settings = require('./settings.json');
const client = algoliasearch(settings.algolia.apikey, settings.algolia.secretkey);
const articles = client.initIndex('nice_articles');
admin.initializeApp();

exports.createProfile = functions.auth.user().onCreate(user => {
  const email = user.email;
  const displayName = user.displayName || email;
  const uid = user.uid;
  const image = user.photoURL;
  const updates = {};
  const path = `v2/user/data/${uid}`;
  updates[`${path}/email`] = email;
  updates[`${path}/displayName`] = displayName;
  updates[`${path}/firstName`] = displayName;
  updates[`${path}/lastName`] = '';
  updates[`${path}/image`] = image;
  updates[`${path}/agree`] = false;
  updates[`${path}/address`] = '';
  updates[`${path}/contact`] = '';
  updates[`${path}/position`] = '';
  updates[`${path}/work`] = '';
  updates[`${path}/dateJoined`] = admin.database.ServerValue.TIMESTAMP
  return admin.database().ref().update(updates);
});

exports.saveBasedOnPublish = functions.database.ref('/v2/{model}/data/{id}/')
  .onWrite((change, context) => {
    const updates = {};
    const { before, after } = change;
    const { params } = context;
    const { model: type, id } = params;
    if (after.exists()) {
      const model = after.ref.parent.parent;
      const root = model.root;
      console.log(root);
      return Promise.all([
        root.child('/v2/categoryMain/data').once('value'),
        root.child('/v2/categorySub/data').once('value')
      ])
      .then(results => {
        const mainSnapshot = results[0];
        const subSnapshot = results[1];
        const data = after.val();
        const { key } = after;
        console.log(data)

        const categoryMain = []
        for (let i in data.categoryMain) {
          categoryMain.push(i)
        }

        const categorySub = []
        for (let j in data.categorySub) {
          categorySub.push(j)
        }

        const types = []
        for (let k in data.type) {
          types.push(k)
        }

        const obj = {
          body: data.body,
          categoryMain: categoryMain,
          categorySub: categorySub,
          datePublished: data.datePublished,
          published: data.published,
          summary: data.summary,
          title: data.title,
          year: data.year,
          userType: data.userType,
          position: data.position,
          address: data.address,
          lastName: data.lastName,
          firstName: data.firstName,
          work: data.work,
          researchInstitution: data.researchInstitution,
          types,
          model: type,
          objectID: key
        };

        if (type !== 'permission' && type !== 'feedback') {
          articles.saveObject(obj, (err, content) => {
            if (err) return console.log(err);
            console.log(content, model)
          })

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

          if (data.type && data.type.topstories && data.type.topstories.value && data.published) {
            updates[`/query/topstories/${id}/value`] = admin.database.ServerValue.TIMESTAMP
          } else {
            updates[`/query/topstories/${id}`] = null
          }

          if (data.type && data.type.otherstories && data.type.otherstories.value && data.published) {
            updates[`/query/otherstories/${id}/value`] = admin.database.ServerValue.TIMESTAMP
          } else {
            updates[`/query/otherstories/${id}`] = null
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

          if (data.type && data.type.stateuniversities && data.type.stateuniversities.value && data.published) {
            updates[`/query/stateuniversities/${id}/value`] = admin.database.ServerValue.TIMESTAMP
          } else {
            updates[`/query/stateuniversities/${id}`] = null
          }

          if (data.type && data.type.otherpartners && data.type.otherpartners.value && data.published) {
            updates[`/query/otherpartners/${id}/value`] = admin.database.ServerValue.TIMESTAMP
          } else {
            updates[`/query/otherpartners/${id}`] = null
          }

          return model.update(updates);

        } else if (type === 'permission') {

          articles.partialUpdateObject({
            role: data.role,
            objectID: key
          }, (err, content) => {
            if (err) return console.log(err);
          })

          return Promise.resolve();

        } else if (type === 'feedback') {
          updates[`/query/all/${id}/value`] = admin.database.ServerValue.TIMESTAMP
          updates[`/query/${data.type}::${data.articleId}/${id}/value`] = admin.database.ServerValue.TIMESTAMP
          return model.update(updates);
        }
      });
    }
  });

// exports.saveBasedOnPublish = functions.database.ref('/v2/{model}/data/{id}/')
//   .onWrite(event => {
//     // // Exit when the data is deleted.
//     // if (!event.data.exists()) {
//     //   return 0;
//     // }

//     var updates = {}
//     var model = event.data.adminRef.parent.parent
//     var root = model.root
//     var type = event.params.model
//     var id = event.params.id

//     console.log(root)

//     return Promise.all([
//       root.child('/v2/categoryMain/data').once('value'),
//       root.child('/v2/categorySub/data').once('value')
//     ])
//     .then(results => {
//       const mainSnapshot = results[0];
//       const subSnapshot = results[1];
//       const data = event.data.val();
//       const key = event.data.key

//       console.log(data)

//       var categoryMain = []
//       for (var i in data.categoryMain) {
//         categoryMain.push(i)
//       }

//       var categorySub = []
//       for (var j in data.categorySub) {
//         categorySub.push(j)
//       }

//       var types = []
//       for (var k in data.type) {
//         types.push(k)
//       }

//       var obj = {
//         body: data.body,
//         categoryMain: categoryMain,
//         categorySub: categorySub,
//         datePublished: data.datePublished,
//         published: data.published,
//         summary: data.summary,
//         title: data.title,
//         year: data.year,
//         userType: data.userType,
//         position: data.position,
//         address: data.address,
//         lastName: data.lastName,
//         firstName: data.firstName,
//         work: data.work,
//         researchInstitution: data.researchInstitution,
//         types,
//         model: type,
//         objectID: key
//       }

//       if (type !== 'permission' && type !== 'feedback') {
//         articles.saveObject(obj, (err, content) => {
//           if (err) return console.log(err);
//           console.log(content, model)
//         })

//         if (data.published) {
//           if (type === 'about') {
//             updates[`/query/published/${id}/value`] = data.order
//           } else {
//             updates[`/query/published/${id}/value`] = admin.database.ServerValue.TIMESTAMP
//           }

//           updates[`/query/draft/${id}`] = null
//         } else {
//           updates[`/query/draft/${id}/value`] = admin.database.ServerValue.TIMESTAMP
//           updates[`/query/published/${id}`] = null
//         }

//         mainSnapshot.forEach(item => {
//           if (data.categoryMain && data.categoryMain[item.key] && data.published) {
//             updates[`/query/${item.key}/${id}/value`] = admin.database.ServerValue.TIMESTAMP
//           } else {
//             updates[`/query/${item.key}/${id}`] = null
//           }
//         })

//         subSnapshot.forEach(item => {
//           if (data.categorySub && data.categorySub[item.key] && data.published) {
//             updates[`/query/${item.key}/${id}/value`] = admin.database.ServerValue.TIMESTAMP
//           } else {
//             updates[`/query/${item.key}/${id}`] = null
//           }
//         })

//         if (data.type && data.type.farmer && data.type.farmer.value && data.published) {
//           updates[`/query/farmer/${id}/value`] = admin.database.ServerValue.TIMESTAMP
//         } else {
//           updates[`/query/farmer/${id}`] = null
//         }

//         if (data.type && data.type.topstories && data.type.topstories.value && data.published) {
//           updates[`/query/topstories/${id}/value`] = admin.database.ServerValue.TIMESTAMP
//         } else {
//           updates[`/query/topstories/${id}`] = null
//         }

//         if (data.type && data.type.otherstories && data.type.otherstories.value && data.published) {
//           updates[`/query/otherstories/${id}/value`] = admin.database.ServerValue.TIMESTAMP
//         } else {
//           updates[`/query/otherstories/${id}`] = null
//         }

//         if (data.type && data.type.socialagripreneurs && data.type.socialagripreneurs.value && data.published) {
//           updates[`/query/socialagripreneurs/${id}/value`] = admin.database.ServerValue.TIMESTAMP
//         } else {
//           updates[`/query/socialagripreneurs/${id}`] = null
//         }

//         if (data.type && data.type.agroprocessing && data.type.agroprocessing.value && data.published) {
//           updates[`/query/agroprocessing/${id}/value`] = admin.database.ServerValue.TIMESTAMP
//         } else {
//           updates[`/query/agroprocessing/${id}`] = null
//         }

//         if (data.type && data.type.bayanihan && data.type.bayanihan.value && data.published) {
//           updates[`/query/bayanihan/${id}/value`] = admin.database.ServerValue.TIMESTAMP
//         } else {
//           updates[`/query/bayanihan/${id}`] = null
//         }

//         if (data.type && data.type.stateuniversities && data.type.stateuniversities.value && data.published) {
//           updates[`/query/stateuniversities/${id}/value`] = admin.database.ServerValue.TIMESTAMP
//         } else {
//           updates[`/query/stateuniversities/${id}`] = null
//         }

//         if (data.type && data.type.otherpartners && data.type.otherpartners.value && data.published) {
//           updates[`/query/otherpartners/${id}/value`] = admin.database.ServerValue.TIMESTAMP
//         } else {
//           updates[`/query/otherpartners/${id}`] = null
//         }

//         return model.update(updates);

//       } else if (type === 'permission') {

//         articles.partialUpdateObject({
//           role: data.role,
//           objectID: key
//         }, (err, content) => {
//           if (err) return console.log(err);
//         })

//         return Promise.resolve();

//       } else if (type === 'feedback') {
//         updates[`/query/all/${id}/value`] = admin.database.ServerValue.TIMESTAMP
//         updates[`/query/${data.type}::${data.articleId}/${id}/value`] = admin.database.ServerValue.TIMESTAMP
//         return model.update(updates);
//       }
//     })
//   })

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
