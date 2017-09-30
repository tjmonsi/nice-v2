import 'polymer/polymer.html'
import '../../components/nice-list/nice-list.js'
import '../../components/nice-article/nice-article.js'
import '../../components/nice-article-form/nice-article-form.js'
import '../../components/nice-about-nav/nice-about-nav.js'
import Permission from '../../components/permission-model/permission-model.js'
import User from '../../components/user-model/user-model.js'
import './about-page.html'

class AboutPage extends Permission(User(Polymer.Element))  {
  static get is () { return 'about-page' }

  static get observers () {
    return [
      '_checkEdit(edit)'
    ]
  }

  _checkEdit (edit) {
    return edit === 'edit'
  }
}

customElements.define(AboutPage.is, AboutPage)