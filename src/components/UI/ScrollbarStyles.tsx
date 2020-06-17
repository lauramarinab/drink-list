import { css } from "styled-components";

const transparentScrollbar = css`
  ::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none;
  }
`;

export { transparentScrollbar };
