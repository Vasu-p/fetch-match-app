import React, { useCallback, useState } from "react";
import cn from "classnames";
import { Filters } from "./Filters";
import { DogCard } from "./DogCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { FloatingLabel, Form, Spinner } from "react-bootstrap";
import { useInfinitePaginatedDogData } from "../hooks/useInfinitePaginatedDogData";
import { Link } from "react-router-dom";

export function ListView({ className, favouritedDogs, onFavouriteToggle }) {
  const [filters, setFilters] = useState({
    breeds: [],
    zipCodes: [],
    ageMin: 0,
    ageMax: 100,
  });
  const [sort, setSort] = useState("breed:asc");

  const { dogs, loading, error, total, hasMore, loadMore } =
    useInfinitePaginatedDogData(filters, sort);

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
        {!loading && (
          <>
            <div className="ms-5 mt-5 me-5 d-flex align-items-center">
              <h4>{total} dogs found !!</h4>
              <FloatingLabel label="Sort By" className="ms-auto">
                <Form.Select
                  style={{ width: "200px" }}
                  onChange={(e) => setSort(e.target.value)}
                  value={sort}
                >
                  <option value={"breed:asc"}>Breed Asc</option>
                  <option value={"breed:desc"}>Breed Desc</option>
                  <option value={"age:asc"}>Age Asc</option>
                  <option value={"age:desc"}>Age Desc</option>
                  <option value={"name:asc"}>Name Asc</option>
                  <option value={"name:desc"}>Name Desc</option>
                </Form.Select>
              </FloatingLabel>
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
                    showFavourite={true}
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
