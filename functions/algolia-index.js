const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');
const settings = require('./settings.json'); 
const serviceAccount = require('./security.json');
const client = algoliasearch(settings.algolia.apikey, settings.algolia.secretkey);
const articles = client.initIndex('nice_articles');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://lbf-nice.firebaseio.com'
});

const models = [
  'about',
  'dl',
  'story',
  'cberecommends',
  'pas',
  'quickfacts',
  'resource',
  'permission',
  'feedback'
];


articles.setSettings({
  searchableAttributes: ['body', 'summary', 'title'],
  attributesForFaceting: ['categoryMain', 'categorySub', 'model', 'published', 'types', 'researchInstitution', 'year']
});
    
    

Promise.all([
  admin.database().ref('/v2/categoryMain/data').once('value'),
  admin.database().ref('/v2/categorySub/data').once('value')
]).then(results => {
  const mainSnapshot = results[0];
  const subSnapshot = results[1];
  
  models.forEach(type => {
    admin.database().ref(`/v2/${type}/data`).once('value').then(snapshot => {
      const updates = {};
      snapshot.forEach(item => {
        const data = item.val();
        const key = item.key;
        const id = item.key;
        
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
        
        var obj = {
          body: data.body && data.body.substr(0, 5000),
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
        }
        
        if (type !== 'permission' && type !== 'feedback') {
          articles.saveObject(obj, (err, content) => {
            if (err) return console.log(err);
            // console.log(content, type)
          });
          
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
        }
      });
      
      admin.database().ref().update(updates).then(() => {
        console.log('done');
      })
    });
  })
  
  
});

