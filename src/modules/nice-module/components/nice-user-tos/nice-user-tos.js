import 'polymer/polymer.html'
import 'marked-element/marked-element.html'
import marked from 'marked'
import User from '../user-model/user-model.js';
import './nice-user-tos.html'
window.marked = window.marked || marked;
class NiceUserTos extends User(Polymer.Element) {
  static get is () { return 'nice-user-tos' }

  open () {
    this.shadowRoot.querySelector('paper-dialog').open()
  }

  cancel () {
    this.shadowRoot.querySelector('paper-dialog').close()
  }

  accept () {
    firebase.database().ref(`v2/user/data/${this.user.uid}/agree`).set(true).then(() => {
      this.cancel()
    })

  }
}

customElements.define(NiceUserTos.is, NiceUserTos)