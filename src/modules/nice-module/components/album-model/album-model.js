export default (superClass) => {
  return class extends superClass {

    static get properties () {
      return {
        album: {
          type: Object
        },
        id: {
          type: String
        }
      }
    }

    static get observers () {
      return [
        '_loadAlbum(id)'
      ]
    }

    disconnectedCallback () {
      super.disconnectedCallback()
      if (this.__album) {
        this.__album.off('value', this._loadArticleSnapshot, this)
      }
    }

    _loadArticle (id, type) {
      if (id && type) {
        this.__album = firebase.database().ref(`v2/${type}/data/${id}`)
        this.__album.on('value', this._loadArticleSnapshot, this._onError, this)
      } else if (this.__article) {
        this.__album.off('value', this._loadArticleSnapshot, this)
        this.__album = null
      }
    }

    _loadArticleSnapshot (snapshot) {
      this.article = snapshot.val()
    }

    _onError (error) {
      console.log(error)
    }

  }
}