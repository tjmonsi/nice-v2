import 'polymer/polymer.html'
import '../../components/nice-list/nice-list.js'
import '../../components/nice-article/nice-article.js'
import '../../components/nice-article-form/nice-article-form.js'
import '../../components/nice-dl-nav/nice-dl-nav.js'
import '../../components/nice-dl-row/nice-dl-row.js'
import Permission from '../../components/permission-model/permission-model.js'
import User from '../../components/user-model/user-model.js'
import './dl-page.html'

class DlPage extends Permission(User(Polymer.Element))  {
  static get is () { return 'dl-page' }

  static get properties () {
    return {
      params: {
        query: 'published'
      }
    }
  }

  static get observers () {
    return [
      '_checkEdit(edit)'
    ]
  }

  _checkEdit (edit) {
    return edit === 'edit'
  }
}

customElements.define(DlPage.is, DlPage)