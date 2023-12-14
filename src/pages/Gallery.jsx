import { galleryData } from './data/galleryData.jsx';

export default function Gallery() {
   return (
      galleryData.map( photo => {
         return (
            <div className="box">
               { photo.location }
            </div>
         )
      })
   );
}