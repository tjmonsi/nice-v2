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

    isEqual (a, b) {
      return a === b
    }

    sendMessage () {
      firebase.database().ref(`v2/thread/query/${this.user.uid}::${this.memberId}`).once('value').then(snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(child => {
            var key = child.key;
            window.history.pushState({}, '', '/thread/' + key)
            window.dispatchEvent(new CustomEvent('location-changed'))
          })
        } else {
          var updates = {}
          var date = firebase.database.ServerValue.TIMESTAMP
          var key = firebase.database().ref(`v2/thread/data`).push().key
          updates[`v2/thread/query/${this.user.uid}::${this.memberId}/${key}/value`] = date;
          updates[`v2/thread/query/${this.memberId}::${this.user.uid}/${key}/value`] = date;
          updates[`v2/thread/query/${this.user.uid}/${key}/value`] = date;
          updates[`v2/thread/query/${this.memberId}/${key}/value`] = date;
          updates[`v2/thread/data/${key}/dateLastMessage`] = date;
          updates[`v2/thread/data/${key}/title`] = 'Conversations';
          updates[`v2/thread/data/${key}/members/${this.memberId}/value`] = true;
          updates[`v2/thread/data/${key}/members/${this.user.uid}/value`] = true;
          firebase.database().ref().update(updates).then(() => {
            window.history.pushState({}, '', '/thread/' + key)
            window.dispatchEvent(new CustomEvent('location-changed'))
          })
        }
      })
    }

    _onError (error) {
      console.log(error)
    }

  }
}