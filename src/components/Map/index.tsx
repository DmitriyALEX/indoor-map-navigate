import { useEffect, useRef } from "react";
import "./style.css";
import { useLocation } from "react-router-dom";

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const x = Number(params.get("x") || 0);
  const y = Number(params.get("y") || 0);

  // const xPercent = (x / 1800) * 100; // X → left
  // const yPercent = (y / 1800) * 100; // Y → top

  useEffect(() => {
    const container = mapRef.current;
    const img = container?.querySelector<HTMLImageElement>(".map");
    const marker = container?.querySelector<HTMLDivElement>(".marker-container");
    if (!container || !img || !marker) return;

    const handleImageLoad = () => {
      const realX = (x / 1800) * img.clientWidth;
      const realY = (y / 1800) * img.clientHeight;

      marker.style.left = `${realX}px`;
      marker.style.top = `${realY}px`;

      container.scrollTo({
        top: realY - container.clientHeight / 2,
        left: realX - container.clientWidth / 2,
        behavior: "smooth",
      });
    };

    if (img.complete) {
      handleImageLoad();
    } else {
      img.addEventListener("load", handleImageLoad);
      return () => img.removeEventListener("load", handleImageLoad);
    }
  }, [x, y]);

  return (
    <div className='map-container' ref={mapRef}>
      <img src='/map.png' alt='map' className='map' />

      {/* marker */}
      <div
        className='marker-container'
        // style={{
        //   top: `${yPercent}%`,
        //   left: `${xPercent}%`,
        // }}
      >
        <div className='marker-point'></div>
      </div>
    </div>
  );
};

export default Map;
