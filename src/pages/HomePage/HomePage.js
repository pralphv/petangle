import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { ProductsTableContainer } from "../../containers";
import { AnimalSelectContainer } from "../../containers";
import { BrandSelectContainer } from "../../containers";
import { FoodCategorySelectContainer } from "../../containers";
import { useWindow } from "../../utils/customHooks";
import { HelmetWrapper } from "../../components";

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: theme.spacing(1)
  }
}));

const HomePage = ({ history }) => {
  const classes = useStyles();
  const { width, height } = useWindow();
  let display = "inline-flex";
  if (width <= 600) {
    display = "block";
  }
  return (
    <div>
      <HelmetWrapper 
        title="Petangle - Your Pet's Nutrition Table" 
        content="Find the best products for your pet with our nutrition table. 500+ cat & dog dry food/wet food/snack products. Share what your pet likes and see what others also like." 
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
