/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, keyframes } from "@emotion/react";

export default function Copied(props) {
  const bounce = keyframes`
    0%  {
      bottom: 10px,
    }
    
    50% {bottom: 30px}
    100% {bottom: 30px}
    }`;

  const copied = {
    position: "absolute",
    bottom: "10px",
    left: "2px",
    zIndex: 10,
    color: "black",
    fontSize: "1rem",
    animation: `${bounce} 1.2s`,
    fontFamily: "Montserrat,sans-serif",
    backgroundColor: "#3e96faaf",
    borderRadius: "100px",
  };

  return <div css={copied}>Copied!</div>;
}
