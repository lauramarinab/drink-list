import * as React from "react";
import styled, { css } from "styled-components";
import { IconNames } from "../../types/IconNames";
import { IconSize } from "../../types/IconSize";

interface Props {
  name: IconNames;
  iconSize?: IconSize;
  color?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const I = styled.i<{ color?: string; onClick?: () => void; disabled?: boolean }>`
  position: relative;
  color: ${(props) => (props.color ? props.color : "var(--primary)")};
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};

  &::before {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }

  ${(props) =>
    props.onClick &&
    css`
      cursor: pointer;
      :hover {
        color: var(--primary-hover);
      }
    `}

  ${(props) =>
    props.disabled &&
    css`
      cursor: default;
      :hover {
        color: var(--primary);
      }
    `}
`;

const getClassIconSize = (size?: IconSize) => {
  const classSize = {
    small: "icon-s",
    medium: "icon-m",
    large: "icon-l",
  };

  return size ? classSize[size] : "icon-m";
};

const Icon: React.FC<Props & React.HTMLProps<HTMLLIElement>> = ({
  name,
  iconSize,
  onClick,
  style,
  color,
  disabled,
  className,
}) => {
  return (
    <I
      className={`icon-${name} ${getClassIconSize(iconSize)} ${className}`}
      onClick={onClick}
      style={style}
      color={color}
      disabled={disabled}
    />
  );
};

export { Icon };
