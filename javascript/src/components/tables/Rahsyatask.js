import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { lighten } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
// import { makeStyles } from "@material-ui/**core**/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import axios from "axios";
import moment from "moment";
import { Container } from "@material-ui/core";

const columns = [
  { id: "name", label: "Planet Name" },
  { id: "code", label: "Start Date", minWidth: 100 },
  { id: "endDt", label: "End Date", minWidth: 100 },
];

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        {columns.map((column) => (
          <TableCell
            backgroundColor="white"
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(
  (theme) => (
    console.log(theme),
    {
      root: {
        // paddingLeft: theme.spacing(2),
        // paddingRight: theme.spacing(1),
      },
      // highlight:
      //   theme.palette.type === "light"
      //     ? {
      //         color: theme.palette.secondary.main,
      //         backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      //       }
      //     : {
      //         color: theme.palette.text.primary,
      //         backgroundColor: theme.palette.secondary.dark,
      //       },
      title: {
        flex: "1 1 100%",
      },
    }
  )
);

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles(props);
  return (
    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
      Yogini Dasha Table
    </Typography>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    // marginBottom: theme.spacing(2),
  },
  container: {
    maxHeight: 440,
  },
}));

makeStyles.propTypes = {
  theme: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(true);

  const [dasaName, setDasaName] = useState([
    "CHANDRA",
    "RAVI",
    "GURU",
    "KUJA",
    "BUDH",
    "SHANI",
    "SHUKR",
    "RAHU",
    "CHANDRA",
    "RAVI",
    "GURU",
    "KUJA",
    "BUDH",
    "SHANI",
    "SHUKR",
    "RAHU",
    "CHANDRA",
    "RAVI",
    "GURU",
    "KUJA",
    "BUDH",
    "SHANI",
    "SHUKR",
    "RAHU",
  ]);
  const [year, setYears] = useState([
    "2020-10-26",
    "2021-10-26",
    "2023-10-26",
    "2026-10-26",
    "2030-10-26",
    "2035-10-26",
    "2041-10-26",
    "2048-10-26",
    "2056-10-26",
    "2057-10-26",
    "2059-10-26",
    "2062-10-26",
    "2066-10-26",
    "2071-10-26",
    "2077-10-26",
    "2084-10-26",
    "2092-10-26",
    "2093-10-26",
    "2095-10-26",
    "2098-10-26",
    "2102-10-26",
    "2107-10-26",
    "2113-10-26",
    "2120-10-26",
    "2128-10-26",
  ]);
  // useEffect(() => {
  //   axios.get("http://localhost:3000/api/details").then((res) => {
  //     setDasaName(res.data.dasa);
  //     setYears(res.data.years);
  //   });
  // }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dasaName.map((n, i) => n[i]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div>
      <Container maxWidth="md" style={{ maxWidth: 600 }}>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <EnhancedTableToolbar />
            <TableContainer className={classes.container}>
              <Table
                style={{ position: "relative" }}
                className={classes.table}
                stickyHeader
                size={dense ? "small" : "medium"}
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                />
                {dasaName.map((item, i) => {
                  const isItemSelected = isSelected(i);
                  return (
                    <TableBody>
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, i)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        selected={isItemSelected}
                      >
                        <TableCell selected={isItemSelected} padding="checkbox">
                          <Checkbox selected={isItemSelected} checked={isItemSelected} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="normal">
                          {item}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {moment(year[i]).format("L")}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {moment(year[i + 1]).format("L")}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  );
                })}
              </Table>
            </TableContainer>
          </Paper>
          {/* <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          /> */}
        </div>
      </Container>
    </div>
  );
}
