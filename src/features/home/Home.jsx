import React, { useCallback } from "react";
import { SelectionView } from "./components/SelectionView";
import { ListView } from "./components/ListView";
import { MatchModal } from "./components/MatchModal";
import { axiosInstance } from "src/axios";

export function Home() {
  const [favouritedDogs, setFavouritedDogs] = React.useState([]);
  const [showMatchModal, setShowMatchModal] = React.useState(false);
  const [matchedDog, setMatchedDog] = React.useState(null);

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
    const dogIds = favouritedDogs.map((dog) => dog.id);
    axiosInstance.post("/dogs/match", dogIds).then((response) => {
      const matchedId = response.data.match;
      const matchedDog = favouritedDogs.find((dog) => dog.id === matchedId);
      setMatchedDog(matchedDog);
      setShowMatchModal(true);
    });
  }, [favouritedDogs]);

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
      <MatchModal
        matchedDog={matchedDog}
        show={showMatchModal}
        onClose={() => setShowMatchModal(false)}
      />
    </div>
  );
}
