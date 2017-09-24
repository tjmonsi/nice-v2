import 'polymer/polymer.html'
import './not-found-page.html'

class NotFoundPage extends Polymer.Element {
  static get is () { return 'not-found-page' }
}

customElements.define(NotFoundPage.is, NotFoundPage)