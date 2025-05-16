import type { PropsWithChildren } from "react";
import styles from "./IconBtn.module.scss";

type props = {
  title?: string;
  classes?: string[];
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
} & PropsWithChildren;

function IconBtn({ title, classes = [], onClick, children }: props) {
  const classString = [styles.iconBtn, ...classes].join(" ");

  return (
    <button title={title} className={classString} onClick={onClick}>
      {children}
    </button>
  );
}

export default IconBtn;
