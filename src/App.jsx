import Navbar from "./components/Navbar"
import Music from "./pages/Music"
import Gallery from "./pages/Gallery"
import Cathartic from "./pages/Cathartic"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import Page from "./components/PageAnimations"
import MusicPlayer from "./components/MusicPlayer"

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // redirect to /music on initial load
  useEffect(() => {
    if (location.pathname !== "/music") {
      navigate("/music");
    }
  }, []);

  return <>
    <Navbar />
    <RoutesWithAnimation />
    <MusicPlayer />
  </>

}

const RoutesWithAnimation = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.key}>
        <Route path="/music" element={<Page pageKey="music"><Music /></Page>} />
        <Route path="/gallery" element={<Page pageKey="gallery"><Gallery /></Page>} />
        <Route path="/" element={<Page pageKey="cathartic"><Cathartic /></Page>} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
