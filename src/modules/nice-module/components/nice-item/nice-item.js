import 'polymer/polymer.html'
import Article from '../article-model/article-model.js'
import './nice-item.html'

class NiceItem extends Article(Polymer.Element) {
  static get is () { return 'nice-item' }
}

customElements.define(NiceItem.is, NiceItem)