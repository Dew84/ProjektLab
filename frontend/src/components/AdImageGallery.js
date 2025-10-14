import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './AdImageGallery.css'; 

const API_URL = process.env.REACT_APP_API_URL; 
const BASE_URL = API_URL.replace(/\/api$/, '');

export default function AdImageGallery({ images, adId }) {
  if (!images || images.length === 0) {
    return <p>Ehhez a hirdetéshez nincs kép.</p>;
  }

  const items = images.map((img) => ({
    original: `${BASE_URL}/images/${adId}/${img.fileName}`,
    thumbnail: `${BASE_URL}/images/${adId}/${img.fileName}`,
    originalAlt: '',
    thumbnailAlt: '',
  }));

  return (
    <div className="ad-gallery-wrapper">
      <ImageGallery
        items={items}
        showPlayButton={false}
        showFullscreenButton={true}
        showNav={true}
        lazyLoad={true}
        slideInterval={3000}
        showThumbnails={true}
      />
    </div>
  );
}
