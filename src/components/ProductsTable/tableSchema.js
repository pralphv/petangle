export const columnDefs = [
    {
      headerName: "Brand",
      field: "b",
      width: 100
    },
    {
      headerName: "Product",
      field: "pr",
      width: 100,
      cellStyle: {color: "blue", cursor: "pointer"}

    },
    {
      headerName: "Protein (%)",
      field: "pro",
      filter: "agNumberColumnFilter",
      width: 120
    },
    {
      headerName: "Fat (%)",
      field: "f",
      filter: "agNumberColumnFilter",
      width: 80
    },
  
    {
      headerName: "Carbohydrates (%)",
      field: "cb",
      filter: "agNumberColumnFilter",
      width: 150
    },
    {
      headerName: "Fibre (%)",
      field: "fi",
      filter: "agNumberColumnFilter",
      width: 90
    },
  
    {
      headerName: "Wet matter (%)",
      field: "wm",
      filter: "agNumberColumnFilter",
      width: 130
    },
    {
      headerName: "Crude Ash (%)",
      field: "cra",
      filter: "agNumberColumnFilter",
      width: 130
    },
  
    {
      headerName: "Calcium (%)",
      field: "Ca",
      filter: "agNumberColumnFilter",
      width: 110
    },
    {
      headerName: "Calories (kcal/kg)",
      field: "cl",
      filter: "agNumberColumnFilter",
      width: 145
    },
    {
      headerName: "Magnesium (%)",
      field: "Mg",
      filter: "agNumberColumnFilter",
      width: 130
    },
    {
      headerName: "Phosphorus (%)",
      field: "P",
      filter: "agNumberColumnFilter",
      width: 130
    },
    {
      headerName: "Taurine (%)",
      field: "t",
      sortable: true,
      filter: "agNumberColumnFilter",
      width: 110
    },
  ];
  export const defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true
  };
  