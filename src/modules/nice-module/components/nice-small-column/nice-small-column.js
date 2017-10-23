import 'polymer/polymer.html'
import '../nice-headline/nice-headline.js'
import '../nice-small-item/nice-small-item.js'
import ArticleList from '../article-model/article-list-model.js'
import './nice-small-column.html'

class NiceSmallColumn extends ArticleList(Polymer.Element) {
  static get is () { return 'nice-small-column' }

  static get properties () {
    return {
      title: {
        type: String
      }
    }
  }
  
  isEqual (a, b) {
    return a === b
  }
}

customElements.define(NiceSmallColumn.is, NiceSmallColumn)