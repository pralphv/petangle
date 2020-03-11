import React from "react";
import PropTypes from "prop-types";

import { useLanguage } from "../../utils/customHooks";
import Card from "../Card";

export default function Cards({ productsObj, history, icon, label }) {
  const locale = useLanguage();

  const cardsToLoop = Object.entries(productsObj);
  const finishedLoading = Object.values(productsObj).every(elem => !!elem);

  function handleOnClick(id) {
    let path = `/product/${id}`;
    path = locale ? `/${locale}${path}` : path;
    history.push(path);
    window.scrollTo(0, 0);
  }

  return (
    finishedLoading && (
      <div>
        {cardsToLoop.map(([key, value]) => (
          <Card
            key={key}
            handleOnClick={() => {
              // product/${value.pi} is for page submittedProducts
              const path = value.pi ? `product/${value.pi}` : key;
              handleOnClick(path);
            }}
            title={value.pr}
            subtitle={value.b}
            icon={icon || value.a}
            history={history}
            label={label}
          />
        ))}
      </div>
    )
  );
}

Cards.propTypes = {
  productsObj: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  likeOrDislike: PropTypes.string
};
