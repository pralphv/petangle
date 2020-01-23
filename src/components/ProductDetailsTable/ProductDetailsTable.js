import React from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import QuestionMarkAnnotation from "../QuestionMarkAnnotation";
import { TABLE_KEY_MAP, DRY_MATTER_NUTRIENTS } from "./constants";
import EnhancedTableToolbar from "./ToolBar";
import {HelmetWrapper} from ".."

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: 300,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2)
  },
  tableWrapper: {},
  title: {
    flex: "1 1 100%"
  },
  tableRow:{
    height: 33
  }
}));

export default function ProductDetailsTable({ productDetails }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HelmetWrapper
        title={`${productDetails.b} - ${productDetails.pr} Dry Matter Analysis`}
        content={`${productDetails.b} - ${productDetails.pr}: ${productDetails.a} ${productDetails.fc} Protein ${productDetails.pro}%; Fat ${productDetails.f}%; Carbohydrates ${productDetails.cb}%; Fibre ${productDetails.fi}%; Crude Ash ${productDetails.cra}%; Wet Matter ${productDetails.wm}%;`}
      />
      <Paper className={classes.paper}>
        <EnhancedTableToolbar title={productDetails.pr} history={history}/>

        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <TableBody >
              {Object.entries(TABLE_KEY_MAP).map(([key, value], index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow hover tabIndex={-1} key={key} className={classes.tableRow}>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {value}
                      {key === "cb" && (
                        <QuestionMarkAnnotation text="Could be negative due to imprecise nutritional values" />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {value === "Link" ? (
                        <a
                          href={productDetails.li}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Click Here
                        </a>
                      ) : (
                        productDetails[key]
                      )}
                      {DRY_MATTER_NUTRIENTS.has(key) && (
                        <QuestionMarkAnnotation text="Dry Matter" />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </div>
  );
}
