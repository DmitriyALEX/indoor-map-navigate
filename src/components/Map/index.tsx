import { useEffect, useRef, useState } from "react";
import "./style.css";
import { useLocation } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";

const Map = () => {
  const fetchedData = useFetchData();
  const mapRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

  const x = Number(params.get("x") || 0);
  const y = Number(params.get("y") || 0);

  // const xPercent = (x / 1800) * 100; // X → left
  // const yPercent = (y / 1800) * 100; // Y → top

  //first render
  useEffect(() => {
    if (!fetchedData || fetchedData.length === 0) return;
    const container = mapRef.current;
    const marker = container?.querySelector<HTMLDivElement>(".marker-container");
    if (!container || !marker) return;

    marker.style.left = `${fetchedData[0].coordinates.x}px`;
    marker.style.top = `${fetchedData[0].coordinates.y}px`;
  }, [fetchedData]);

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

      //close popup
      setIsOpenPopup(false);
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
      <div className='marker-container'>
        <button className='marker-point' onClick={() => setIsOpenPopup(!isOpenPopup)}></button>
        {/* popup */}
        {isOpenPopup && (
          <div className='popup'>
            <div className='close-container'>
              <button className='close-btn' onClick={() => setIsOpenPopup(false)}>
                <img src='/public/close-icon.svg' className='close-icon' />
              </button>
            </div>

            <div className='popup-content'>info</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
