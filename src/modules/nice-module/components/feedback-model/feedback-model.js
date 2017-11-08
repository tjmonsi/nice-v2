export default (superClass) => {
  return class extends superClass {

    static get properties () {
      return {
        feedback: {
          type: Object
        },
        feedbackId: {
          type: String
        }
      }
    }

    static get observers () {
      return [
        '_loadFeedback(feedbackId)'
      ]
    }

    disconnectedCallback () {
      super.disconnectedCallback()
      if (this.__feedback) {
        this.__feedback.off('value', this._loadFeedbackSnapshot, this)
      }
    }

    _loadFeedback (id) {
      if (id) {
        this.__feedback = firebase.database().ref(`v2/feedback/data/${id}`)
        this.__feedback.on('value', this._loadFeedbackSnapshot, this._onError, this)
      } else if (this.__feedback) {
        this.__feedback.off('value', this._loadFeedbackSnapshot, this)
        this.__feedback = null
      }
    }

    _loadFeedbackSnapshot (snapshot) {
      
      this.feedback = snapshot.val()
      console.log(this.feedback)
    }

    _renderDate (d) {
      var date = d;
      if (typeof d === 'object' && d.value) {
        date = d.value;
      }
      var nd = new Date(date);
      return nd.toLocaleDateString() + ' - ' + nd.toLocaleTimeString();
    }

    _onError (error) {
      console.log(error)
    }

  }
}