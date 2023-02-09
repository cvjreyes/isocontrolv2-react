/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import Loading from "react-loading";
import ReactSelect from "react-select";

import NoResults from "../../components/general/NoResults";
import Button2 from "../general/Button2";
import Input from "../general/Input1";

import saveImg from "../../assets/images/save.svg";

export default function ListOfUsers({
  users,
  handleUserRoleChange,
  roles,
  changed,
  clear,
  handleSubmit,
  filterData,
  setFilterData,
}) {
  return (
    <form css={usersStyle} onSubmit={handleSubmit}>
      <div className="head">
        <h2>Add User</h2>
        <div className="right">
          <Input
            placeholder="Email"
            value={filterData}
            onChange={(e) => setFilterData(e.target.value)}
          />
          <Button2
            type="button"
            width="100px"
            text="Clear"
            onClick={clear}
            border="none"
            // bgColor="linear-gradient(322deg, rgba(0,105,223,1) 0%, rgba(0,112,237,1) 21%, rgba(22,128,247,1) 100%)"
            bgColor="linear-gradient(322deg, rgba(0,105,223,1) 0%, rgba(0,112,237,1) 21%, rgba(22,128,247,1) 100%)"
            color="white"
            fontWeight="600"
            fontSize="14px"
            textMargin="0 0 0 6px"
            margin="0 20px 0 0"
            hoverShadow="inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff"
            // img
            alt="clear"
            src={"https://img.icons8.com/ios-filled/50/null/left2.png"}
            imgFilter="invert(100%) brightness(200%)"
          />
          <div>{users?.length} items</div>
        </div>
      </div>
      <div className="table">
        <div>
          {users ? (
            users.length > 0 ? (
              users.map((user, i) => {
                return (
                  <div
                    key={user.id}
                    className="user"
                    style={{
                      backgroundColor: changed.includes(user.id) && "#2fc1383b",
                    }}
                  >
                    <div>
                      <div>{user.name}</div>
                      <div>{user.email}</div>
                    </div>
                    <ReactSelect
                      options={[
                        { value: "All", label: "All" },
                        ...roles.map((x) => ({ label: x.name, value: x.name })),
                      ]}
                      value={user.roles}
                      onChange={(e) => handleUserRoleChange(e, user.id)}
                      isMulti
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          padding: "5px",
                        }),
                      }}
                    />
                  </div>
                );
              })
            ) : (
              <NoResults />
            )
          ) : (
            <Loading />
          )}
        </div>
      </div>
      <Button2
        width="100px"
        text="Save"
        onClick={handleSubmit}
        border="none"
        bgColor="linear-gradient(322deg, rgba(0,105,223,1) 0%, rgba(0,112,237,1) 21%, rgba(22,128,247,1) 100%)"
        color="white"
        fontWeight="600"
        fontSize="14px"
        textMargin="0 0 0 6px"
        margin="10px auto 0"
        hoverShadow="inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff"
        // img
        alt="add"
        src={saveImg}
      />
    </form>
  );
}

const usersStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  width: "95%",
  ".head": {
    width: "100%",
    height: "70px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "10px",
    h2: {
      position: "absolute",
      top: 115,
      right: 0,
      left: 0,
      width: "fit-content",
      margin: "0 auto",
    },
    ".right": {
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      backgroundColor: "lightgray",
      padding: "0 20px",
      height: "100%",
      input: {
        marginRight: "2rem",
      },
    },
  },
  ".table": {
    width: "100%",
    // backgroundColor: "#99C6F8",
    background:
      "linear-gradient(90deg, rgba(147,197,251,1) 0%, rgba(153,198,248,1) 49%, rgba(177,214,255,1) 100%)",
    borderRadius: "6px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    "> div": {
      width: "100%",
      overflowY: "auto",
      height: "60vh",
      /* Hide scrollbar for IE, Edge and Firefox */
      msOverflowStyle: "none" /* IE and Edge */,
      scrollbarWidth: "none" /* Firefox */,
      /* Hide scrollbar for Chrome, Safari and Opera */
      "::-webkit-scrollbar": {
        display: "none",
      },
    },
    ".user": {
      width: "100%",
      textAlign: "left",
      marginBottom: "20px",
      borderRadius: "6px",
      padding: "15px",
      // backgroundColor: "#ffffffc5",
      background:
        "linear-gradient(90deg, rgba(241,254,255,.6) 0%, rgba(255,255,255,.6) 49%, rgba(245,249,250,.6) 100%)",
      "> div:first-of-type": {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
      },
      "> div": {
        marginBottom: "5px",
      },
    },
  },
};
