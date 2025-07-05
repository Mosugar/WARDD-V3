import style from "@/styles/artists.module.css";
import Image from "next/image";
import { useState, useRef } from "react";

const Artists = () => {
  const [currentIndex, setCurrentIndex] = useState(4); // Start in the middle
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const sliderRef = useRef(null);

  const artists = [
    { id: "1", name: "ARTIST 1", genre: "Hip Hop" },
    { id: "2", name: "ARTIST 2", genre: "Pop" },
    { id: "3", name: "ARTIST 3", genre: "Electronic" },
    { id: "4", name: "ARTIST 4", genre: "R&B" },
    { id: "5", name: "ARTIST 5", genre: "Rock" },
    { id: "6", name: "ARTIST 6", genre: "Indie" },
    { id: "7", name: "ARTIST 7", genre: "Jazz" },
    { id: "8", name: "ARTIST 8", genre: "Trap" },
    { id: "9", name: "ARTIST 9", genre: "Soul" },
    { id: "18", name: "ARTIST 10", genre: "Afro" },
    { id: "11", name: "ARTIST 11", genre: "Afro" },
    { id: "12", name: "ARTIST 11", genre: "Afro" },
    { id: "13", name: "ARTIST 11", genre: "Afro" },
    { id: "14", name: "ARTIST 11", genre: "rap" },
    { id: "15", name: "ARTIST 11", genre: "Afro" },
    { id: "16", name: "ARTIST 11", genre: "Afro" },
    { id: "17", name: "ARTIST 11", genre: "Afro" },
    
    { id: "19", name: "ARTIST 11", genre: "Afro" },
    

  ];

  const getImageStyle = (index) => {
    const distance = index - currentIndex;
    const absDistance = Math.abs(distance);

    let transform = `translateX(${distance * 160}px)`;
    let scale = 1;
    let opacity = 1;
    let zIndex = 10;

    if (absDistance === 0) {
      scale = 1.6;
      zIndex = 30;
    } else if (absDistance === 1) {
      scale = 1;
      zIndex = 20;
    } else if (absDistance === 2) {
      scale = 0.9;
      zIndex = 15;
    } else if (absDistance === 3) {
      scale = 0.8;
      zIndex = 10;
    } else {
      scale = 0.7;
      opacity = 0.5;
      zIndex = 5;
    }

    return {
      transform: `${transform} scale(${scale})`,
      opacity,
      zIndex,
    };
  };

  const handleDragStart = (x) => {
    setIsDragging(true);
    setStartX(x);
    setCurrentTranslate(0);
  };

  const handleDragMove = (x) => {
    if (!isDragging) return;
    setCurrentTranslate(x - startX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const threshold = 100;
    if (Math.abs(currentTranslate) > threshold) {
      if (currentTranslate > 0) {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      } else {
        setCurrentIndex((prev) => Math.min(artists.length - 1, prev + 1));
      }
    }
    setCurrentTranslate(0);
  };

  const visibleRange = 4; // 4 left, 1 center, 4 right

  const progress = (currentIndex / (artists.length - 1)) * 100;

  return (
    <div className={style.content} id="artists">
      <div className={style.container}>
        <div className={style.heading}>
          <h1>ARTISTS</h1>
        </div>

        <div
          className={style.artistsSlider}
          ref={sliderRef}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
        >
          <div className={style.artistsTrack}>
            {artists.map((artist, index) => {
              if (Math.abs(index - currentIndex) > visibleRange) return null;
              return (
                <div
                  key={artist.id + index}
                  className={style.artistCard}
                  style={{
                    ...getImageStyle(index),
                    transform: `${getImageStyle(index).transform} translateX(${isDragging ? currentTranslate * 0.3 : 0}px)`,
                    transition: isDragging ? 'none' : 'all 0.5s ease',
                  }}
                >
                  <div className={style.imageContainer}>
                    <Image
                      src={`/art/${artist.id}.JPG`}
                      alt={artist.name}
                      width={300}
                      height={300}
                      className={style.artistImage}
                      draggable={false}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={style.progressContainer}>
          <div className={style.progressBar}>
            <div className={style.progressFill} style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className={style.subtitle}>
          <p>Those, who bring art to people</p>
          <p>with both open eyes and open ears</p>
        </div>
      </div>
    </div>
  );
};

export default Artists;