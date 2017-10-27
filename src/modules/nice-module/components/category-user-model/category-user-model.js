export default (superClass) => {
  return class extends superClass {

    static get properties () {
      return {
        categoryUser: {
          type: Array
        }
      }
    }

    connectedCallback () {
      super.connectedCallback()
      this.__categoryUser = firebase.database().ref(`v2/categoryUser/data`)
      this.__categoryUser.on('value', this._loadCategoryUserSnapshot, this._onError, this)
    }

    disconnectedCallback () {
      super.disconnectedCallback()
      if (this.__categoryUser) this.__categoryUser.off('value', this._loadCategoryUserSnapshot, this)
    }

    _loadCategoryUserSnapshot (snapshot) {
      var list = []
      snapshot.forEach(child => {
        var obj = Object.assign({}, child.val(), {
          $key: child.key
        })
        list.push(obj)
      })
      this.categoryUser = list
    }

    _onError (error) {
      console.log(error)
    }

  }
}