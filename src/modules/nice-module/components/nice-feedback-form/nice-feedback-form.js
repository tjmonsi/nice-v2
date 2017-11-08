import 'polymer/polymer.html'
import 'paper-input/paper-textarea.html'
import 'paper-button/paper-button.html'
import User from '../user-model/user-model';
import './nice-feedback-form.html'

class NiceFeedbackForm extends User(Polymer.Element) {
  static get is () { return 'nice-feedback-form' }
  
  static get properties () {
    return {
      type: String,
      articleId: String
    }
  }
  
  _sendFeedback () {
    var body = this.shadowRoot.querySelector('#body').value
    // console.log(this.threadId, this.user, this.user.uid, body)
    if (this.type && this.articleId && this.user && this.user.uid && body) {
      var key = firebase.database().ref(`v2/feedback/data`).push().key
      var updates = {}

      updates[`v2/feedback/data/${key}/uid`] = this.user.uid
      updates[`v2/feedback/data/${key}/body`] = body
      updates[`v2/feedback/data/${key}/dateSent`] = firebase.database.ServerValue.TIMESTAMP
      updates[`v2/feedback/data/${key}/type`] = this.type
      updates[`v2/feedback/data/${key}/articleId`] = this.articleId

      firebase.database().ref().update(updates).then(() => {
        this.shadowRoot.querySelector('#body').value = ''
      })
      // updates[`v2/thread/query/member/${this`]
      // firebase.database().ref()
    }
  }
}

customElements.define(NiceFeedbackForm.is, NiceFeedbackForm)