import 'polymer/polymer.html'
import './test-page.html'

class TestPage extends Polymer.Element {
  static get is () { return 'test-page' }
}

customElements.define(TestPage.is, TestPage)