import Permission from '../permission-model/permission-model.js'
import User from '../user-model/user-model.js'

export default (superClass) => {
  return class extends User(Permission(superClass)) {

    static get properties () {
      return {
        memberType: {
          type: String
        },
        member: {
          type: Object
        },
        memberId: {
          type: String
        }
      }
    }

    static get observers () {
      return [
        '_loadProfile(memberId, user, permission.role)'
      ]
    }

    disconnectedCallback () {
      super.disconnectedCallback()
      this._unlisten()
    }

    _unlisten () {
      if (this.__member) {
        this.__member.off('value', this._loadProfileSnapshot, this)
      }
      if (this.__memberImage) {
        this.__memberImage.off('value', this._loadProfileImageSnapshot, this)
      }
      if (this.__memberType) {
        this.__memberType.off('value', this._loadProfileTypeSnapshot, this)
      }
    }

    _loadProfile (id, user, role) {
      this._unlisten()

      if (id) {
        this.__member = firebase.database().ref(`v2/user/data/${id}/displayName`)
        this.__memberImage = firebase.database().ref(`v2/user/data/${id}/image`)

        this.__member.on('value', this._loadProfileSnapshot, this._onError, this)
        this.__memberImage.on('value', this._loadProfileImageSnapshot, this._onError, this)

        if (user && user.uid && role && this._checkRole(user, role, 'editor')) {
          this.__memberType = firebase.database().ref(`v2/permission/data/${id}/role`)
          this.__memberType.on('value', this._loadProfileTypeSnapshot, this._onError, this)
        }
      } else {
        this._unlisten()
        this.__member = null
        this.__memberImage = null
      }
    }

    _loadProfileSnapshot (snapshot) {
      this.member = this.member || {}
      this.set('member.displayName', snapshot.val())
    }

    _loadProfileImageSnapshot (snapshot) {
      this.member = this.member || {}
      this.set('member.image', snapshot.val())
    }

    _loadProfileTypeSnapshot (snapshot) {
      this.memberType = snapshot.val()
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