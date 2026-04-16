import { useBranch } from '../index';
import './styleOfRoom.css'
import React, { useRef } from 'react';

const BranchGallery = ({setSrcImage,images}) => {
    const trackRef = useRef(null);
    const viewportRef = useRef(null);
    const {currentScroll,setCurrentScroll} = useBranch()

    const scrollGallery = (direction) => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
  
      if (!track || !viewport) return;
  
      // Tính toán chiều rộng của một item (bao gồm gap)
      const firstItem = track.querySelector('.gallery-item');
      const itemWidth = firstItem ? firstItem.offsetWidth + 15 : 0;
      const maxScroll = track.scrollWidth - viewport.offsetWidth;
  
      let newScroll = currentScroll - (direction * itemWidth);
  
      // Giới hạn biên
      if (newScroll < 0) newScroll = 0;
      if (newScroll > maxScroll) newScroll = maxScroll;
  
      setCurrentScroll(newScroll);
    };
  
    const openImage = (src) => {
        setSrcImage(src)
    };
  
    return (
      <div className="branch-gallery-container">
        <button className="nav-btn prev" onClick={() => scrollGallery(-1)}>&#10094;</button>
        
        <div className="gallery-viewport" ref={viewportRef}>
          <div className="gallery-track" ref={trackRef} style={{ transform: `translateX(-${currentScroll}px)`, transition: 'transform 0.3s ease' }}>
                {
                    images.map((img, index) => (
                        <div key={index} className="gallery-item">
                            <img src={img?.url || img.imageUrl} alt={"anh "+index} onClick={() => openImage(img?.url || img.imageUrl)}  />
                        </div>
                    ))
                }
          </div>
        </div>
  
        <button className="nav-btn next" onClick={() => scrollGallery(1)}>&#10095;</button>
      </div>
    );
}
export default BranchGallery