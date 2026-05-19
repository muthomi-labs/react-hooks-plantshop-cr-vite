import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, soldOutIds, onToggleSoldOut }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          isSoldOut={soldOutIds.has(plant.id)}
          onToggleSoldOut={onToggleSoldOut}
        />
      ))}
    </ul>
  );
}

export default PlantList;
