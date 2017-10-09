import 'polymer/polymer.html'
import 'paper-button/paper-button.html'
import '../nice-message-list/nice-message-list.js';
import '../nice-message-form/nice-message-form.js';
import User from '../user-model/user-model';
import Profile from '../user-model/member-summary-model';
import Thread from '../thread-model/thread-model.js';
import './nice-thread.html'

class NiceThread extends Profile(User(Thread(Polymer.Element))) {
  static get is () { return 'nice-thread' }

  static get observers () {
    return [
      '_getName(user.uid, thread)'
    ]
  }

  _getName (id) {
    if (this.thread) {

      for (var i in this.thread.members) {
        if (id !== i) {

          this.memberId = i;
        }
      }
    }

  }
}

customElements.define(NiceThread.is, NiceThread)