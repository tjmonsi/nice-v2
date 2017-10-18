import 'polymer/polymer.html'
import 'marked-element/marked-element.html'
import '../nice-image/nice-image.js';
import '../nice-file/nice-file.js';
import marked from 'marked'
import Article from '../article-model/article-model.js'
import User from '../user-model/user-model.js'
import Permission from '../permission-model/permission-model.js'
import './nice-article.html'

window.marked = window.marked || marked

class NiceArticle extends Permission(User(Article(Polymer.Element))) {
  static get is () { return 'nice-article' }

  static get properties () {
    return {
      article: {
        type: Object
      }
    }
  }
}

customElements.define(NiceArticle.is, NiceArticle)