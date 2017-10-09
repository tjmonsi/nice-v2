const functions = require('firebase-functions')

module.exports = functions.database.ref('/v2/thread/query/member/${owner}/${member}')
  .onCreate(event => {
    var owner = event.params.owner;
    var member = event.params.member;
    if (event.data.ref.parent.parent.child(member).child(member).once('value').then())
  })