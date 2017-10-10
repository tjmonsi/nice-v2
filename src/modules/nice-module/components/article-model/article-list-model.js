export default (superClass) => {
  return class extends superClass {

    static get properties () {
      return {
        list: {
          type: Array
        },
        type: {
          type: String
        },
        limit: {
          type: Number,
          value: 3
        },
        query: {
          type: String
        }
      }
    }

    static get observers () {
      return [
        '_checkType(type, query, limit)'
      ]
    }

    _checkType (type, query, limit) {
      if (type && query && limit) {
        this.__list = firebase.database().ref(`v2/${type}/query/${query}`).orderByChild('value')
        if (limit > 0) {
          this.__list.limitToLast(limit)
        }
        this.__list.on('value', this._loadListSnapshot, this._onError, this)
      } else if (this.__list) {
        this.__list.off()
        this.__list = null
      }
    }

    _loadListSnapshot (snapshot) {
      var list = []
      console.log(this.limit)
      snapshot.forEach(child => {
        console.log(child.key)
        var obj = Object.assign({}, child.val(), {
          $key: child.key
        })
        if (list.length < this.limit) {
          list.push(obj)
        }

      })
      this.list = list.sort((a, b) => {
        return b.value - a.value
      })
      // this.list = list
    }

    _onError (error) {
      console.log(error)
    }

  }
}