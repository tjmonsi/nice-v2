import Permission from '../permission-model/permission-model.js'
import User from '../user-model/user-model.js'

export default (superClass) => {
  return class extends User(Permission(superClass)) {

    static get properties () {
      return {
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
        '_loadProfile(profileId, user, permission.role)'
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
      if (this.__profileType) {
        this.__profileType.off('value', this._loadProfileTypeSnapshot, this)
      }
    }

    _loadProfile (id, user, role) {
      this._unlisten()

      if (id) {
        this.__profile = firebase.database().ref(`v2/user/data/${id}/displayName`)
        this.__profileImage = firebase.database().ref(`v2/user/data/${id}/image`)

        this.__profile.on('value', this._loadProfileSnapshot, this._onError, this)
        this.__profileImage.on('value', this._loadProfileImageSnapshot, this._onError, this)

        if (user && user.uid && role && this._checkRole(user, role, 'editor')) {
          this.__profileType = firebase.database().ref(`v2/permission/data/${id}/role`)
          this.__profileType.on('value', this._loadProfileTypeSnapshot, this._onError, this)
        }
      } else {
        this._unlisten()
        this.__profile = null
        this.__profileImage = null
      }
    }

    _loadProfileSnapshot (snapshot) {
      this.profile = this.profile || {}
      this.set('profile.displayName', snapshot.val())
    }

    _loadProfileImageSnapshot (snapshot) {
      this.profile = this.profile || {}
      this.set('profile.image', snapshot.val())
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

    _onError (error) {
      console.log(error)
    }

  }
}