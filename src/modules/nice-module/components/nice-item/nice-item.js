import 'polymer/polymer.html'
import Article from '../article-model/article-summary-model.js'
import './nice-item.html'

class NiceItem extends Article(Polymer.Element) {
  static get is () { return 'nice-item' }
  
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

customElements.define(NiceItem.is, NiceItem)