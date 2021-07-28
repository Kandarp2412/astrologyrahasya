import React, { useEffect, useState } from "react";
import { lighten } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
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
import { Container } from "@material-ui/core";

const columns = [
  { id: "name", label: "Planet" },
  { id: "sign", label: "Sign" },
  { id: "position", label: "Position", minWidth: 72 },
  { id: "house", label: "House", maxWidth: 0 },
  { id: "star", label: "Star" },
  { id: "signlord", label: "Sign Lord" },
  { id: "starlord", label: "Star Lord" },
  { id: "sublord", label: "Sub Lord" },
  { id: "sslord", label: "SS Lord" },
  { id: "ssslord", label: "SSS Lord" },
  { id: "sssslord", label: "SSSS Lord" },
];

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth, fontWeight: "bold" }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
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
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  return (
    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
      Planet Table
    </Typography>
  );
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

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);

  const [planetDetails, setPlanetDetails] = useState([
    {
      signLord: "Ma",
      starPlanet: {
        planet: "Ke",
        deg: 0.4747315499059643,
      },
      subLord: {
        planet: "Ra",
        deg: 56.96778598871571,
      },
      sLords: [
        {
          levelName: "Sub-Sub-Lord",
          planet: "Sa",
          deg: 96.45190659143807,
        },
        {
          levelName: "Sub-Sub-Sub-Lord",
          planet: "Mo",
          deg: 42.64362057750361,
        },
        {
          levelName: "Sub-Sub-Sub-Sub-Lord",
          planet: "Su",
          deg: 28.723446930043337,
        },
      ],
      planet: {
        rashi: "Ar",
        graha: "Su",
        nakshatra: {
          name: "Ashwini",
          pada: 2,
        },
        longitude: 6.329752416307691,
        isRetrograde: false,
        dms: {
          d: 6,
          m: 19,
          s: 47,
        },
        signNumber: 1,
      },
    },
    {
      signLord: "Mo",
      starPlanet: {
        planet: "Sa",
        deg: 7.274421699761701,
      },
      subLord: {
        planet: "Me",
        deg: 116.93060397140415,
      },
      sLords: [
        {
          levelName: "Sub-Sub-Lord",
          planet: "Ju",
          deg: 81.33367509226463,
        },
        {
          levelName: "Sub-Sub-Sub-Lord",
          planet: "Ma",
          deg: 48.002563191984706,
        },
        {
          levelName: "Sub-Sub-Sub-Sub-Lord",
          planet: "Ve",
          deg: 8.758226148309234,
        },
      ],
      planet: {
        rashi: "Cn",
        graha: "Mo",
        nakshatra: {
          name: "Pushya",
          pada: 2,
        },
        longitude: 96.99226508208369,
        isRetrograde: false,
        dms: {
          d: 6,
          m: 59,
          s: 32,
        },
        signNumber: 4,
      },
    },
    {
      signLord: "Ma",
      starPlanet: {
        planet: "Ke",
        deg: 0.5835244705935314,
      },
      subLord: {
        planet: "Ju",
        deg: 70.02293647122377,
      },
      sLords: [
        {
          levelName: "Sub-Sub-Lord",
          planet: "Ju",
          deg: 83.1720235341783,
        },
        {
          levelName: "Sub-Sub-Sub-Lord",
          planet: "Ra",
          deg: 61.79017650633722,
        },
        {
          levelName: "Sub-Sub-Sub-Sub-Lord",
          planet: "Ve",
          deg: 8.601176708914807,
        },
      ],
      planet: {
        rashi: "Ar",
        graha: "Me",
        nakshatra: {
          name: "Ashwini",
          pada: 3,
        },
        longitude: 7.78032432949885,
        isRetrograde: false,
        dms: {
          d: 7,
          m: 46,
          s: 49,
        },
        signNumber: 1,
      },
    },
    {
      signLord: "Ma",
      starPlanet: {
        planet: "Ke",
        deg: 0.9565703125744762,
      },
      subLord: {
        planet: "Me",
        deg: 114.78843750893715,
      },
      sLords: [
        {
          levelName: "Sub-Sub-Lord",
          planet: "Ra",
          deg: 66.21250006308577,
        },
        {
          levelName: "Sub-Sub-Sub-Lord",
          planet: "Mo",
          deg: 38.08333375390515,
        },
        {
          levelName: "Sub-Sub-Sub-Sub-Lord",
          planet: "Sa",
          deg: 94.00000504686182,
        },
      ],
      planet: {
        rashi: "Ar",
        graha: "Ve",
        nakshatra: {
          name: "Ashwini",
          pada: 4,
        },
        longitude: 12.754267645758642,
        isRetrograde: false,
        dms: {
          d: 12,
          m: 45,
          s: 15,
        },
        signNumber: 1,
      },
    },
    {
      signLord: "Me",
      starPlanet: {
        planet: "Ma",
        deg: 4.795866966353333,
      },
      subLord: {
        planet: "Ve",
        deg: 18.50403596239991,
      },
      sLords: [
        {
          levelName: "Sub-Sub-Lord",
          planet: "Ju",
          deg: 76.02421577439947,
        },
        {
          levelName: "Sub-Sub-Sub-Lord",
          planet: "Ve",
          deg: 8.18161830799599,
        },
        {
          levelName: "Sub-Sub-Sub-Sub-Lord",
          planet: "Ve",
          deg: 14.08970984797594,
        },
      ],
      planet: {
        rashi: "Ge",
        graha: "Ma",
        nakshatra: {
          name: "Mrigashira",
          pada: 4,
        },
        longitude: 63.94487689848788,
        isRetrograde: false,
        dms: {
          d: 3,
          m: 56,
          s: 42,
        },
        signNumber: 3,
      },
    },
    {
      signLord: "Sa",
      starPlanet: {
        planet: "Ma",
        deg: 4.692973252224107,
      },
      subLord: {
        planet: "Ke",
        deg: 6.156790266892813,
      },
      sLords: [
        {
          levelName: "Sub-Sub-Lord",
          planet: "Me",
          deg: 105.54497600387678,
        },
        {
          levelName: "Sub-Sub-Sub-Lord",
          planet: "Ke",
          deg: 0.964536497953759,
        },
        {
          levelName: "Sub-Sub-Sub-Sub-Lord",
          planet: "Ve",
          deg: 16.53491139349301,
        },
      ],
      planet: {
        rashi: "Aq",
        graha: "Ju",
        nakshatra: {
          name: "Dhanishta",
          pada: 3,
        },
        longitude: 302.57290105307726,
        isRetrograde: false,
        dms: {
          d: 2,
          m: 34,
          s: 22,
        },
        signNumber: 11,
      },
    },
    {
      signLord: "Sa",
      starPlanet: {
        planet: "Mo",
        deg: 3.636673359800742,
      },
      subLord: {
        planet: "Me",
        deg: 109.40080317608906,
      },
      sLords: [
        {
          levelName: "Sub-Sub-Lord",
          planet: "Su",
          deg: 28.182140066510982,
        },
        {
          levelName: "Sub-Sub-Sub-Lord",
          planet: "Ra",
          deg: 50.64280133021964,
        },
        {
          levelName: "Sub-Sub-Sub-Sub-Lord",
          planet: "Ra",
          deg: 54.28534220146427,
        },
      ],
      planet: {
        rashi: "Cp",
        graha: "Sa",
        nakshatra: {
          name: "Shravana",
          pada: 3,
        },
        longitude: 288.488906008432,
        isRetrograde: false,
        dms: {
          d: 18,
          m: 29,
          s: 20,
        },
        signNumber: 10,
      },
    },
    {
      signLord: "Ma",
      starPlanet: {
        planet: "Ve",
        deg: 1.1946758459433031,
      },
      subLord: {
        planet: "Su",
        deg: 30.361101513196374,
      },
      sLords: [
        {
          levelName: "Sub-Sub-Lord",
          planet: "Sa",
          deg: 94.22203026392748,
        },
        {
          levelName: "Sub-Sub-Sub-Lord",
          planet: "Su",
          deg: 28.56019114059461,
        },
        {
          levelName: "Sub-Sub-Sub-Sub-Lord",
          planet: "Ra",
          deg: 58.20382281189222,
        },
      ],
      planet: {
        rashi: "Ar",
        graha: "Ur",
        nakshatra: {
          name: "Bharani",
          pada: 1,
        },
        longitude: 15.929007296991223,
        isRetrograde: false,
        dms: {
          d: 15,
          m: 55,
          s: 44,
        },
        signNumber: 1,
      },
    },
    {
      signLord: "Sa",
      starPlanet: {
        planet: "Ju",
        deg: 6.594354532946831,
      },
      subLord: {
        planet: "Ve",
        deg: 19.322543953619686,
      },
      sLords: [
        {
          levelName: "Sub-Sub-Lord",
          planet: "Ju",
          deg: 80.93526372171812,
        },
        {
          levelName: "Sub-Sub-Sub-Lord",
          planet: "Ma",
          deg: 45.014477912885866,
        },
        {
          levelName: "Sub-Sub-Sub-Sub-Lord",
          planet: "Ju",
          deg: 77.53390707804341,
        },
      ],
      planet: {
        rashi: "Aq",
        graha: "Ne",
        nakshatra: {
          name: "Purva Bhadrapada",
          pada: 3,
        },
        longitude: 327.92464512477596,
        isRetrograde: false,
        dms: {
          d: 27,
          m: 55,
          s: 29,
        },
        signNumber: 11,
      },
    },
    {
      signLord: "Sa",
      starPlanet: {
        planet: "Su",
        deg: 2.4483621408057203,
      },
      subLord: {
        planet: "Ju",
        deg: 80.80345689668644,
      },
      sLords: [
        {
          levelName: "Sub-Sub-Lord",
          planet: "Ma",
          deg: 44.02592672514831,
        },
        {
          levelName: "Sub-Sub-Sub-Lord",
          planet: "Ra",
          deg: 60.58731528825673,
        },
        {
          levelName: "Sub-Sub-Sub-Sub-Lord",
          planet: "Ke",
          deg: 0.5821019217115548,
        },
      ],
      planet: {
        rashi: "Cp",
        graha: "Pl",
        nakshatra: {
          name: "Uttara Aashada",
          pada: 2,
        },
        longitude: 272.64476038286915,
        isRetrograde: false,
        dms: {
          d: 2,
          m: 38,
          s: 41,
        },
        signNumber: 10,
      },
    },
    {
      signLord: "Ve",
      starPlanet: {
        planet: "Mo",
        deg: 3.6688302847669867,
      },
      subLord: {
        planet: "Me",
        deg: 113.2596341720384,
      },
      sLords: [
        {
          levelName: "Sub-Sub-Lord",
          planet: "Ra",
          deg: 55.420947096741656,
        },
        {
          levelName: "Sub-Sub-Sub-Lord",
          planet: "Sa",
          deg: 86.13964731161104,
        },
        {
          levelName: "Sub-Sub-Sub-Sub-Lord",
          planet: "Sa",
          deg: 97.51356196806975,
        },
      ],
      planet: {
        rashi: "Ta",
        graha: "Ra",
        nakshatra: {
          name: "Rohini",
          pada: 3,
        },
        longitude: 48.91772490079221,
        isRetrograde: true,
        dms: {
          d: 18,
          m: 55,
          s: 4,
        },
        signNumber: 2,
      },
    },
    {
      signLord: "Ma",
      starPlanet: {
        planet: "Me",
        deg: 8.16883365976783,
      },
      subLord: {
        planet: "Ke",
        deg: 3.260039172139699,
      },
      sLords: [
        {
          levelName: "Sub-Sub-Lord",
          planet: "Ra",
          deg: 55.886385808109125,
        },
        {
          levelName: "Sub-Sub-Sub-Lord",
          planet: "Sa",
          deg: 89.24257205406084,
        },
        {
          levelName: "Sub-Sub-Sub-Sub-Lord",
          planet: "Me",
          deg: 117.11098139406849,
        },
      ],
      planet: {
        rashi: "Sc",
        graha: "Ke",
        nakshatra: {
          name: "Jyestha",
          pada: 1,
        },
        longitude: 228.91772490079222,
        isRetrograde: true,
        dms: {
          d: 18,
          m: 55,
          s: 4,
        },
        signNumber: 8,
      },
    },
    {
      signLord: "Me",
      starPlanet: {
        planet: "Ra",
        deg: 5.9921884555686065,
      },
      subLord: {
        planet: "Ma",
        deg: 49.06261466823278,
      },
      sLords: [
        {
          levelName: "Sub-Sub-Lord",
          planet: "Ve",
          deg: 26.93053716970485,
        },
        {
          levelName: "Sub-Sub-Sub-Lord",
          planet: "Ke",
          deg: 6.583223018229091,
        },
        {
          levelName: "Sub-Sub-Sub-Sub-Lord",
          planet: "Me",
          deg: 112.85525174107013,
        },
      ],
      planet: {
        rashi: "Ge",
        graha: "La",
        nakshatra: {
          name: "Ardra",
          pada: 4,
        },
        longitude: 79.89582610028657,
        isRetrograde: true,
        dms: {
          d: 19,
          m: 53,
          s: 45,
        },
        signNumber: 3,
      },
    },
  ]);

  // useEffect(() => {
  //   axios.get("http://localhost:3000/api/planetdetails").then((res) => {
  //     setPlanetDetails(res.data.planetSublords);
  //   });
  // }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = planetDetails.map((n, i) => n[i]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
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
              {planetDetails.map((item, i) => {
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
                      <TableCell padding="checkbox">
                        <Checkbox selected={isItemSelected} checked={isItemSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="normal">
                        {item.planet.graha}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.planet.signNumber}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.planet.dms.d} : {item.planet.dms.m} :{item.planet.dms.s}
                      </TableCell>
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell component="th" scope="row">
                        {item.planet.nakshatra.name}
                        {item.planet.nakshatra.pada}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.signLord}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.starPlanet.planet}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.subLord.planet}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item["sLords"][0].planet}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item["sLords"][1].planet}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item["sLords"][2].planet}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
            </Table>
          </TableContainer>
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </div>
    </Container>
  );
}
