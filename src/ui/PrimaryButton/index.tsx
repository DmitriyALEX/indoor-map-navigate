import React from "react";
import "./style.css";

interface Props {
  title: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PrimaryButton: React.FC<Props> = React.memo(({ title, onClick }) => {
  return (
    <>
      <button className='button' onClick={onClick}>
        {title}
      </button>
    </>
  );
});

export default PrimaryButton;
