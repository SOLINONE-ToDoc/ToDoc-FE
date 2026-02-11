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
import { MyPage } from '@/pages/My/MyPage';
import {
  PlaceAddPage,
  PlacePage,
  BoardCreatePage,
  BoardWritePage,
  BoardWriteLoadingPage,
  BoardWriteFont,
  BoardWriteSuccessPage,
} from '@/pages/Place';

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

              <Route path="/place/add" element={<PlaceAddPage />} />
            </Route>

            <Route element={<ExploreLayout />}>
              <Route path="/map" element={<MapPage />} />
              <Route path="/my" element={<MyPage />} />
            </Route>

            <Route element={<ExploreWithLayout />}>
              <Route path="/place/:placeId" element={<PlacePage />} />
            </Route>

            <Route path="/place/:placeId/create" element={<BoardCreatePage />} />
            <Route path="/place/:placeId/write" element={<BoardWritePage />} />
            <Route path="/place/:placeId/write/loading" element={<BoardWriteLoadingPage />} />
            <Route path="/place/:placeId/write/font" element={<BoardWriteFont />} />
            <Route path="/place/:placeId/write/success" element={<BoardWriteSuccessPage />} />

          </Routes>
        </main>
      </ProviderBootstrap>
      <Footer />
    </Router>
  );
}

export default App;
