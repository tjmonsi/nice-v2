import 'polymer/polymer.html'
import '../../components/nice-footer/nice-footer.js'
import '../../components/nice-dashboard-nav/nice-dashboard-nav.js'
import '../../components/nice-list/nice-list.js'
import './dashboard-cbe-recommends-page.html'

class DashboardPage extends Polymer.Element {
  static get is () { return 'dashboard-cbe-recommends-page' }
}

customElements.define(DashboardPage.is, DashboardPage)