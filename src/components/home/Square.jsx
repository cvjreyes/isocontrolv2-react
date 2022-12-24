/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function Square({ text, num }) {
  const randomNum = Math.floor(Math.random() * 10000) / 100;
  return (
    <div css={itemStyle}>
      <p>{text}</p>
      <p>{num || randomNum}%</p>
    </div>
  );
}

const itemStyle = {};
