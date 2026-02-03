<<<<<<< HEAD
function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <h1 className="text-5xl font-black text-blue-600 tracking-tighter">
        토독
      </h1>
    </main>
  )
=======
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
>>>>>>> 2649ad8 ([#6] Feat: 회원가입 성공 페이지 구현 및 홈 라우팅 연동)
}

export default App
