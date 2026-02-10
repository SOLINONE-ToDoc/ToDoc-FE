import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProviderBootstrap } from './provider/ProviderBootstrap';
import {
  AppLayout,
  ExploreLayout,
  ExploreWithLayout,
} from './layouts';
import { Footer } from '@/widgets/Footer';
import { HomePage } from '@/pages/Home';
import { LoginPage } from '@/pages/Login';
import {
  ProviderSignUpPage,
  VisitorSignUpPage,
  SignUpSuccessPage,
} from '@/pages/SignUp';
import { MapPage } from '@/pages/Map';
import {
  DashboardPage,
  DashboardWritePage,
} from '@/pages/Dashboard';
import { MyPage } from '@/pages/My/MyPage';

function App() {
  return (
    <Router>
      <ProviderBootstrap>
        <main className="flex-1">
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup/visitor" element={<VisitorSignUpPage />} />
              <Route path="/signup/provider" element={<ProviderSignUpPage />} />
              <Route path="/signup/success" element={<SignUpSuccessPage />} />
            </Route>

            <Route element={<ExploreLayout />}>
              <Route path="/map" element={<MapPage />} />
              <Route path="/my" element={<MyPage />} />
            </Route>

            <Route element={<ExploreWithLayout />}>
              <Route path="/place/:placeId" element={<DashboardPage />} />
            </Route>

              <Route path="/place/:placeId/write" element={<DashboardWritePage />} />

          </Routes>
        </main>
      </ProviderBootstrap>
      <Footer />
    </Router>
  );
}

export default App;
