import React from "react";
import cn from "classnames";
import { DogCard } from "./DogCard";

export function SelectionView({
  className,
  favouritedDogs,
  onFavouriteToggle,
}) {
  return (
    <div
      className={cn(
        className,
        "d-flex flex-column justify-content-center align-items-center"
      )}
    >
      {favouritedDogs.length === 0 && (
        <h2 className="text-center">
          Favourite some dogs to do the matching !!
        </h2>
      )}
      {favouritedDogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          isFavourite={true}
          onFavouriteToggle={onFavouriteToggle}
        />
      ))}
    </div>
  );
}
