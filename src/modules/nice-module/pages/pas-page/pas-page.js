import 'polymer/polymer.html'
import '../../components/nice-list/nice-list.js'
import '../../components/nice-article/nice-article.js'
import '../../components/nice-article-form/nice-article-form.js'
import '../../components/nice-pas-nav/nice-pas-nav.js'
import Permission from '../../components/permission-model/permission-model.js'
import User from '../../components/user-model/user-model.js'
import './pas-page.html'

class PasPage extends Permission(User(Polymer.Element))  {
  static get is () { return 'pas-page' }

  static get observers () {
    return [
      '_checkEdit(edit)'
    ]
  }

  _checkEdit (edit) {
    return edit === 'edit'
  }
}

customElements.define(PasPage.is, PasPage)