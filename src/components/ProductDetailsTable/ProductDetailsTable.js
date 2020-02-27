import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import QuestionMarkAnnotation from "../QuestionMarkAnnotation";
import { DRY_MATTER_NUTRIENTS } from "./constants";
import { NUTRITION_LANG, MISC_LANG } from "../../utils/constants";
import EnhancedTableToolbar from "./ToolBar";
import { HelmetWrapper } from "..";

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
  tableRow: {
    height: 33
  }
}));

const TEXT = {
  Protein: {
    en: "Protein",
    jp: "蛋白質",
    zh: "蛋白質"
  },
  Fat: {
    en: "Fat",
    jp: "脂質",
    zh: "脂肪"
  },
  Carbohydrates: {
    en: "Carbohydrates",
    jp: "炭水化物",
    zh: "碳水化合物"
  }
};

const NEGATIVE_ANNOTATION = {
  en: "Could be negative due to imprecise nutritional values",
  zh: "營養數值不準確，計算結果有機會變成負數",
  jp: "データが詳しくない場合、マイナスの値になるかもしれない"
};

const DRY_MATTER_ANNOTATION = {
  en: "Dry Matter",
  zh: "乾物質",
  jp: "乾物"
};

const NUTRITION = {
  en: "Nutrition",
  zh: "營養",
  jp: "栄養"
};

const HIGH_PROTEIN = {
  en: "High Protein",
  zh: "高蛋白質",
  jp: "高タンパク質"
};

const LOW_CARBS = {
  en: "Low Carbohydrates",
  zh: "低碳水化合物",
  jp: "低炭水化物"
};

export default function ProductDetailsTable({ productDetails, locale }) {
  const classes = useStyles();
  const isHighProtein = productDetails.pro > 43;
  const isLowCarbs = productDetails.cb < 25;

  let description =
    `${MISC_LANG[productDetails.a][locale]} ` +
    `${MISC_LANG[productDetails.fc][locale]} ` +
    `${TEXT.Protein[locale]} ${productDetails.pro}% ` +
    `${TEXT.Fat[locale]} ${productDetails.f}% ` +
    `${TEXT.Carbohydrates[locale]} ${productDetails.cb}% `;

  description = isHighProtein
    ? `${HIGH_PROTEIN[locale]} ${description}`
    : description;

  description = isLowCarbs
    ? `${LOW_CARBS[locale]} ${description}`
    : description;

  return (
    <div className={classes.root}>
      <HelmetWrapper
        title={`${productDetails.b} - ${productDetails.pr} ${NUTRITION[locale]}`}
        content={description}
      />
      <Paper className={classes.paper}>
        <EnhancedTableToolbar title={productDetails.pr} history={history} />

        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <TableBody>
              {Object.entries(NUTRITION_LANG).map(([key, value], index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={key}
                    className={classes.tableRow}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {value[locale]}
                      {key === "cb" && (
                        <QuestionMarkAnnotation
                          text={NEGATIVE_ANNOTATION[locale]}
                        />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {value.en === "Link" ? (
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
                        <QuestionMarkAnnotation
                          text={DRY_MATTER_ANNOTATION[locale]}
                        />
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

ProductDetailsTable.propTypes = {
  productDetails: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired
};
