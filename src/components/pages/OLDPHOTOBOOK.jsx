import { useEffect } from "react";

export default function Photobook() {
   return retrievePhoto();
}

function PhotoElement({name, location, time, src}) {
   return (
      <div class="card">
         <div class="card__img-container">
            <img class="card__img" src={src}/>
         </div>
         <div class="card__details">
            <h2 class="card__location">{location}</h2>
            <p class="card__time">{time}</p>
         </div>
      </div>
   );
}

function retrievePhoto() {
   const [data, setData] = useState(null);
   useEffect(() => {
      fetch(
         `https://gist.githubusercontent.com/jimmydagumjr/d8a8d9ac21c965d286296122d443dd86/raw/cfa19f9e12094eee194d40cc151c2bc367fa992e/photobook.JSON`
      )
         .then((response) => response.json())
         .then(setData);
   }, []);
   if (data)
      return (
         <PhotoElement 
            location={data.location}
            time={data.time}
            src={data.src}
         />
      );
}