import React from "react";
import SlideTitle from "./SlideTitle";
import SlideImage from "./SlideImage";

import "./../styles.scss";

export default function Slide({ data: { title, img } }) {
  return (
    <div className="slide">
      <SlideImage src={img} alt={title} />
      {/* <SlideTitle title={title} /> */}
    </div>
  );
}