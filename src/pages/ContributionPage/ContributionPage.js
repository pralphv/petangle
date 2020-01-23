import React from "react";

import { ContributionTableContainer } from "../../containers";
import { PointBoxContainer } from "../../containers";
import Grid from "@material-ui/core/Grid";
import { HelmetWrapper } from "../../components";

export default function ContributionPage() {
  return (
    <div>
      <HelmetWrapper
        title="Contribution"
        content="We thank all of you for joining us!"
      />
      <Grid container>
        <PointBoxContainer name="you" />
        <PointBoxContainer name="users" />
        <PointBoxContainer name="pets" />
      </Grid>
      <ContributionTableContainer />
    </div>
  );
}
