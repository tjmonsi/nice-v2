import 'polymer/polymer.html'
import '../../components/nice-footer/nice-footer.js'
import '../../components/nice-dashboard-row/nice-dashboard-row.js'
import '../../components/nice-list/nice-list.js'
import './dashboard-page.html'

class DashboardPage extends Polymer.Element {
  static get is () { return 'dashboard-page' }
}

customElements.define(DashboardPage.is, DashboardPage)