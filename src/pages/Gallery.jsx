import GalleryCSS from "./../assets/css/Gallery.module.css"
import { galleryData } from './data/galleryData.jsx'

export default function Gallery() {
   return (
      <div className={GalleryCSS.photo_body}>
         <div className={GalleryCSS.photo_container}>
            <>{
               galleryData.map(photo => {
                  // time formatting
                  const formattedTime = photo.time.toLocaleDateString(undefined, {
                     year: "numeric",
                     month: "long",
                     day: "numeric"
                  })
                  // card output
                  return (
                     <div className={GalleryCSS.photo_body}>
                        <div className={GalleryCSS.photo_container}>

                           <div className={GalleryCSS.card}>
                              <div className={GalleryCSS.card__img_container}>
                                 <img className={GalleryCSS.card__img} src={photo.src} />
                              </div>
                              <div className={GalleryCSS.card__details}>
                                 <h2 className={GalleryCSS.card__location}>{photo.location}</h2>
                                 <p className={GalleryCSS.card__time}>{formattedTime}</p>
                              </div>
                           </div>

                        </div>
                     </div>
                  )
               })
            }</>
         </div>
      </div>
   );
}