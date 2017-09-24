export default (superClass) => {
  return class extends superClass {
    static get properties () {
      return {
        user: {
          type: Object,
          value: {
            uid: 'test'
          }
        }
      }
    }

    login (e) {
      var id = e.target.id
      console.log(id)
    }

    _checkRole (user, role, itemRole) {
      if (user) {
        const roleNumber = this._getRoleNumber(role)
        const itemRoleNumber = this._getRoleNumber(itemRole)
        console.log(itemRoleNumber, roleNumber)
        return itemRoleNumber >= roleNumber
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