export default (superClass) => {
  return class extends superClass {

    static get properties () {
      return {
        messages: {
          type: Array
        },
        threadId: {
          type: String
        },
        limit: {
          type: Number,
          value: 4
        }
      }
    }

    static get observers () {
      return [
        '_checkMessages(threadId, limit)'
      ]
    }

    _checkMessages (theadId, limit) {
      if (theadId && limit) {
        this.__list = firebase.database().ref(`v2/message/query/${theadId}`).orderByChild('value')
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
      snapshot.forEach(child => {
        var obj = Object.assign({}, child.val(), {
          $key: child.key
        })
        list.push(obj)
      })
      this.messages = list.sort((a, b) => {
        return a.value - b.value
      })
      // this.list = list
    }

    _onError (error) {
      console.log(error)
    }

  }
}