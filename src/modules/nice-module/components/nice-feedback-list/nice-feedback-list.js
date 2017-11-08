import 'polymer/polymer.html'
import '../nice-feedback-item/nice-feedback-item.js';
import FeedbackList from '../feedback-model/feedback-list-model';
import './nice-feedback-list.html'

class NiceFeedbackList extends FeedbackList(Polymer.Element) {
  static get is () { return 'nice-feedback-list' }
}

customElements.define(NiceFeedbackList.is, NiceFeedbackList)