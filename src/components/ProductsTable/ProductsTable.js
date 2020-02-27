import React, { useCallback, useState, useRef } from "react";
import PropTypes from "prop-types";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import { createColumnDefs, defaultColDef } from "./tableSchema";
import { useWindow } from "../../utils/customHooks";
import { PAGE_PRODUCT } from "../../layouts/constants";

import "./styles.css";

const ProductsTable = ({ data, filter, history, locale }) => {
  const { width, height } = useWindow();
  const filterAnimal = useRef(filter.animal);
  const filterBrand = useRef(filter.brand);
  const filterFoodCategory = useRef(filter.foodCategory);
  const [gridApi, setGridApi] = useState();
  // aggrid updates uses reference, not deep copies
  filterAnimal.current = filter.animal;
  filterBrand.current = filter.brand;
  filterFoodCategory.current = filter.foodCategory;

  if (gridApi) {
    gridApi.api.onFilterChanged();
  }

  const onGridReady = useCallback(params => {
    const { api, columnApi } = params;
    setGridApi({ api, columnApi });
    window.onresize = () => {
      api.sizeColumnsToFit();
    };
  }, []);
  let columnDefs = createColumnDefs(locale)
  // 1 is product
  columnDefs[1].cellRenderer = params => {
    var link = document.createElement("a");
    link.innerText = params.value;
    link.addEventListener("click", e => {
      let path = `${PAGE_PRODUCT}/${params.data.id}`;
      path = locale ? `/${locale}${path}` : path;
      history.push(path);
    });
    return link;
  };

  function doesExternalFilterPass(node) {
    const hasBrand = !!filterBrand.current;
    const sameAnimal = filterAnimal.current === node.data.a;
    const sameBrand = filterBrand.current === node.data.b;
    const sameFoodCategory = filterFoodCategory.current === node.data.fc;
    if (hasBrand) {
      if (sameAnimal && sameFoodCategory && sameBrand) {
        return true;
      }
    } else {
      if (sameAnimal && sameFoodCategory) {
        return true;
      }
    }
    return false;
  }
  const heightMultiplier = width < 600 ? 0.55 : 0.7;

  return (
    <div
      className="ag-theme-balham"
      style={{
        height: height * heightMultiplier,
        width: width * 0.8
      }}
    >
      <AgGridReact
        columnDefs={columnDefs}
        rowData={data}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        isExternalFilterPresent={() => true}
        doesExternalFilterPass={doesExternalFilterPass}
        getRowHeight={() => 35}
        onGridReady={onGridReady}
      />
    </div>
  );
};

ProductsTable.propTypes = {
  data: PropTypes.array.isRequired,
  filter: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  locale: PropTypes.string
};

export default ProductsTable;
