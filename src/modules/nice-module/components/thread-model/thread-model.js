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
        '_loadThread(threadId, type)'
      ]
    }

    disconnectedCallback () {
      super.disconnectedCallback()
      if (this.__thread) {
        this.__thread.off('value', this._loadThreadSnapshot, this)
      }
    }

    _loadThread (id, type) {
      if (id && type) {
        this.__thread = firebase.database().ref(`v2/${type}/data/${id}`)
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

    _onError (error) {
      console.log(error)
    }

  }
}