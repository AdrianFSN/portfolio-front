import pic200 from "../../../images/bio/trans_color/Adrian_trans_color_dahhve_c_scale_w_200.png";
import pic475 from "../../../images/bio/trans_color/Adrian_trans_color_dahhve_c_scale_w_475.png";
import pic612 from "../../../images/bio/trans_color/Adrian_trans_color_dahhve_c_scale_w_612.png";

const BioPicture = () => {
  return (
    <picture className="main__info__picture">
      <div className="bio__picture__overlay"></div>
      <source
        media="(max-width: 424px)"
        srcSet={pic200}
      />
      <source
        media="(min-width: 425px) and (max-width: 767px)"
        srcSet={pic475}
      />
      <source
        media="(min-width: 768px)"
        srcSet={pic612}
      />
      <img
        src={pic612}
        alt="Adrián Sotés ¡A ese!"
      />
    </picture>
  );
};

export default BioPicture;
