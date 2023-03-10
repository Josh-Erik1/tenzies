import React from "react";

const Die = (props) => {
  return (
    <div
      className={`h-[50px] w-[50px] cursor-pointer shadow-md ${
        props.isHeld ? "bg-green-300" : "bg-slate-200"
      } rounded-lg flex justify-center items-center`}
      onClick={props.holdDice}
    >
      <h2 className=" font-bold">{props.value}</h2>
    </div>
  );
};

export default Die;
