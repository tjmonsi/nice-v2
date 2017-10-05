import PolymerRedux from 'polymer-redux'
import { createStore } from 'redux'

const initial = {}

const reducer = (state, action) => (state)
const store = createStore(reducer, initial)
const Redux = PolymerRedux(store)

export { store, Redux }
