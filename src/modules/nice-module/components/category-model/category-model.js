export default (superClass) => {
  return class extends superClass {

    static get properties () {
      return {
        categoryMain: {
          type: Array
        },
        categorySub: {
          type: Array
        },
        categoryResearchInstitution: {
          type: Array
        }
      }
    }

    connectedCallback () {
      super.connectedCallback()
      this.__categoryMain = firebase.database().ref(`v2/categoryMain/data`)
      this.__categorySub = firebase.database().ref(`v2/categorySub/data`)
      this.__categoryResearchInstitution = firebase.database().ref(`v2/categoryResearchInstitution/data`)

      this.__categoryMain.on('value', this._loadCategoryMainSnapshot, this._onError, this)
      this.__categorySub.on('value', this._loadCategorySubSnapshot, this._onError, this)
      this.__categoryResearchInstitution.on('value', this._loadCategoryResearchInstitutionSnapshot, this._onError, this)
    }

    disconnectedCallback () {
      super.disconnectedCallback()

      if (this.__categoryMain) this.__categoryMain.off('value', this._loadCategoryMainSnapshot, this)
      if (this.__categorySub) this.__categorySub.off('value', this._loadCategorySubSnapshot, this)
      if (this.__categoryResearchInstitution) this.__categoryResearchInstitution.off('value', this._loadCategoryResearchInstitutionSnapshot, this)
    }

    _loadCategoryMainSnapshot (snapshot) {
      var list = []
      snapshot.forEach(child => {
        var obj = Object.assign({}, child.val(), {
          $key: child.key
        })
        list.push(obj)
      })
      this.categoryMain = list
    }

    _loadCategorySubSnapshot (snapshot) {
      var list = []
      snapshot.forEach(child => {
        var obj = Object.assign({}, child.val(), {
          $key: child.key
        })
        list.push(obj)
      })

      list.sort((a, b) => {
        if(a.parent < b.parent) return -1;
        if(a.parent > b.parent) return 1;
        return 0;
      })
      this.categorySub = list
    }
    
    _loadCategoryResearchInstitutionSnapshot (snapshot) {
      var list = []
      snapshot.forEach(child => {
        var obj = Object.assign({}, child.val(), {
          $key: child.key
        })
        list.push(obj)
      })
      // console.log(list)
      this.categoryResearchInstitution = list
    }

    _onError (error) {
      console.log(error)
    }

  }
}