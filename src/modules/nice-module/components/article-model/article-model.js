export default (superClass) => {
  return class extends superClass {

    static get properties () {
      return {
        articleImages: {
          type: Array
        },
        articleFiles: {
          type: Array
        },
        article: {
          type: Object
        },
        articleId: {
          type: String
        },
        type: {
          type: String
        }
      }
    }

    static get observers () {
      return [
        '_loadArticle(articleId, type)'
      ]
    }

    disconnectedCallback () {
      super.disconnectedCallback()
      if (this.__article) {
        this.__article.off('value', this._loadArticleSnapshot, this)
      }
      if (this.__articleImage) {
        this.__articleImage.off('value', this._loadArticleImageSnapshot, this)
      }
      if (this.__articleFile) {
        this.__articleFile.off('value', this._loadArticleFileSnapshot, this)
      }
    }

    _loadArticle (id, type) {
      if (id && type) {
        this.__article = firebase.database().ref(`v2/${type}/data/${id}`)
        this.__articleImage = firebase.database().ref(`v2/${type}/list/image/${id}`)
        this.__articleFile = firebase.database().ref(`v2/${type}/list/file/${id}`)

        this.__article.on('value', this._loadArticleSnapshot, this._onError, this)
        this.__articleImage.on('value', this._loadArticleImageSnapshot, this._onError, this)
        this.__articleFile.on('value', this._loadArticleFileSnapshot, this._onError, this)
      } else if (this.__article) {
        this.__article.off('value', this._loadArticleSnapshot, this)
        this.__articleImage.off('value', this._loadArticleImageSnapshot, this)
        this.__articleFile.off('value', this._loadArticleFileSnapshot, this)

        this.__article = null
        this.__articleImage = null
        this.__articleFile = null
      }
    }

    _loadArticleSnapshot (snapshot) {
      this.article = snapshot.val()
    }

    _loadArticleImageSnapshot (snapshot) {
      var list = []
      snapshot.forEach(child => {
        list.push({
          $key: child.key,
          value: child.val().value
        })
      })
      this.articleImages = list
    }

    _loadArticleFileSnapshot (snapshot) {
      var list = []
      snapshot.forEach(child => {
        list.push({
          $key: child.key,
          value: child.val().value
        })
      })
      console.log(list)
      this.articleFiles = list
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