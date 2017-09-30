import 'polymer/polymer.html'
import './nice-about-nav-item.html'

class NiceAboutNavItem extends Polymer.Element {
  static get is () { return 'nice-about-nav-item' }

  static get properties () {
    return {
      title: {
        type: Object
      },
      articleId: {
        type: String
      }
    }
  }

  static get observers () {
    return [
      '_loadArticle(articleId)'
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

  _loadArticle (id) {
    var type = 'about'
    if (id) {
      this.__article = firebase.database().ref(`v2/${type}/data/${id}/title`)
      this.__article.on('value', this._loadArticleSnapshot, this._onError, this)
    } else if (this.__article) {
      this.__article.off('value', this._loadArticleSnapshot, this)
      this.__article = null
    }
  }

  _loadArticleSnapshot (snapshot) {
    this.title = snapshot.val()
  }

  _onError (error) {
    console.log(error)
  }
}

customElements.define(NiceAboutNavItem.is, NiceAboutNavItem)