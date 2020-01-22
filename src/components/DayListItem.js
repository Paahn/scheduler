import React from "react";
import "./DayListItem.scss";
var classnames = require('classnames');

export default function DayListItem(props) {
  const dayClass = classnames( "day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  const formatSpots = (spots) => {
   switch (props.spots) {
     case 0:
      return ("no spots remaining");
     case 1:
      return ("1 spot remaining");
     case 2:
      return ("2 spots remaining");
     default:
       props.spots = null;
   }
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
