import 'polymer/polymer.html'
import Article from '../article-model/article-summary-model.js'
import './nice-headline.html'

class NiceHeadline extends Article(Polymer.Element) {
  static get is () { return 'nice-headline' }
  
  static get properties () {
    return {
      noSummary: {
        type: Boolean,
        value: false
      }
    }
  }
  
  static get observers () {
    return [
      '_checkImage(article.bannerImage)'
    ]
  }
  
  _smallBanner (noSummary) {
    return noSummary ? 'small-banner' : '';
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

customElements.define(NiceHeadline.is, NiceHeadline)