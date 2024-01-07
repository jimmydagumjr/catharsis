import { useState, useEffect } from "react"
import GalleryCSS from "./../assets/css/Gallery.module.css"
import { galleryData } from './data/galleryData.jsx'
import { motion } from "framer-motion"

const Gallery = () => {
   return (
      <div className={GalleryCSS.photoBody}>
         <div className={GalleryCSS.photoContainer}>
            <GalleryCardMap />
         </div>
      </div>
   )
}

const GalleryCardMap = () => {
   return galleryData.map((photo) => {
      // time formatting
      const formattedTime = formatTime(photo.time, isSmallScreen());

      return <GalleryCard
         key={photo.src}
         photo={photo}
         formattedTime={formattedTime}
      />
   }
   )
}

const cardVariants = {
   hidden: {
      opacity: 0,
      y: 100
   },
   visible: {
      opacity: 1,
      y: 0
   }
}

const GalleryCard = ({ photo, formattedTime }) => {
   return (
      <motion.div
         className={GalleryCSS.card}
         variants={cardVariants}
         initial="hidden"
         whileInView="visible"
         viewport={{
            once: true
         }}
         transition={{
            type: "tween",
            ease: "easeOut",
            duration: 0.3,
         }}
      >
         <div className={GalleryCSS.card__imgContainer}>
            <img
               className={GalleryCSS.card__img}
               src={photo.src}
               loading="lazy"
            />
         </div>
         <div className={GalleryCSS.card__details}>
            <div className={GalleryCSS.card__wrapper}>
               <div className={GalleryCSS.card__locationContainer}>
                  <h2 className={GalleryCSS.card__location}>
                     {photo.location}
                  </h2>
               </div>
               <p className={GalleryCSS.card__time}>
                  {formattedTime}
               </p>
            </div>
         </div>
      </motion.div>
   )
}

const useWindowSize = () => {
   const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
   })

   useEffect(() => {
      const handleResize = debounce(() => {
         setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
         });
      }, 300)

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, [])

   return windowSize;
}

const debounce = (func, delay) => {
   let timer;
   return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
         func.apply(this, arguments);
      }, delay);
   }
}

const getWindowWidth = () => {
   return useWindowSize().width;
}

const isSmallScreen = () => {
   const width = getWindowWidth();
   return width <= 768;
}

const formatTime = (time, isSmallScreen) => {
   if (isSmallScreen) {
      return time.toLocaleDateString(undefined, {
         year: "numeric",
         month: "numeric",
         day: "numeric"
      })
   } else {
      return time.toLocaleDateString(undefined, {
         year: "numeric",
         month: "long",
         day: "numeric"
      })
   }
}

export default Gallery