import React from "react";

import Grid from "@material-ui/core/Grid";

import { ContributionTableContainer } from "../../containers";
import { PointBoxContainer } from "../../containers";
import { HelmetWrapper } from "../../components";
import { useLanguage } from "../../utils/customHooks";

export default function ContributionPage() {
  const locale = useLanguage() || "en";

  return (
    <div>
      <HelmetWrapper
        title="Contribution"
        content="We thank all of you for joining us!"
      />
      <Grid container>
        <PointBoxContainer name="you" locale={locale} />
        <PointBoxContainer name="users" locale={locale} />
        <PointBoxContainer name="pets" locale={locale} />
      </Grid>
      <ContributionTableContainer locale={locale} />
    </div>
  );
}
