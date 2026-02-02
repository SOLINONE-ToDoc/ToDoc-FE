import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from '@/pages/Login';
import { ProviderSignUpPage, VisitorSignUpPage } from '@/pages/SignUpPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup/visitor" element={<VisitorSignUpPage />} />
        <Route path="/signup/provider" element={<ProviderSignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
