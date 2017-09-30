export default (superClass) => {
  return class extends superClass {

    static get properties () {
      return {
        image: {
          type: Object
        },
        imageId: {
          type: String
        },
        type: {
          type: String
        }
      }
    }

    static get observers () {
      return [
        '_loadImage(imageId)'
      ]
    }

    disconnectedCallback () {
      super.disconnectedCallback()
      if (this.__image) {
        this.__image.off('value', this._loadImageSnapshot, this)
      }
    }

    _loadImage (id) {
      if (id) {
        this.__image = firebase.database().ref(`v2/image/data/${id}`)
        this.__image.on('value', this._loadImageSnapshot, this._onError, this)
      } else if (this.__article) {
        this.__image.off('value', this._loadImageSnapshot, this)
        this.__image = null
      }
    }

    _loadImageSnapshot (snapshot) {
      this.image = snapshot.val()
    }

    _onError (error) {
      console.log(error)
    }

  }
}