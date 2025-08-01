import React from "react";

const ButtonGroup = props => {
  return (
    <div className="flex flex-row justify-center items-center gap-x-2 px-4 my-4">
      <button className="btn btn-primary" onClick={props.handleRemove}>
        -
      </button>
      {props.quantity}
      <button className="btn btn-primary" onClick={props.handleAdd}>
        +
      </button>
    </div>
  );
};

export default ButtonGroup;
