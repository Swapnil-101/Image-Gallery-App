import React, { useState } from "react";
import Draggable from "react-draggable";
import data from "../../dummyjson/data.json";
const Card = ({
  i,
  search,
  handleStop,
  handleDrag,
  openLightbox,
  index,
}: any) => {
  console.log("key==>", index);
  return (
    // <Draggable
    //   key={i.id}
    //   bounds="parent"
    //   position={i.position}
    //   onStop={(e, data) => handleStop(i.id, e, data)}
    //   onDrag={(e, data) => handleDrag(i.id, e, data)}
    // >
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full"
        src={i?.image}
        alt="Sunset in the mountains"
        onClick={() => openLightbox(index)}
        style={{ cursor: "pointer" }}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{i?.title}</div>
        <p className="text-gray-700 text-base">{i?.description}</p>
      </div>
    </div>
    // </Draggable>
  );
};

export default Card;
