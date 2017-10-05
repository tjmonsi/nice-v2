import 'polymer/polymer.html'
import '../../components/nice-community-nav/nice-community-nav.js'
import '../../components/nice-user-list/nice-user-list.js'
import '../../components/nice-user/nice-user.js'
import './community-page.html'

class CommunityPage extends Polymer.Element {
  static get is () { return 'community-page' }

  _checkEdit (edit) {
    return edit === 'edit'
  }
}

customElements.define(CommunityPage.is, CommunityPage)