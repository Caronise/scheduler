import React from "react";
import "components/DayListItem.scss";

const classNames = require('classnames');

export default function DayListItem({ name, spots, selected, setDay }) {

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots

  });

  const formatSpots = (spots) => {
    if (!spots) {
      return "no spots remaining";
    } else if (spots === 1) {
      return `${spots} spot remaining`;
    } else {
      return `${spots} spots remaining`;
    }
  }

  return (
    <li data-testid="day" className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
};