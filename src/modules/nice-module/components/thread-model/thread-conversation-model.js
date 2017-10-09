export default (superClass) => {
  return class extends superClass {

    static get properties () {
      return {
        threadId: {
          type: String
        }
      }
    }

    static get observers () {
      return [
        '_checkThread(user.uid, profileId)'
      ]
    }

    _checkThread (userId, profileId) {
      if (userId && profileId) {
        this.__threadConversation = firebase.database().ref(`v2/thread/query/${userId}::${profileId}`)
        this.__threadConversation.on('value', this._loadThreadConversation, this._onError, this)
      } else if (this.__threadConversation) {
        this.__threadConversation.off()
      }
    }

    _loadThreadConversation (snapshot) {
      if (snapshot.exists()) {
        this.threadId = snapshot.key;
      }
    }

    _onError (error) {
      console.log(error)
    }

  }
}