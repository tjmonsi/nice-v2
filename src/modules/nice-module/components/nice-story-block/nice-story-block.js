import 'polymer/polymer.html'
import '../nice-headline/nice-headline.js'
import ArticleList from '../article-model/article-list-model.js'
import './nice-story-block.html'

class NiceStoryBlock extends ArticleList(Polymer.Element) {
  static get is () { return 'nice-story-block' }

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

customElements.define(NiceStoryBlock.is, NiceStoryBlock)