import 'polymer/polymer.html'
import 'marked-element/marked-element.html'
import '../nice-image/nice-image.js';
import '../nice-file/nice-file.js';
import '../nice-feedback-form/nice-feedback-form.js'
import '../nice-feedback-list/nice-feedback-list.js'
import '../nice-icon/nice-icon.html'
import 'paper-icon-button/paper-icon-button.html'
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
      },
      emailAddress: {
        type: String,
        value: ''
      },
      emailSubject: {
        type: String,
        value: ''
      },
    }
  }
  
  static get observers () {
    return [
      '_setTitle(article.title)',
      '_setBody(article.body)'
    ]
  }
  
  _setBody (body) {
    if (body) {
      Polymer.RenderStatus.afterNextRender(this, () => {
        const markdown = this.shadowRoot.querySelectorAll('[slot=markdown-html]')
        if (markdown) {
          markdown.forEach((item) => {
            item.querySelectorAll('*').forEach((node) => {
              node.classList.add(this.nodeName.toLowerCase())
            })
            item.querySelectorAll('a').forEach((node) => {
              node.setAttribute('target', '_blank');
            })
          })
        }
      })
    }
  }
  
  _sendEmail () {
    this.shadowRoot.querySelector('#email-dialog').open();
  }
  
  _tapSendEmail (e) {
    this.emailAddress = this.$$('#email').value;
    if (!this.emailAddress) {
      this.shadowRoot.querySelector('#email').errorMessage = 'Please put the email you want to send to';
      this.shadowRoot.querySelector('#email').inputElement.focus();
      e.preventDefault();
      e.stopPropagation();
      return this.shadowRoot.querySelector('#email').invalid = true;
    }
    this.emailSubject = encodeURI('Project NICE: ' + this.article.title);
    // console.log(this.emailSubject)
    this._closeSendEmail();
  }
  
  _closeSendEmail () {
    this.shadowRoot.querySelector('#email-dialog').close();
  }
  
  _textToUrl (text) {
    return encodeURI(text);
  }
  
  _thisUrl () {
    return window.location.href;
  }
  
  _setTitle (title) {
    document.title = `Project NICE | ${title}`
  }
}

customElements.define(NiceArticle.is, NiceArticle)