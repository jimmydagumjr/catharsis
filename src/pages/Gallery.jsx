import { galleryData } from './data/galleryData.jsx';

export default function Gallery() {
   return (
      galleryData.map( photo => {
         const formattedTime = photo.time.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric"
         })
         return (
            <div className="card">
               <div className="card__img-container">
                  <img className="card__img" src={ photo.src } />
               </div>
               <div class="card__details">
                  <h2 class="card__location">{ photo.location }</h2>
                  <p class="card__time">{ formattedTime }</p>
               </div>
            </div>
         )
      })
   );
}