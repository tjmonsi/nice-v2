import 'polymer/polymer.html'
import 'paper-button/paper-button.html'
import User from '../user-model/user-model';
import Profile from '../user-model/member-summary-model';
import Thread from '../thread-model/thread-model.js';
import './nice-thread-item.html'

class NiceThreadItem extends Profile(User(Thread(Polymer.Element))) {
  static get is () { return 'nice-thread-item' }

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

customElements.define(NiceThreadItem.is, NiceThreadItem)