export default (superClass) => {
  return class extends superClass {
    static get properties () {
      return {
        user: {
          type: Object,
          statePath: 'user'
        }
      }
    }

    connectedCallback () {
      super.connectedCallback()

      this.__userObserver = firebase.auth().onAuthStateChanged(user => {
        this.dispatch({
          type: 'UPDATE_USER',
          user
        })
      })
    }

    disconnectedCallback () {
      super.disconnectedCallback()

      this.__userObserver()
    }

    login (e) {
      var id = e.target.id
      var provider

      if (id === 'google') provider = new firebase.auth.GoogleAuthProvider()


      firebase.auth().signInWithPopup(provider).then(result => {
        this.dispatch({
          type: 'UPDATE_USER',
          user: result.user
        })
      })
    }

    logout () {
      firebase.auth().signOut().then(() => {
        this.dispatch({
          type: 'UPDATE_USER'
        })
      })
    }

    _checkRole (user, role, itemRole) {
      if (user) {
        const roleNumber = this._getRoleNumber(role)
        const itemRoleNumber = this._getRoleNumber(itemRole)
        return itemRoleNumber >= roleNumber
      } else if (!user && (itemRole === undefined || itemRole === null)) {
        return true
      }
      return false
    }

    _getRoleNumber (role) {
      if (role === 'admin') return 1
      if (role === 'editor') return 2
      if (role === 'staff') return 3
      if (role === 'member') return 4
      if (role === 'pending') return 5
      return 100
    }
  }
}