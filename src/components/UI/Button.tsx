import * as React from "react";
import styled, { css } from "styled-components";
import { Spinner } from "./Spinner";

const B = styled.button<{ undo?: boolean } & React.HTMLProps<HTMLButtonElement>>`
  font-family: "Roboto", sans-serif;
  border: unset;
  border-radius: 0;
  color: #ffffff;
  background: var(--primary);
  padding: 10px 20px;
  height: 45px;
  border-radius: 30px;
  font-size: 14px;
  width: auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;

  transition: opacity 0.2s;

  &:hover {
    background: ${(props) => (props.disabled ? "var(--primary)" : "var(--primary-hover)")};
  }

  ${(props) =>
    props.undo &&
    css`
      background: var(--grey);
      &:hover {
        background: var(--dark-grey);
      }
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
