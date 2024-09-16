import React from "react";
import cn from "classnames";
import { DogCard } from "./DogCard";

export function SelectionView({
  className,
  favouritedDogs,
  onFavouriteToggle,
}) {
  return (
    <div className={cn(className)}>
      {favouritedDogs.length === 0 && (
        <div className="d-flex flex-column align-items-center justify-content-center h-100">
          <h2 className="text-center">
            Favourite some dogs to do the matching !!
          </h2>
        </div>
      )}
      {favouritedDogs.length > 0 && (
        <div className="d-flex flex-column h-100">
          <h2 className="m-5">Favourites</h2>
          <div
            className="d-flex flex-column align-items-center overflow-scroll flex-grow-1"
            style={{ gap: "1rem" }}
          >
            {favouritedDogs.map((dog) => (
              <DogCard
                key={dog.id}
                dog={dog}
                isFavourite={true}
                onFavouriteToggle={onFavouriteToggle}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
