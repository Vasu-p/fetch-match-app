import React, { useCallback, useState } from "react";
import cn from "classnames";
import { Filters } from "./Filters";
import { DogCard } from "./DogCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "react-bootstrap";
import { useInfinitePaginatedDogData } from "../hooks/useInfinitePaginatedDogData";
import { Link } from "react-router-dom";

export function ListView({ className, favouritedDogs, onFavouriteToggle }) {
  const [filters, setFilters] = useState({
    breeds: [],
    zipCodes: [],
    ageMin: 0,
    ageMax: 100,
  });

  const { dogs, loading, error, total, hasMore, loadMore } =
    useInfinitePaginatedDogData(filters);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  }, []);

  const isDogFavourited = useCallback(
    (dog) => {
      return favouritedDogs.some((favDog) => favDog.id === dog.id);
    },
    [favouritedDogs]
  );

  return (
    <div className={cn(className)}>
      <div className="d-flex flex-column mx-auto h-100">
        <Filters
          className={"border-bottom"}
          onFilterChange={handleFilterChange}
        />
        {loading && (
          <div
            style={{
              flexBasis: "fit-content",
              alignSelf: "center",
            }}
          >
            <Spinner
              animation="border"
              variant="warning"
              style={{ height: "75px", width: "75px" }}
            />
          </div>
        )}
        {error && <div>Error: {error.message}</div>}
        {error && error.status === 401 && (
          <p>
            <Link to="/login">Login</Link> to view the page
          </p>
        )}
        {!loading && (
          <>
            <div className="ms-5 mt-5">
              <h4>{total} dogs found !!</h4>
            </div>
            <div
              id="scrollableDiv"
              className="p-5 flex-grow-1 overflow-scroll overflow-x-hidden"
            >
              <InfiniteScroll
                dataLength={dogs.length}
                next={loadMore}
                hasMore={hasMore}
                loader={
                  <Spinner
                    animation="border"
                    variant="warning"
                    style={{ height: "75px", width: "75px", float: "clear" }}
                  />
                }
                scrollableTarget="scrollableDiv"
                className="d-flex flex-wrap flex-row"
                style={{ gap: "1rem" }}
              >
                {dogs.map((dog) => (
                  <DogCard
                    key={dog.id}
                    dog={dog}
                    onFavouriteToggle={(dog) => onFavouriteToggle(dog)}
                    isFavourite={isDogFavourited(dog)}
                  />
                ))}
              </InfiniteScroll>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
