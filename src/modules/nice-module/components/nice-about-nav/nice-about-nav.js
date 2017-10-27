import 'polymer/polymer.html'
import '../nice-about-nav-item/nice-about-nav-item.js'
import ArticleList from '../article-model/article-list-model.js'
import './nice-about-nav.html'

class NiceAboutNav extends ArticleList(Polymer.Element) {
  static get is () { return 'nice-about-nav' }

  static get properties () {
    return {
      type: {
        type: String,
        value: 'about'
      },
      limit: {
        type: Number,
        value: -1
      }
    }
  }
  
  isEqual (a, b) {
    return a === b
  }
}

customElements.define(NiceAboutNav.is, NiceAboutNav)