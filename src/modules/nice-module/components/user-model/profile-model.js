import Permission from '../permission-model/permission-model.js'
import User from '../user-model/user-model.js'

export default (superClass) => {
  return class extends User(Permission(superClass)) {

    static get properties () {
      return {
        profileImages: {
          type: Array
        },
        profileFiles: {
          type: Array
        },
        profileType: {
          type: String
        },
        profile: {
          type: Object
        },
        profileId: {
          type: String
        }
      }
    }

    static get observers () {
      return [
        '_loadProfile(profileId, user, role)'
      ]
    }

    disconnectedCallback () {
      super.disconnectedCallback()
      this._unlisten()
    }

    _unlisten () {
      if (this.__profile) {
        this.__profile.off('value', this._loadProfileSnapshot, this)
      }
      if (this.__profileImage) {
        this.__profileImage.off('value', this._loadProfileImageSnapshot, this)
      }
      if (this.__profileFile) {
        this.__profileFile.off('value', this._loadProfileFileSnapshot, this)
      }
      if (this.__profileType) {
        this.__profileType.off('value', this._loadProfileTypeSnapshot, this)
      }
    }

    _loadProfile (id, user, role) {
      this._unlisten()

      if (id) {
        this.__profile = firebase.database().ref(`v2/user/data/${id}`)
        this.__profileImage = firebase.database().ref(`v2/user/list/image/${id}`)
        this.__profileFile = firebase.database().ref(`v2/user/list/file/${id}`)

        this.__profile.on('value', this._loadProfileSnapshot, this._onError, this)
        this.__profileImage.on('value', this._loadProfileImageSnapshot, this._onError, this)
        this.__profileFile.on('value', this._loadProfileFileSnapshot, this._onError, this)

        if (user && user.uid && role && this._checkRole(user, role, 'editor')) {
          this.__profileType = firebase.database().ref(`v2/permission/data/${id}/role`)
          this.__profileType.on('value', this._loadProfileTypeSnapshot, this._onError, this)
        }
      } else {
        this._unlisten()
        this.__profile = null
        this.__profileImage = null
        this.__profileFile = null
      }
    }

    _loadProfileSnapshot (snapshot) {
      this.profile = snapshot.val()
    }

    _loadProfileImageSnapshot (snapshot) {
      var list = []
      snapshot.forEach(child => {
        list.push({
          $key: child.key,
          value: child.val().value
        })
      })
      this.profileImages = list
    }

    _loadProfileFileSnapshot (snapshot) {
      var list = []
      snapshot.forEach(child => {
        list.push({
          $key: child.key,
          value: child.val().value
        })
      })
      this.profileFiles = list
    }

    _loadProfileTypeSnapshot (snapshot) {
      this.profileType = snapshot.val()
    }

    _renderDate (d) {
      var date = d;
      if (typeof d === 'object' && d.value) {
        date = d.value;
      }
      var nd = new Date(date);
      return nd.toLocaleDateString() + ' - ' + nd.toLocaleTimeString();
    }

    isEqual (a, b) {
      return a === b
    }

    _onError (error) {
      console.log(error)
    }

  }
}