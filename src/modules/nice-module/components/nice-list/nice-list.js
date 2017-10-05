import 'polymer/polymer.html'
import '../nice-item/nice-item.js'
import ArticleList from '../article-model/article-list-model.js'
import './nice-list.html'

class NiceList extends ArticleList(Polymer.Element) {
  static get is () { return 'nice-list' }

  static get properties () {
    return {
      title: String,
      limit: {
        type: Number,
        value: -1
      }
    }
  }
}

customElements.define(NiceList.is, NiceList)