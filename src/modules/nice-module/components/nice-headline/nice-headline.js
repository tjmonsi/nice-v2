import 'polymer/polymer.html'
import Article from '../article-model/article-model.js'
import './nice-headline.html'

class NiceHeadline extends Article(Polymer.Element) {
  static get is () { return 'nice-headline' }
}

customElements.define(NiceHeadline.is, NiceHeadline)