const getCircularIndex = (index: number, length: number = 0) => {
  if (length === 0) return 0;
  return (index + length) % length;
};

export default getCircularIndex;
