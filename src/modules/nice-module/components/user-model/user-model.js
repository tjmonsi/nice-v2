import { store } from '../nice-redux/nice-redux.js'
import Redux from '../nice-redux/nice-redux.js'

var profile = null

firebase.auth().onAuthStateChanged(user => {
  store.dispatch({
    type: 'UPDATE_USER',
    user
  })

  if (user) {
    profile = firebase.database().ref(`v2/user/data/${user.uid}`)
    profile.on('value', (snapshot) => {
      store.dispatch({
        type: 'UPDATE_PROFILE',
        profile: snapshot.val()
      })
    })
  } else if (profile) {
    profile.off()
    profile = null
  }
})

export default (superClass) => {
  return class extends Redux(superClass) {
    static get properties () {
      return {
        user: {
          type: Object,
          statePath: 'main.user'
        },
        profile: {
          type: Object,
          statePath: 'main.profile'
        }
      }
    }

    login (e) {
      var id = e.target.id
      var provider

      if (id === 'google') provider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithPopup(provider)
    }

    logout () {
      firebase.auth().signOut()
    }
  }
}