import React from "react";
import cn from "classnames";
import { Filters } from "./Filters";
import { DogCard } from "./DogCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "react-bootstrap";

export function ListView({ className }) {
  return (
    <div className={cn(className)}>
      <div className="d-flex flex-column mx-auto h-100">
        <Filters className={"border-bottom"} />
        <div id="scrollableDiv" className="p-5 flex-grow-1 overflow-scroll">
          <InfiniteScroll
            dataLength={25}
            next={() => {}}
            hasMore={true}
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
            {Array(25)
              .fill(1)
              .map((i) => (
                <DogCard
                  key={i}
                  dog={{
                    img: "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_12025.jpg",
                    name: "Ada",
                    age: 3,
                    breed: "American Staffordshire Terrier",
                    zip_code: "71923",
                    id: "WHGFTIcBOvEgQ5OCx8A2",
                    favourite: true,
                  }}
                />
              ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}
