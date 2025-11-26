import PrimaryButton from "../../ui/PrimaryButton";
import useFetchData from "../../hooks/useFetchData";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useCallback, useMemo } from "react";

const Navigation = () => {
  const fetchedData = useFetchData();
  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (x: number, y: number) => {
      navigate(`/map?x=${x}&y=${y}`);
    },
    [navigate]
  );

  const buttonHandlers = useMemo(() => {
    return fetchedData.map((el) => handleNavigate.bind(null, el.coordinates.x, el.coordinates.y));
  }, [fetchedData, handleNavigate]);

  return (
    <div className='nav-container'>
      {fetchedData.map((el, index) => (
        <PrimaryButton title={el.title} onClick={buttonHandlers[index]} />
      ))}
    </div>
  );
};

export default Navigation;
