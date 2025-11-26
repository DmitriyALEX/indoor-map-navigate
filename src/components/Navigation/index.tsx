import PrimaryButton from "../../ui/PrimaryButton";
import useFetchData from "../../hooks/useFetchData";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Navigation = () => {
  const fetchedData = useFetchData();
  const navigate = useNavigate();
  return (
    <div className='nav-container'>
      {fetchedData.map((el) => (
        <PrimaryButton title={el.title} onClick={() => navigate(`/map?x=${el.coordinates.x}&y=${el.coordinates.y}`)} />
      ))}
    </div>
  );
};

export default Navigation;
