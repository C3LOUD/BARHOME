import React from 'react';

const ModalCard = (props) => {
  return (
    <div
      className="relative flex h-full max-h-[47rem] w-full max-w-[60rem] cursor-default flex-col items-center overflow-y-scroll rounded bg-white-100 py-4 pt-10 pb-6 scrollbar-none"
      onClick={(e) => e.stopPropagation()}
    >
      {props.children}
    </div>
  );
};

export default ModalCard;
