import * as React from "react";
import styled, { css } from "styled-components";
import { Spinner } from "./Spinner";

const B = styled.button<{ undo?: boolean } & React.HTMLProps<HTMLButtonElement>>`
  border: unset;
  border-radius: 0;
  color: #ffffff;
  background: #000000;
  padding: 0 20px;
  height: 38px;
  font-size: 12px;
  width: auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

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
`;

interface Props {
  undo?: boolean;
  loading?: boolean;
}

const Button: React.FC<Props & React.HTMLProps<HTMLButtonElement>> = ({ undo, loading, children, ...rest }) => {
  const { onClick, style, disabled } = rest;
  return (
    <B onClick={onClick} style={style} disabled={disabled} undo={undo}>
      {loading && <Spinner style={{ position: "absolute", margin: "0 auto" }} />}
      <span style={{ visibility: loading ? "hidden" : "visible" }}>{children}</span>
    </B>
  );
};

export { Button };
