export default (superClass) => {
  return class extends superClass {

    static get properties () {
      return {
        file: {
          type: Object
        },
        fileId: {
          type: String
        },
        type: {
          type: String
        }
      }
    }

    static get observers () {
      return [
        '_loadFile(fileId)'
      ]
    }

    disconnectedCallback () {
      super.disconnectedCallback()
      if (this.__file) {
        this.__file.off('value', this._loadFileSnapshot, this)
      }
    }

    _loadFile (id) {
      if (id) {
        this.__file = firebase.database().ref(`v2/file/data/${id}`)
        this.__file.on('value', this._loadFileSnapshot, this._onError, this)
      } else if (this.__article) {
        this.__file.off('value', this._loadFileSnapshot, this)
        this.__file = null
      }
    }

    _loadFileSnapshot (snapshot) {
      this.file = snapshot.val()
    }

    _onError (error) {
      console.log(error)
    }

  }
}