export default (superClass) => {
  return class extends superClass {

    static get properties () {
      return {
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
      if (this.__articleTitle) {
        this.__articleTitle.off('value', this._loadArticleTitleSnapshot, this)
      }
      if (this.__articleDatePublished) {
        this.__articleDatePublished.off('value', this._loadArticleDatePublishedSnapshot, this)
      }
      if (this.__articleSummary) {
        this.__articleSummary.off('value', this._loadArticleSummarySnapshot, this)
      }
      if (this.__articleBannerImage) {
        this.__articleBannerImage.off('value', this._loadArticleBannerImageSnapshot, this)
      }
    }

    _loadArticle (id, type) {
      if (id && type) {
        this.__articleTitle = firebase.database().ref(`v2/${type}/data/${id}/title`)
        this.__articleTitle.on('value', this._loadArticleTitleSnapshot, this._onError, this)

        this.__articleDatePublished = firebase.database().ref(`v2/${type}/data/${id}/datePublished`)
        this.__articleDatePublished.on('value', this._loadArticleDatePublishedSnapshot, this._onError, this)

        this.__articleSummary = firebase.database().ref(`v2/${type}/data/${id}/summary`)
        this.__articleSummary.on('value', this._loadArticleSummarySnapshot, this._onError, this)

        this.__articleBannerImage = firebase.database().ref(`v2/${type}/data/${id}/bannerImage`)
        this.__articleBannerImage.on('value', this._loadArticleBannerImageSnapshot, this._onError, this)

      } else if (this.__articleTitle) {
        this.__articleTitle.off('value', this._loadArticleTitleSnapshot, this)
        this.__articleTitle = null

        this.__articleDatePublished.off('value', this._loadArticleDatePublishedSnapshot, this)
        this.__articleDatePublished = null

        this.__articleSummary.off('value', this._loadArticleSummarySnapshot, this)
        this.__articleSummary = null

        this.__articleBannerImage.off('value', this._loadArticleBannerImageSnapshot, this)
        this.__articleBannerImage = null
      }
    }

    _loadArticleTitleSnapshot (snapshot) {
      this.article = this.article || {}
      this.set('article.title', snapshot.val())
    }

    _loadArticleDatePublishedSnapshot (snapshot) {
      this.article = this.article || {}
      this.set('article.datePublished', snapshot.val())
    }

    _loadArticleSummarySnapshot (snapshot) {
      this.article = this.article || {}
      this.set('article.summary', snapshot.val())
    }

    _loadArticleBannerImageSnapshot (snapshot) {
      this.article = this.article || {}
      this.set('article.bannerImage', snapshot.val())
    }

    _renderDate (d) {
      var date = d;
      if (d && typeof d === 'object' && d.value) {
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