import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles(theme => ({
  table: {
    width: 300
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  1: {color: "#ffd700"},
  2: {color: "#C0C0C0"},
  3: {color: "#cd7f32"},

}));

export default function ContributionTable({ rows, text }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="right">{text}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.u}>
              <TableCell component="th" scope="row">
                {row.rank}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.rank <= 3 && (
                  <FontAwesomeIcon icon={faCrown} className={`${classes.icon} ${classes[row.rank]}`} />
                )}
                {row.u}
              </TableCell>
              <TableCell align="right">{row.p}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ContributionTable.propTypes = {
  rows: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired
};
