import PulseLoader from "react-spinners/PulseLoader";

interface CustomPulseLoaderProps {
  isLoading: boolean;
  $customHeight?: string;
  $customBackground?: string;
}

const CustomPulseLoader: React.FC<CustomPulseLoaderProps> = ({
  isLoading,
  $customHeight = "200px",
}) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        margin: "0 auto",
        justifyContent: "center",
        alignItems: "center",
        height: $customHeight,
        background: "var(--bg-color)",
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
