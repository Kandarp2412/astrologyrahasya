import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
// import { globalContext } from "../context/Context";
import Card from "@material-ui/core/Card";
import { List, ListItem } from "@material-ui/core";
// import AppContext, { globalContext } from "../../context/Context";
import { Table, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import "./Table.css";
// import CardSummary from "../dashboard/CardSummary";
// import { Text } from "../dashboard/Language";
import { globalContext } from "../../contexts/Context";
import { Text } from "../Language";
import { makeStyles } from "@material-ui/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import Collapsible from "react-collapsible";

const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
});

function Dasha() {
  const classes = useStyles();
  // const { isDark } = useContext(AppContext);
  const { data, setDasha, dasha } = useContext(globalContext);
  const [subDashaL1, setSubDashaL1] = useState([]);
  const [subDashaL2, setSubDashaL2] = useState([]);
  const [subDashaL3, setSubDashaL3] = useState([]);
  const [subDashaL4, setSubDashaL4] = useState([]);

  // let index1 = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

  // let a = index1.map((i) => i);

  const [index1] = useState(() => {
    let temp = [];
    for (let i = 0; i <= 8; i++) {
      temp.push(i);
    }
    return temp;
  });

  console.log(index1);

  const handleLevel1Dasha = (e, index) => {
    // console.log(index);
    setSubDashaL1(dasha[index]?.subLevel);
    console.log("hello", dasha[index]);
  };
  const handleLevel2Dasha = (e, index) => {
    setSubDashaL2(subDashaL1[index]?.subLevel);
    console.log(subDashaL1[index]?.subLevel);
  };
  const handleLevel3Dasha = (e, index) => {
    setSubDashaL3(subDashaL2[index].subLevel);
  };
  const handleLevel4Dasha = (e, index) => {
    setSubDashaL4(subDashaL3[index].subLevel);
    console.log(subDashaL3[index].subLevel);
  };
  // const handleLevel5Dasha = (e,index)=>{
  //   set
  // }
  return (
    <div style={{ height: "535px", overflow: "scroll" }}>
      <div>
        {dasha && dasha.length > 0
          ? dasha.map((item, index) => {
              return (
                <>
                  <Collapsible
                    trigger={`${item.planet}  From  ${moment(item.dashaStartDate).format(
                      "DD/MM/YYYY"
                    )}  To  ${moment(item.dashaEndDate).format("DD/MM/YYYY")}`}
                    onClick={(e) => console.log(e)}
                  >
                    {subDashaL1 ? (
                      <div>
                        <p style={{ display: "flex", justifyContent: "center" }}>Antra Dasha</p>
                        {subDashaL1 && subDashaL1.length > 0
                          ? subDashaL1.map((subl1, index) => {
                              return (
                                <>
                                  {console.log(subl1)}
                                  <Collapsible
                                    trigger={`${subl1.planet} From ${moment(
                                      subl1.dashaStartDate
                                    ).format("DD/MM/YYYY")} To ${moment(subl1.dashaEndDate).format(
                                      "DD/MM/YYYY"
                                    )}`}
                                    onClick={(e) => handleLevel2Dasha(e, index)}
                                  >
                                    <p style={{ display: "flex", justifyContent: "center" }}>
                                      Pratyantar Dashas
                                    </p>
                                    {subDashaL2 && subDashaL2.length > 0
                                      ? subDashaL2.map((subl2, index) => {
                                          return (
                                            <>
                                              <Collapsible
                                                trigger={`${subl2.planet} From ${moment(
                                                  subl2.dashaStartDate
                                                ).format("DD/MM/YYYY")} To ${moment(
                                                  subl2.dashaEndDate
                                                ).format("DD/MM/YYYY")}`}
                                                onClick={(e) => handleLevel2Dasha(e, index)}
                                              >
                                                <p
                                                  style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                  }}
                                                >
                                                  Bhukti
                                                </p>
                                                {subDashaL3 && subDashaL3.length > 0
                                                  ? subDashaL3.map((subl3, index) => {
                                                      return (
                                                        <>
                                                          <List>
                                                            <ListItem
                                                              style={{
                                                                cursor: "pointer",
                                                                background: "lightgrey",
                                                              }}
                                                              onClick={(e) =>
                                                                handleLevel4Dasha(e, index)
                                                              }
                                                            >
                                                              {subl3.planet}&ensp; From&ensp;
                                                              {moment(subl3.dashaStartDate).format(
                                                                "DD/MM/YYYY"
                                                              )}
                                                              &ensp; to&ensp;
                                                              {moment(subl3.dashaEndDate).format(
                                                                "DD/MM/YYYY"
                                                              )}
                                                            </ListItem>
                                                          </List>

                                                          <br />
                                                        </>
                                                      );
                                                    })
                                                  : null}
                                              </Collapsible>
                                              {/* <List>
                                                <ListItem
                                                  style={{
                                                    cursor: "pointer",
                                                    background: "lightgrey",
                                                  }}
                                                  onClick={(e) => handleLevel3Dasha(e, index)}
                                                >
                                                  {subl2.planet}&ensp; From&ensp;
                                                  {moment(subl2.dashaStartDate).format(
                                                    "DD/MM/YYYY"
                                                  )}
                                                  &ensp; to&ensp;
                                                  {moment(subl2.dashaEndDate).format("DD/MM/YYYY")}
                                                </ListItem>
                                              </List> */}

                                              <br />
                                            </>
                                          );
                                        })
                                      : null}
                                  </Collapsible>
                                  {/* <List>
                                    <ListItem
                                      // style={{ cursor: "pointer", background: "lightgrey" }}
                                      onClick={(e) => handleLevel2Dasha(e, index)}
                                    >
                                      {subl1.planet}&ensp; From&ensp;
                                      {moment(subl1.dashaStartDate).format("DD/MM/YYYY")}
                                      &ensp; to&ensp;
                                      {moment(subl1.dashaEndDate).format("DD/MM/YYYY")}
                                    </ListItem>
                                  </List> */}

                                  <br />
                                </>
                              );
                            })
                          : null}
                      </div>
                    ) : null}{" "}
                  </Collapsible>
                  <List>
                    {/* <ListItem
                      style={{ background: "lightgrey", cursor: "pointer" }}
                      onClick={(e) => handleLevel1Dasha(e, index)}
                    >
                      {item.planet}&ensp; From&ensp;
                      {moment(item.dashaStartDate).format("DD/MM/YYYY")}&ensp; to&ensp;
                      {moment(item.dashaEndDate).format("DD/MM/YYYY")}
                    </ListItem> */}
                    {/* {subDashaL1 ? (
                      <div>
                        <p style={{ display: "flex", justifyContent: "center" }}>Antra Dasha</p>
                        {subDashaL1 && subDashaL1.length > 0
                          ? subDashaL1.map((subl1, index) => {
                              return (
                                <>
                                  <List>
                                    <ListItem
                                      style={{ cursor: "pointer", background: "lightgrey" }}
                                      onClick={(e) => handleLevel2Dasha(e, index)}
                                    >
                                      {subl1.planet}&ensp; From&ensp;
                                      {moment(subl1.dashaStartDate).format("DD/MM/YYYY")}
                                      &ensp; to&ensp;
                                      {moment(subl1.dashaEndDate).format("DD/MM/YYYY")}
                                    </ListItem>
                                  </List>

                                  <br />
                                </>
                              );
                            })
                          : null}
                      </div>
                    ) : null} */}
                  </List>

                  <br />
                </>
              );
            })
          : null}
      </div>
      {/* {subDashaL1 ? (
        <div>
          <p style={{ display: "flex", justifyContent: "center" }}>Antra Dasha</p>
          {subDashaL1 && subDashaL1.length > 0
            ? subDashaL1.map((subl1, index) => {
                return (
                  <>
                    <List>
                      <ListItem
                        style={{ cursor: "pointer", background: "lightgrey" }}
                        onClick={(e) => handleLevel2Dasha(e, index)}
                      >
                        {subl1.planet}&ensp; From&ensp;
                        {moment(subl1.dashaStartDate).format("DD/MM/YYYY")}
                        &ensp; to&ensp;
                        {moment(subl1.dashaEndDate).format("DD/MM/YYYY")}
                      </ListItem>
                    </List>

                    <br />
                  </>
                );
              })
            : null}
        </div>
      ) : null} */}
      <div>
        <p style={{ display: "flex", justifyContent: "center" }}>Pratyantar Dashas</p>
        {subDashaL2 && subDashaL2.length > 0
          ? subDashaL2.map((subl2, index) => {
              return (
                <>
                  <List>
                    <ListItem
                      style={{ cursor: "pointer", background: "lightgrey" }}
                      onClick={(e) => handleLevel3Dasha(e, index)}
                    >
                      {subl2.planet}&ensp; From&ensp;
                      {moment(subl2.dashaStartDate).format("DD/MM/YYYY")}
                      &ensp; to&ensp;
                      {moment(subl2.dashaEndDate).format("DD/MM/YYYY")}
                    </ListItem>
                  </List>

                  <br />
                </>
              );
            })
          : null}
      </div>
      <div>
        <p style={{ display: "flex", justifyContent: "center" }}>Bhukti</p>
        {subDashaL3 && subDashaL3.length > 0
          ? subDashaL3.map((subl3, index) => {
              return (
                <>
                  <List>
                    <ListItem
                      style={{ cursor: "pointer", background: "lightgrey" }}
                      onClick={(e) => handleLevel4Dasha(e, index)}
                    >
                      {subl3.planet}&ensp; From&ensp;
                      {moment(subl3.dashaStartDate).format("DD/MM/YYYY")}
                      &ensp; to&ensp;
                      {moment(subl3.dashaEndDate).format("DD/MM/YYYY")}
                    </ListItem>
                  </List>

                  <br />
                </>
              );
            })
          : null}
      </div>
      {/* <Card
        style={{
          width: "350px",
          height: "500px",
          marginTop: "10px",
          marginBottom: "10px",
          border: "1px solid black",
          boxShadow: "none",
          overflow: "scroll",
        }}
      >
        {subDashaL4 && subDashaL4.length > 0
          ? subDashaL4.map((subl4, index) => {
              return (
                <>
                  <List>
                    <ListItem>
                      <div
                        onClick={(e) => handleLevel5Dasha(e, index)}
                        style={{ cursor: "pointer" }}
                      >
                        {subl4.planet}&ensp;
                      </div>
                      From&ensp;
                      {moment(subl4.dashaStartDate).format("DD/MM/YYYY")}
                      &ensp; to&ensp;
                      {moment(subl4.dashaEndDate).format("DD/MM/YYYY")}
                    </ListItem>
                  </List>
                  <br />
                </>
              );
            })
          : null}
      </Card> */}
    </div>
  );
}

export default Dasha;
