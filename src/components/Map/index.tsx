import "./style.css";
import { useLocation } from "react-router-dom";

const Map = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const x = Number(params.get("x") || 0);
  const y = Number(params.get("y") || 0);

  const xPercent = (x / 1800) * 100; // X → left
  const yPercent = (y / 1800) * 100; // Y → top

  return (
    <div className='map-container'>
      <img src='/map.png' alt='map' className='map' />

      {/* marker */}
      <div
        className='marker-container'
        style={{
          top: `${yPercent}%`,
          left: `${xPercent}%`,
        }}
      >
        <div className='marker-point'></div>
      </div>
    </div>
  );
};

export default Map;
