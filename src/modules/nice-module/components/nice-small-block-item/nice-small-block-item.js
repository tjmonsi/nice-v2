import 'polymer/polymer.html'
import Article from '../article-model/article-summary-model.js'
import './nice-small-item.html'

class NiceSmallItem extends Article(Polymer.Element) {
  static get is () { return 'nice-small-item' }
  
  static get observers () {
    return [
      '_checkImage(article.bannerImage)'
    ]
  }
  
  _checkImage (image) {
    // console.log(image)
    if (!image) {
      this.style.height = 'auto';
    } else {
      this.style.height = null;
    }
  }
}

customElements.define(NiceSmallItem.is, NiceSmallItem)