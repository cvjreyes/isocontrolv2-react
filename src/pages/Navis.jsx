/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import Button1 from "../components/general/Button1";
import WithToast from "../modals/Toast";

function NavisComp() {
  return (
    <div css={navisStyle}>
      <Button1 text="Generate XML" />
      <div>Hi</div>
    </div>
  );
}

const navisStyle = {
  backgroundColor: "lightgray",
  minHeight: "100vh",
  width: "100vw",
};

export default function Navis() {
  return (
    <WithToast>
      <NavisComp />
    </WithToast>
  );
}
