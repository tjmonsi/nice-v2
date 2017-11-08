export default (superClass) => {
  return class extends superClass {

    static get properties () {
      return {
        feedbackList: {
          type: Array
        },
        feedbackQuery: {
          type: String
        }
      }
    }

    static get observers () {
      return [
        '_checkType(feedbackQuery)'
      ]
    }

    _checkType (feedbackQuery) {
      console.log(feedbackQuery)
      const limit = 50;
      if (feedbackQuery) {
        this.__feedbacklist = firebase.database().ref(`v2/feedback/query/${feedbackQuery}`).orderByChild('value')
        if (!isNaN(limit) && limit > 0) {
          this.__feedbacklist.limitToLast(limit)
        }
        this.__feedbacklist.on('value', this._loadFeedbackListSnapshot, this._onError, this)
      } else if (this.__feedbacklist) {
        this.__feedbacklist.off()
        this.__feedbacklist = null
      }
    }

    _loadFeedbackListSnapshot (snapshot) {
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
      console.log(list)
      this.feedbackList = list
      // this.list = list
    }

    _onError (error) {
      console.log(error)
    }

  }
}