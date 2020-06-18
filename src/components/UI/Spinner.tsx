import * as React from "react";
import styled from "styled-components";

type Size = "xsmall" | "small" | "medium" | "large";

interface Props {
  size?: Size;
  style?: React.CSSProperties;
}

const sizes = {
  xsmall: {
    width: 10,
    height: 10,
    borderWidth: 4,
  },
  small: {
    width: 25,
    height: 25,
    borderWidth: 4,
  },
  medium: {
    width: 30,
    height: 30,
    borderWidth: 6,
  },
  large: {
    width: 100,
    height: 100,
    borderWidth: 10,
  },
};

const SpinnerShape = styled.div<{ size?: Size }>`
  width: ${(props) => (props.size ? sizes[props.size].width : sizes.small.width)}px;
  height: ${(props) => (props.size ? sizes[props.size].height : sizes.small.height)}px;
  border-width: ${(props) => (props.size ? sizes[props.size].borderWidth : sizes.small.borderWidth)}px;
  border-color: #cccccc;
  border-style: solid;
  animation: rotate 0.8s infinite linear;
  border-right-color: transparent;
  border-radius: ${(props) => (props.size ? sizes[props.size].width : sizes.small.width)}px;
  position: absolute;
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const UnderBkg = styled.div<{ size?: Size }>`
  width: ${(props) => (props.size ? sizes[props.size].width : sizes.small.width)}px;
  height: ${(props) => (props.size ? sizes[props.size].height : sizes.small.height)}px;
  border-width: ${(props) => (props.size ? sizes[props.size].borderWidth : sizes.small.borderWidth)}px;
  border-radius: 50%;
  border-style: solid;
  border-color: #ffffff;
`;

export const Spinner: React.FC<Props> = ({ size, style }) => {
  return (
    <div style={{ display: "flex", position: "relative", ...style }}>
      <UnderBkg size={size} />
      <SpinnerShape size={size} />
    </div>
  );
};

Spinner.defaultProps = {
  size: "small",
};
