import 'polymer/polymer.html'
import '../nice-message-item/nice-message-item';
import MessageList from '../message-model/message-list-model';
import './nice-message-list.html'

class NiceMessageList extends MessageList(Polymer.Element) {
  static get is () { return 'nice-message-list' }
}

customElements.define(NiceMessageList.is, NiceMessageList)