/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function NoResults() {
  return <div css={noResultsStyle}>❌ No results found</div>;
}

const noResultsStyle = {
  margin: "2rem 0 0 2rem",
  textAlign: "left !important",
  fontSize: "14px !important",
};
