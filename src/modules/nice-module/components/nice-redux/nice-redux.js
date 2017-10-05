import { store, Redux } from '../../../../../core/shell/state.js'
import { combineReducers } from 'redux'
import navList from './nav-list.js'

const reducer = (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_PROFILE':
      return Object.assign({}, state, {
        profile: action.profile
      })
    case 'UPDATE_PERMISSION':
      return Object.assign({}, state, {
        permission: action.permission
      })
    case 'UPDATE_USER':
      return Object.assign({}, state, {
        user: action.user
      })
    case 'UPDATE_NAVLIST':
    return Object.assign({}, state, {
      navList: action.navList
    })
    default:
      return state
  }
}

store.replaceReducer(combineReducers({main: reducer}))
store.dispatch({
  type: 'UPDATE_NAVLIST',
  navList
})

export default Redux
export { store }