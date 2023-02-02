/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import Button1 from "../components/general/Button1";

export default function NavisLayout({ children }) {
  return (
    <div css={navisStyle}>
      <Button1 text="Generate XML" />
      {children}
    </div>
  );
}

const navisStyle = {};
