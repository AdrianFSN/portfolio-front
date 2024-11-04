import { JobExample } from "../../@types/jobExample";
import { IMAGES_DB_PATH, ORIGIN } from "../../utils/constants";
import useCarousel from "../../hooks/useCarousel";
import "../../components/shared/caroussel/caroussel.css";

interface JobsCarousselProps {
  items: JobExample[];
  autoPlay?: boolean;
}

const JobsCaroussel: React.FC<JobsCarousselProps> = ({ items, autoPlay }) => {
  const origin = ORIGIN;
  const imgUrlPath = `${IMAGES_DB_PATH}`;
  const { currentItem, currentIndex, animationClass } = useCarousel(
    items,
    5000,
    autoPlay
  );

  return (
    <>
      <div
        key={(currentItem as JobExample)._id}
        className={`caroussel__screen__item ${animationClass}`}
      >
        <picture className="caroussel__item__picture">
          <source
            media="(max-width: 767px)"
            srcSet={`${imgUrlPath}${encodeURIComponent(
              (currentItem as JobExample).pictures.mainPicture
            )}`}
          />
          <img
            className="caroussel__img__fade"
            src={`${imgUrlPath}${encodeURIComponent(
              (currentItem as JobExample).pictures.mainPicture
            )}`}
            alt={(currentItem as JobExample).versions[0].title}
            crossOrigin={origin}
          />
        </picture>
        <h3>{(currentItem as JobExample).versions[0].title}</h3>
      </div>

      <span
        className={
          autoPlay ? "caroussel__controls__hidden" : "caroussel__controls"
        }
      >
        <i className="fa-solid fa-chevron-left"></i>
        {currentIndex + 1} / {items.length}
        <i className="fa-solid fa-chevron-right"></i>
      </span>
    </>
  );
};

export default JobsCaroussel;
