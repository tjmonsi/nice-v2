import 'polymer/polymer.html'
import './not-authorized-page.html'

class NotAuthorizedPage extends Polymer.Element {
  static get is () { return 'not-authorized-page' }
}

customElements.define(NotAuthorizedPage.is, NotAuthorizedPage)