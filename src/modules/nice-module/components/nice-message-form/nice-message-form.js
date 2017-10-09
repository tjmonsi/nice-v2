import 'polymer/polymer.html'
import 'paper-input/paper-textarea.html'
import 'paper-button/paper-button.html'
import User from '../user-model/user-model';
import Thread from '../thread-model/thread-model.js';
import './nice-message-form.html'

class NiceMessageForm extends User(Thread(Polymer.Element)) {
  static get is () { return 'nice-message-form' }
}

customElements.define(NiceMessageForm.is, NiceMessageForm)