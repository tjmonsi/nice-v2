export default (superClass) => {
  return class extends superClass {

    static get properties () {
      return {
        thread: {
          type: Object
        },
        threadId: {
          type: String
        }
      }
    }

    static get observers () {
      return [
        '_loadThread(threadId)'
      ]
    }

    disconnectedCallback () {
      super.disconnectedCallback()
      if (this.__thread) {
        this.__thread.off('value', this._loadThreadSnapshot, this)
      }
    }

    _loadThread (id) {
      if (id) {
        this.__thread = firebase.database().ref(`v2/thread/data/${id}`)
        this.__thread.on('value', this._loadThreadSnapshot, this._onError, this)
      } else if (this.__thread) {
        this.__thread.off('value', this._loadThreadSnapshot, this)

        this.__thread = null
      }
    }

    _loadThreadSnapshot (snapshot) {
      this.thread = snapshot.val()
    }

    _renderDate (d) {
      var date = d;
      if (typeof d === 'object' && d.value) {
        date = d.value;
      }
      var nd = new Date(date);
      return nd.toLocaleDateString() + ' - ' + nd.toLocaleTimeString();
    }

    _sendMessage () {
      var body = this.shadowRoot.querySelector('#body').value
      console.log(this.threadId, this.user, this.user.uid, body)
      if (this.threadId && this.user && this.user.uid && body) {
        var key = firebase.database().ref(`v2/message/data`).push().key
        var updates = {}

        updates[`v2/message/data/${key}/uid`] = this.user.uid
        updates[`v2/message/data/${key}/body`] = body
        updates[`v2/message/data/${key}/dateSent`] = firebase.database.ServerValue.TIMESTAMP
        updates[`v2/message/data/${key}/threadId`] = this.threadId
        updates[`v2/message/query/${this.threadId}/${key}/value`] = firebase.database.ServerValue.TIMESTAMP

        firebase.database().ref().update(updates).then(() => {
          this.shadowRoot.querySelector('#body').value = ''
        })
        // updates[`v2/thread/query/member/${this`]
        // firebase.database().ref()
      }
    }

    _onError (error) {
      console.log(error)
    }

  }
}