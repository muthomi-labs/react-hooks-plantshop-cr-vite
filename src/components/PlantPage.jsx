import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const API_URL = "http://localhost:6001/plants";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [soldOutIds, setSoldOutIds] = useState(() => new Set());

  // Fetch all plants when the page loads
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  const handleToggleSoldOut = (plantId) => {
    setSoldOutIds((prev) => {
      const next = new Set(prev);
      if (next.has(plantId)) {
        next.delete(plantId);
      } else {
        next.add(plantId);
      }
      return next;
    });
  };

  // Filter plants by name using String.includes() (case-insensitive)
  const visiblePlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <main>
      <NewPlantForm setPlants={setPlants} />
      <Search searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <PlantList
        plants={visiblePlants}
        soldOutIds={soldOutIds}
        onToggleSoldOut={handleToggleSoldOut}
      />
    </main>
  );
}

export default PlantPage;
