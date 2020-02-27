import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useFirebase } from "react-redux-firebase";

import { ContributionTable, LoadingSpinner } from "../../components";
import { fetchContributionTop10 } from "../../firebase/crud";

const TEXT = {
  "en": "Points",
  "jp": "ポイント",
  "zh": "分數",
}

function ContributionTableContainer({ locale }) {
  if (!locale) {
    locale = "eng";
  }
  const [rows, setRows] = useState([]);
  const firebase = useFirebase();

  useEffect(() => {
    async function fetchData() {
      const top10 = await fetchContributionTop10(firebase);
      setRows(top10);
    }
    fetchData();
  }, []);

  return rows.length > 0 ? (
    <ContributionTable rows={rows} text={TEXT[locale]}/>
  ) : (
    <LoadingSpinner />
  );
}

ContributionTable.propTypes = {
  locale: PropTypes.string
};

export default ContributionTableContainer;
