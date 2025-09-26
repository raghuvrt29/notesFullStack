import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage, SignupPage } from './components/auth'
import { HomePage } from './components/home'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/notes" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
