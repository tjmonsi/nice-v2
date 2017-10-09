import 'polymer/polymer.html'
import '../../components/nice-footer/nice-footer.js'
import '../../components/nice-list/nice-list.js'
import '../../components/nice-article/nice-article.js'
import '../../components/nice-article-form/nice-article-form.js'
import Permission from '../../components/permission-model/permission-model.js'
import User from '../../components/user-model/user-model.js'
import './story-page.html'

class StoryPage extends Permission(User(Polymer.Element))  {
  static get is () { return 'story-page' }

  static get observers () {
    return [
      '_checkEdit(edit)'
    ]
  }

  _checkEdit (edit) {
    return edit === 'edit'
  }
}

customElements.define(StoryPage.is, StoryPage)