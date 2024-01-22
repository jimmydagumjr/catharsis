import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Page from "./components/PageAnimations";
import MusicPlayer from "./components/MusicPlayer";
import Navbar from "./components/Navbar";
import Music from "./pages/Music";
import Gallery from "./pages/Gallery";
import Catharsis from "./pages/Catharsis";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import ResetPassword from "./pages/ResetPassword";
import SessionChecker from "./components/SessionChecker";

function App() {
  return (
    <>
      <SessionChecker />
      <Navbar />
      <RoutesWithAnimation />
      <MusicPlayer />
    </>
  );
}

const RoutesWithAnimation = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.key}>
        <Route
          path="/music"
          element={
            <Page pageKey="music">
              <Music />
            </Page>
          }
        />
        <Route
          path="/gallery"
          element={
            <Page pageKey="gallery">
              <Gallery />
            </Page>
          }
        />
        <Route
          path="/"
          element={
            <Page pageKey="catharsis">
              <Catharsis />
            </Page>
          }
        />
        <Route
          path="/admin"
          element={
            <Page pageKey="admin">
              <Admin />
            </Page>
          }
        />
        <Route
          path="/upload"
          element={
            <Page pageKey="upload">
              <Upload />
            </Page>
          }
        />
        <Route
          path="/login"
          element={
            <Page pageKey="login">
              <Login />
            </Page>
          }
        />
        <Route
          path="/reset-password"
          element={
            <Page pageKey="resetPassword">
              <ResetPassword />
            </Page>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
