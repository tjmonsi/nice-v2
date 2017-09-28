export default (superClass) => {
  return class extends superClass {

    static get properties () {
      return {
        article: {
          type: Object
        },
        id: {
          type: String
        },
        type: {
          type: String
        }
      }
    }

    static get observers () {
      return [
        '_loadArticle(id, type)'
      ]
    }

    disconnectedCallback () {
      super.disconnectedCallback()
      if (this.__article) {
        this.__article.off('value', this._loadArticleSnapshot, this)
      }
    }

    _loadArticle (id, type) {
      if (id && type) {
        this.__article = firebase.database().ref(`v2/${type}/data/${id}`)
        this.__article.on('value', this._loadArticleSnapshot, this._onError, this)
      } else if (this.__article) {
        this.__article.off('value', this._loadArticleSnapshot, this)
        this.__article = null
      }
    }

    _loadArticleSnapshot (snapshot) {
      this.article = snapshot.val()
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