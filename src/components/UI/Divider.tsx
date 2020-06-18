import * as React from "react";
import styled from "styled-components";
import { capitalize } from "lodash";

interface Props {
  label?: string;
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
}

const Label = styled.span`
  color: var(--text);
  padding-right: 8px;
  font-size: 10px;
  white-space: nowrap;
  font-weight: 500;
  letter-spacing: 1px;
  user-select: none;
`;

const HrStyled = styled.hr`
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--line);
`;

export const Divider: React.FC<Props> = ({ label, labelStyle, style }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", ...style }}>
      {label && <Label style={labelStyle}>{capitalize(label)}</Label>}
      <HrStyled />
    </div>
  );
};
