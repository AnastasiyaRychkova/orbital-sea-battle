import React, { useContext } from "react";
import Slide from "./Slide";
import { SliderContext } from "../Slider";

import "../styles.scss";

export default function SlidesList() {
  const { slideNumber, items } = useContext(SliderContext);

  return (
    <div
      className="slide-list"
      style={{ transform: `translateX(-${slideNumber * 100}%)` }}
    >
      {items.map((item, index) => (
        <Slide key={index} data={item} />
      ))}
    </div>
  );
}