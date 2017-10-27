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
        },
        reverse: {
          type: Boolean,
          value: false
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
        limit = parseInt(limit, 10)
        if (!isNaN(limit) && limit > 0) {
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
      snapshot.forEach(child => {
        var obj = Object.assign({}, child.val(), {
          $key: child.key
        })
        list.push(obj)
        // if (list.length < this.limit || this.limit < 0) {
          
        // }
      })
      // console.log(list)
      list.sort((a, b) => {
        if (this.reverse) {
          return a.value - b.value
        }
        return b.value - a.value
      })
      var limit = parseInt(this.limit, 10)
      if (!isNaN(limit) && limit > 0) {
        while (list.length > limit) {
          list.pop()
        }  
      }
      
      // if (this.limit > 0) {
      //   for (var i = 0; i < this.limit; i++)  {
      //     list.pop()
      //   }
      // }
      this.list = list
      // this.list = list
    }

    _onError (error) {
      console.log(error)
    }

  }
}