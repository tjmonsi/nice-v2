import 'polymer/polymer.html'
import Feedback from '../feedback-model/feedback-model';
import Profile from '../user-model/member-summary-model';
import './nice-feedback-item.html'

class NiceFeedbackItem extends Profile(Feedback(Polymer.Element)) {
  static get is () { return 'nice-feedback-item' }

  static get observers () {
    return [
      '_getName(feedback.uid)'
    ]
  }

  _getName (id) {
    this.memberId = id
  }

}

customElements.define(NiceFeedbackItem.is, NiceFeedbackItem)