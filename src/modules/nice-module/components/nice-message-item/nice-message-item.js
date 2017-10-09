import 'polymer/polymer.html'
import Message from '../message-model/message-model';
import User from '../user-model/user-model';
import Profile from '../user-model/member-summary-model';
import './nice-message-item.html'

class NiceMessageItem extends Profile(User(Message(Polymer.Element))) {
  static get is () { return 'nice-message-item' }

  static get observers () {
    return [
      '_getName(message.uid)'
    ]
  }

  _getName (id) {
    console.log(id)
    this.memberId = id
  }

  _isEqual(uid, messageUid) {
    return uid === messageUid
  }
}

customElements.define(NiceMessageItem.is, NiceMessageItem)