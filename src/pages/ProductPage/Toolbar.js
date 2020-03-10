import React from "react";

import Grid from "@material-ui/core/Grid";

import { LikeButtonContainer, SaveButtonContainer } from "../../containers";
import { ReportButton } from "../../components";

function Toolbar({ productId }) {

  return (
    <Grid container >
      <Grid item xs={12} sm container>
        <Grid item xs>
          <LikeButtonContainer likeOrDislike="like" productId={productId} />
        </Grid>
        <Grid item xs>
          <LikeButtonContainer likeOrDislike="dislike" productId={productId} />
        </Grid>
        <Grid item xs>
          <SaveButtonContainer productId={productId} />
        </Grid>
        <Grid item xs>
          <ReportButton />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Toolbar;
