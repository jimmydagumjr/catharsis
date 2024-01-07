import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Page from "./components/PageAnimations";
import MusicPlayer from "./components/MusicPlayer";
import Navbar from "./components/Navbar";
import Music from "./pages/Music";
import Gallery from "./pages/Gallery";
import Catharsis from "./pages/Catharsis";

function App() {
  return (
    <>
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
      </Routes>
    </AnimatePresence>
  );
};

export default App;
