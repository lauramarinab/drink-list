import * as React from "react";

const onKeyUp = (e: KeyboardEvent, onClose: () => any) => {
  if (e.keyCode === 27) {
    onClose();
  }
};

const useKeyUpEsc = (onClose: () => any) => {
  const onClickEsc = (e: KeyboardEvent) => onKeyUp(e, onClose);

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keyup", onClickEsc, true);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keyup", onClickEsc, true);
    };
  }, []);
};

export { useKeyUpEsc };
