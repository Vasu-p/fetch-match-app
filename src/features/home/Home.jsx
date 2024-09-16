import React, { useCallback } from "react";
import { SelectionView } from "./components/SelectionView";
import { ListView } from "./components/ListView";

export function Home() {
  const [favouritedDogs, setFavouritedDogs] = React.useState([]);

  const handleFavouriteToggle = useCallback((dog) => {
    setFavouritedDogs((prevFavouritedDogs) => {
      if (prevFavouritedDogs.some((favDog) => favDog.id === dog.id)) {
        return prevFavouritedDogs.filter((favDog) => favDog.id !== dog.id);
      } else {
        return [...prevFavouritedDogs, dog];
      }
    });
  }, []);

  const handleMatch = useCallback(() => {
    alert("Matching not implemented yet");
  }, []);

  return (
    <div className="h-100 d-flex">
      <ListView
        className={"col-lg-9 border-end"}
        favouritedDogs={favouritedDogs}
        onFavouriteToggle={handleFavouriteToggle}
      />
      <SelectionView
        className={"col-lg-3"}
        favouritedDogs={favouritedDogs}
        onFavouriteToggle={handleFavouriteToggle}
        onMatch={handleMatch}
      />
    </div>
  );
}
