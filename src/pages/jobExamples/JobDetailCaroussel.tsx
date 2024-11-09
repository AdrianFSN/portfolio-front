import {
  AUDIOS_DB_PATH,
  IMAGES_DB_PATH,
  ORIGIN,
  VIDEOS_DB_PATH,
} from "../../utils/constants";
import useCarousel from "../../hooks/useCarousel";
import "../../components/shared/caroussel/caroussel.css";

interface JobDetailCarousselProps {
  items: string[];
  autoPlay?: boolean;
}

const JobDetailCaroussel: React.FC<JobDetailCarousselProps> = ({
  items,
  autoPlay,
}) => {
  const origin = ORIGIN;
  const imgUrlPath = `${IMAGES_DB_PATH}`;
  const videoUrlPath = `${VIDEOS_DB_PATH}`;
  const audioUrlPath = `${AUDIOS_DB_PATH}`;

  const { currentItem, currentIndex, animationClass, next, prev } = useCarousel(
    items,
    5000,
    autoPlay
  );

  const currentItemAsString = currentItem as string;

  const isImage = (file: string) => file.match(/\.(jpg|jpeg|png|gif)$/i);
  const isVideo = (file: string) => file.match(/\.(mp4|webm|ogg)$/i);
  const isAudio = (file: string) => file.match(/\.(mp3|wav|ogg)$/i);

  const getFileUrl = (file: string) => {
    if (isImage(file)) {
      return `${imgUrlPath}${encodeURIComponent(file)}`;
    }
    if (isVideo(file)) {
      return `${videoUrlPath}${encodeURIComponent(file)}`;
    }
    if (isAudio(file)) {
      return `${audioUrlPath}${encodeURIComponent(file)}`;
    }
    return "";
  };

  return (
    <section className="caroussel">
      <div className="caroussel__section__with__controls">
        <div
          className={
            !autoPlay
              ? "caroussel__controls__prev"
              : "caroussel__controls__hidden"
          }
        >
          <i
            className="fa-solid fa-chevron-left"
            onClick={prev}
          ></i>
        </div>
        <section className="caroussel__middle__block">
          <div
            key={currentItemAsString}
            className={`caroussel__screen__item ${animationClass}`}
          >
            <div>
              {isImage(currentItemAsString) && (
                <picture className="caroussel__item__picture">
                  <source
                    media="(max-width: 767px)"
                    srcSet={getFileUrl(currentItemAsString)}
                  />
                  <img
                    className="caroussel__img__fade"
                    src={getFileUrl(currentItemAsString)}
                    alt={currentItemAsString}
                    crossOrigin={origin}
                  />
                </picture>
              )}
              {isVideo(currentItemAsString) && (
                <div className="caroussel__item__video">
                  <video
                    className="caroussel__video__fade"
                    controls
                    crossOrigin={origin}
                  >
                    <source
                      src={getFileUrl(currentItemAsString)}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              {isAudio(currentItemAsString) && (
                <div className="caroussel__item__audio">
                  <audio
                    className="caroussel__audio__fade"
                    controls
                    crossOrigin={origin}
                  >
                    <source
                      src={getFileUrl(currentItemAsString)}
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </div>
          </div>
          <div
            className={
              !autoPlay ? "caroussel__controls" : "caroussel__controls__hidden"
            }
          >
            {currentIndex + 1} / {items.length}
          </div>
        </section>
        <div
          className={
            !autoPlay
              ? "caroussel__controls__next"
              : "caroussel__controls__hidden"
          }
        >
          <i
            className="fa-solid fa-chevron-right"
            onClick={next}
          ></i>
        </div>
      </div>
    </section>
  );
};

export default JobDetailCaroussel;
