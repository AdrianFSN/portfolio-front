import React from "react";

interface CarouselControlsProps {
  pointer: number;
  itemsLength: number;
  setPointer: React.Dispatch<React.SetStateAction<number>>;
}

const CarouselControls: React.FC<CarouselControlsProps> = ({
  pointer,
  itemsLength,
  setPointer,
}) => {
  const handleLeftClick = () => {
    setPointer((prevPointer) =>
      prevPointer > 0 ? prevPointer - 1 : itemsLength - 1
    );
  };

  const handleRightClick = () => {
    setPointer((prevPointer) =>
      prevPointer < itemsLength - 1 ? prevPointer + 1 : 0
    );
  };

  return (
    <span>
      <i
        className="fa-solid fa-chevron-left"
        onClick={handleLeftClick}
      ></i>
      {pointer + 1} / {itemsLength}
      <i
        className="fa-solid fa-chevron-right"
        onClick={handleRightClick}
      ></i>
    </span>
  );
};

export default CarouselControls;
