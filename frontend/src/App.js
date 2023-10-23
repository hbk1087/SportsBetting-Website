import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from "./store"
import Home from './pages/Home'
import Navbar from "./components/Navbar"

function App() {
  return (
    <Provider store={store}>
        <div className="App">
            <Router>
                <Navbar />
                <div className="pages">
                <Routes>
                    <Route
                    path='/'
                    element={<Home />}
                    />

                </Routes>
                </div>
            </Router>
        </div>
    </Provider>
    
  );
}

export default App
