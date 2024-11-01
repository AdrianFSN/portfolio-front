import PulseLoader from "react-spinners/PulseLoader";

interface CustomPulseLoaderProps {
  isLoading: boolean;
  $customHeight?: string;
}

const CustomPulseLoader: React.FC<CustomPulseLoaderProps> = ({
  isLoading,
  $customHeight = "200px",
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: $customHeight,
      }}
    >
      <PulseLoader
        color={"var(--main-brand-color)"}
        loading={isLoading}
        size={15}
      />
    </div>
  );
};

export default CustomPulseLoader;
