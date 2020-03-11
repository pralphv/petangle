import React from "react";

import Grid from "@material-ui/core/Grid";

import { ContributionTableContainer } from "../../containers";
import { PointBoxContainer } from "../../containers";
import { HelmetWrapper } from "../../components";
import { useLanguage } from "../../utils/customHooks";

const TEXT = {
  en: "Ranking",
  zh: "排名",
  jp: "ランキング"
}

export default function ContributionPage() {
  const locale = useLanguage() || "en";

  return (
    <div>
      <HelmetWrapper
        title={TEXT[locale]}
        content={TEXT[locale]}
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
