import GalleryCSS from "./../assets/css/Gallery.module.css"
import { galleryData } from './data/galleryData.jsx'
import { motion } from "framer-motion"

const cardVariants = {
   hidden: {
      opacity: 0,
      y: 100
   },
   visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
         delay: 0.00 * index
      }
   }),
}

export default function Gallery() {
   return (
      <div className={GalleryCSS.photo_body}>
         <div className={GalleryCSS.photo_container}>
            <GalleryCardMap />
         </div>
      </div>
   );
}

const GalleryCardMap = () => {
   return galleryData.map((photo, index) => {
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

const GalleryCard = ({ photo, formattedTime, index }) => {
   return (
      <motion.div
         className={GalleryCSS.card}
         variants={cardVariants}
         initial="hidden"
         whileInView="visible"
         exit={{ opacity: 0, y: 100 }}
         viewport={{
            once: true
         }}
         custom={index}
         transition={{
            type: "spring",
            damping: 3,
            stiffness: 50,
            restDelta: 0.001
         }}
      >
         <div className={GalleryCSS.card__img_container}>
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