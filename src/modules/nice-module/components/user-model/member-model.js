import Permission from '../permission-model/permission-model.js'
import User from '../user-model/user-model.js'

export default (superClass) => {
  return class extends User(Permission(superClass)) {

    static get properties () {
      return {
        memberImages: {
          type: Array
        },
        memberFiles: {
          type: Array
        },
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
        '_loadMember(memberId, user, role)'
      ]
    }

    disconnectedCallback () {
      super.disconnectedCallback()
      this._unlisten()
    }

    _unlisten () {
      if (this.__member) {
        this.__member.off('value', this._loadMemberSnapshot, this)
      }
      if (this.__memberImage) {
        this.__memberImage.off('value', this._loadMemberImageSnapshot, this)
      }
      if (this.__memberFile) {
        this.__memberFile.off('value', this._loadMemberFileSnapshot, this)
      }
      if (this.__memberType) {
        this.__memberType.off('value', this._loadMemberTypeSnapshot, this)
      }
    }

    _loadMember (id, user, role) {
      this._unlisten()

      if (id) {
        this.__member = firebase.database().ref(`v2/user/data/${id}`)
        this.__memberImage = firebase.database().ref(`v2/user/list/image/${id}`)
        this.__memberFile = firebase.database().ref(`v2/user/list/file/${id}`)

        this.__member.on('value', this._loadMemberSnapshot, this._onError, this)
        this.__memberImage.on('value', this._loadMemberImageSnapshot, this._onError, this)
        this.__memberFile.on('value', this._loadMemberFileSnapshot, this._onError, this)

        if (user && user.uid && role && this._checkRole(user, role, 'editor')) {
          this.__memberType = firebase.database().ref(`v2/permission/data/${id}/role`)
          this.__memberType.on('value', this._loadMemberTypeSnapshot, this._onError, this)
        }
      } else {
        this._unlisten()
        this.__member = null
        this.__memberImage = null
        this.__memberFile = null
      }
    }

    _loadMemberSnapshot (snapshot) {
      this.member = snapshot.val()
    }

    _loadMemberImageSnapshot (snapshot) {
      var list = []
      snapshot.forEach(child => {
        list.push({
          $key: child.key,
          value: child.val().value
        })
      })
      this.memberImages = list
    }

    _loadMemberFileSnapshot (snapshot) {
      var list = []
      snapshot.forEach(child => {
        list.push({
          $key: child.key,
          value: child.val().value
        })
      })
      this.memberFiles = list
    }

    _loadMemberTypeSnapshot (snapshot) {
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

    _onError (error) {
      console.log(error)
    }

  }
}