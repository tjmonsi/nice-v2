import 'polymer/polymer.html'
import '../../components/nice-community-nav/nice-community-nav.js'
import './thread-page.html'

class ThreadPage extends Polymer.Element {
  static get is () { return 'thread-page' }
}

customElements.define(ThreadPage.is, ThreadPage)