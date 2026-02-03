import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/Home';
import { LoginPage } from '@/pages/Login';
import {
  ProviderSignUpPage,
  VisitorSignUpPage,
  SignUpSuccessPage,
} from '@/pages/SignUpPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup/visitor" element={<VisitorSignUpPage />} />
        <Route path="/signup/provider" element={<ProviderSignUpPage />} />
        <Route path="/signup/success" element={<SignUpSuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
