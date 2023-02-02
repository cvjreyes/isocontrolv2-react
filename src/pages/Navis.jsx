/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import NavisTable from "../components/navis/navisTable";
import NavisLayout from "../layouts/NavisLayout";

import WithToast from "../modals/Toast";

const NavisComp = ({ setMessage }) => {
  return (
    <NavisLayout>
      <div>
        <NavisTable />
      </div>
    </NavisLayout>
  );
};

// using this components to use modals
export default function Navis() {
  return (
    <WithToast>
      <NavisComp />
    </WithToast>
  );
}
