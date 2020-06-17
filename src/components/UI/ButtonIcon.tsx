import * as React from "react";
import styled, { css } from "styled-components";
import { Spinner } from "./Spinner";
import { IconNames } from "../../types/IconNames";
import { Icon } from "./Icon";

const B = styled.button<{ undo?: boolean } & React.HTMLProps<HTMLButtonElement>>`
  border: unset;
  color: #ffffff;
  background: #000000;
  height: 40px;
  width: 40px;
  border-radius: 40px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: none;

  transition: opacity 0.2s;

  ${(props) =>
    props.undo &&
    css`
      background: #cccccc;
    `}

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}

    &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #3ab0ff;
  }
`;

interface Props {
  iconName: IconNames;
  undo?: boolean;
  loading?: boolean;
}

const ButtonIcon: React.FC<Props & React.HTMLProps<HTMLButtonElement>> = ({
  undo,
  loading,
  children,
  iconName,
  ...rest
}) => {
  const { onClick, style, disabled } = rest;
  return (
    <B onClick={onClick} style={style} disabled={disabled} undo={undo}>
      {loading && <Spinner style={{ position: "absolute", margin: "0 auto" }} />}
      <Icon name={iconName} color="#ffffff" style={{ visibility: loading ? "hidden" : "visible", fontSize: 30 }} />
    </B>
  );
};

export { ButtonIcon };
