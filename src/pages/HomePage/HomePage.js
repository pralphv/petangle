import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { ProductsTableContainer } from "../../containers";
import { AnimalSelectContainer } from "../../containers";
import { BrandSelectContainer } from "../../containers";
import { FoodCategorySelectContainer } from "../../containers";
import { useWindow, useLanguage } from "../../utils/customHooks";
import { HelmetWrapper } from "../../components";

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: theme.spacing(1)
  }
}));

const TITLE = {
  "en/": "Petangle - Your Pet's Nutrition Table",
  "zh/": "Petangle - 你的寵物糧食營養網",
  "jp/": "Petangle - ペットの食品栄養サイト"
};

const CONTENT = {
  "en/":
    "Find the best products for your pet with our nutrition database. 500+ cat & dog dry food/wet food/snack. Find high protein and low carb food.",
  "zh/":
    "為你的貓狗尋找最好的糧食。500+ 貓狗糧、乾糧、濕糧、小食營養。找高蛋白質低碳水化合物",
  "jp/":
    "猫と犬に最適な食べ物を見つけろ！500+ キャットフード，ドッグフード，ドライフード，ウェットフード，スナック栄養。高タンパク,質低炭水化物食品を探す。"
};

const HomePage = ({ history }) => {
  const classes = useStyles();
  const { width, height } = useWindow();
  const reduxLocale = useLanguage();
  let currentLanguage = history.location.pathname.replace("/", "");

  if (!currentLanguage && currentLanguage !== reduxLocale) {
    history.push(`${reduxLocale}/`);
  }
  const display = width <= 600 ? "block" : "inline-flex";
  return (
    <div>
      <HelmetWrapper
        title={TITLE[currentLanguage]}
        content={CONTENT[currentLanguage]}
      />

      <div style={{ display: display }} className={classes.margin}>
        <AnimalSelectContainer />
        <FoodCategorySelectContainer />
        <BrandSelectContainer />
      </div>

      <ProductsTableContainer history={history} />
    </div>
  );
};

export default HomePage;
