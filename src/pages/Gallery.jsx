import GalleryCSS from "./../assets/css/Gallery.module.css"
import { galleryData } from './data/galleryData.jsx'
import { motion } from "framer-motion"

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
      const formattedTime = photo.time.toLocaleDateString(undefined, {
         year: "numeric",
         month: "long",
         day: "numeric"
      })
      return <GalleryCard
         key={photo.src}
         photo={photo}
         formattedTime={formattedTime}
      />
   }
   )
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
            type: "spring",
            mass: 0.1,
            damping: 1,
            stiffness: 5,
            restDelta: 0.001
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
            <h2 className={GalleryCSS.card__location}>{photo.location}</h2>
            <p className={GalleryCSS.card__time}>{formattedTime}</p>
         </div>
      </motion.div>
   )
}

export default Gallery