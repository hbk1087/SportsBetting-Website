// index.js (STORE)
import { configureStore } from 'redux'
import CountReducer from './reducers/count.reducer'

export default configureStore(CountReducer)