import React, { useEffect, useState } from "react";
import { useFirebase } from "react-redux-firebase";

import { ContributionTable, LoadingSpinner } from "../../components";
import { fetchContributionTop10 } from "../../firebase/crud";

function ContributionTableContainer() {
  const [rows, setRows] = useState([]);
  const firebase = useFirebase();

  useEffect(() => {
    async function fetchData() {
      const top10 = await fetchContributionTop10(firebase);
      setRows(top10);
    }
    fetchData();
  }, []);

  return rows.length > 0 ? <ContributionTable rows={rows} />: <LoadingSpinner/>;
}

export default ContributionTableContainer;
