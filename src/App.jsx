import Navbar from "./components/Navbar"
import Music from "./pages/Music"
import Gallery from "./pages/Gallery"
import Cathartic from "./pages/Cathartic"
import { Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Page from "./components/PageAnimations"

function App() {

  return <>
    <Navbar />
    <RoutesWithAnimation />
  </>

}

const RoutesWithAnimation = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.key}>
        <Route path="/music" element={<Page pageKey="music"><Music /></Page>} />
        <Route path="/gallery" element={<Page pageKey="gallery"><Gallery /></Page>} />
        <Route path="/cathartic" element={<Page pageKey="cathartic"><Cathartic /></Page>} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
