import Redux from '../nice-redux/nice-redux.js'

var permission = null

export default (superClass) => {
  return class extends Redux(superClass) {

    static get properties () {
      return {
        permission: {
          type: Object,
          statePath: 'main.permission'
        }
      }
    }

    static get observers () {
      return [
        '_loadPermissions(user)'
      ]
    }

    _loadPermissions (user) {
      if (user) {

        if (!permission) {
          permission = firebase.database().ref(`v2/permission/data/${user.uid}`)
        } else if (permission.toString() !== firebase.database().ref(`v2/permission/data/${user.uid}`).toString()) {
          permission.off()
          permission = firebase.database().ref(`v2/permission/data/${user.uid}`)
        }

        permission.on('value', (snapshot) => {
          this.dispatch({
            type: 'UPDATE_PERMISSION',
            permission: snapshot.val()
          })
        })


      } else if (permission) {
        permission.off()
        permission = null
      }
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