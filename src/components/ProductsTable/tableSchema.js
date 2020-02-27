import {NUTRITION_LANG, MISC_LANG} from "../../utils/constants";

export function createColumnDefs(locale) {
  return [
    {
      headerName: NUTRITION_LANG.b[locale],
      field: "b",
      width: 100
    },
    {
      headerName: MISC_LANG.pr[locale],
      field: "pr",
      width: 100,
      cellStyle: { color: "blue", cursor: "pointer" }
    },
    {
      headerName: NUTRITION_LANG.pro[locale],
      field: "pro",
      filter: "agNumberColumnFilter",
      width: 120
    },
    {
      headerName: NUTRITION_LANG.f[locale],
      field: "f",
      filter: "agNumberColumnFilter",
      width: 80
    },

    {
      headerName: NUTRITION_LANG.cb[locale],
      field: "cb",
      filter: "agNumberColumnFilter",
      width: 150
    },
    {
      headerName: NUTRITION_LANG.fi[locale],
      field: "fi",
      filter: "agNumberColumnFilter",
      width: 90
    },

    {
      headerName: NUTRITION_LANG.wm[locale],
      field: "wm",
      filter: "agNumberColumnFilter",
      width: 130
    },
    {
      headerName: NUTRITION_LANG.cra[locale],
      field: "cra",
      filter: "agNumberColumnFilter",
      width: 130
    },

    {
      headerName: NUTRITION_LANG.Ca[locale],
      field: "Ca",
      filter: "agNumberColumnFilter",
      width: 110
    },
    {
      headerName: NUTRITION_LANG.cl[locale],
      field: "cl",
      filter: "agNumberColumnFilter",
      width: 145
    },
    {
      headerName: NUTRITION_LANG.Mg[locale],
      field: "Mg",
      filter: "agNumberColumnFilter",
      width: 130
    },
    {
      headerName: NUTRITION_LANG.P[locale],
      field: "P",
      filter: "agNumberColumnFilter",
      width: 130
    },
    {
      headerName: NUTRITION_LANG.t[locale],
      field: "t",
      sortable: true,
      filter: "agNumberColumnFilter",
      width: 110
    }
  ];
}

export const defaultColDef = {
  resizable: true,
  sortable: true,
  filter: true
};
