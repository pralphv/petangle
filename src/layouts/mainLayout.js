import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import * as pages from "../pages";
import CustomRoute from "./customRoute";
import * as constants from "./constants";

const history = createBrowserHistory();

const MainLayout = () => {
  return (
    <Router history={history}>
      <Switch>
        <CustomRoute
          exact
          path={constants.PAGE_LOGIN}
          component={pages.LoginPage}
        />
        <CustomRoute
          exact
          path={constants.PAGE_ADD_PRODUCT}
          component={pages.AddProductPage}
          isPrivate={true}

        />
        <CustomRoute
          exact
          path={constants.PAGE_CONTRIBUTION}
          component={pages.ContributionPage}
        />
        <CustomRoute
          exact
          path={constants.PAGE_ADD_PETS}
          component={pages.AddPetPage}
          isPrivate={true}
        />
        <CustomRoute
          exact
          path={constants.PAGE_MY_PETS}
          component={pages.MyPetsPage}
          isPrivate={true}
        />
        <CustomRoute
          exact
          path={constants.PAGE_MY_PRODUCTS}
          component={pages.MyProductsPage}
          isPrivate={true}
        />
        <CustomRoute
          exact
          path={constants.PAGE_HOME}
          component={pages.HomePage}
        />
        <CustomRoute
          path={`${constants.PAGE_PRODUCT}/:id`}
          component={pages.ProductPage}
        />
        <CustomRoute
          path={constants.PAGE_REGISTER}
          component={pages.RegisterPage}
        />
        <CustomRoute
          path={constants.PAGE_FORGOT_PW}
          component={pages.ForgotPasswordPage}
        />
        <CustomRoute
          path={constants.PAGE_VERIFY}
          component={pages.VerifyPage}
        />
        <Route component={pages.Error404Page} />
      </Switch>
    </Router>
  );
};

export default MainLayout;
