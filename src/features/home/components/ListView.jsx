import React from "react";
import cn from "classnames";
import { Filters } from "./Filters";
import { DogCard } from "./DogCard";
import { Stack } from "react-bootstrap";

export function ListView({ className }) {
  return (
    <div className={cn(className)}>
      <div className="d-flex flex-column mx-auto">
        <Filters className={"border-bottom"} />
        <Stack gap={4} direction="horizontal" className="flex-wrap p-2">
          <DogCard
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
          <DogCard
            dog={{
              img: "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_12025.jpg",
              name: "Ada",
              age: 3,
              breed: "Affenpinscher",
              zip_code: "71923",
              id: "WHGFTIcBOvEgQ5OCx8A2",
              favourite: true,
            }}
          />
          <DogCard
            dog={{
              img: "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_12025.jpg",
              name: "Ada",
              age: 3,
              breed: "Affenpinscher",
              zip_code: "71923",
              id: "WHGFTIcBOvEgQ5OCx8A2",
              favourite: true,
            }}
          />
          <DogCard
            dog={{
              img: "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_12025.jpg",
              name: "Ada",
              age: 3,
              breed: "Affenpinscher",
              zip_code: "71923",
              id: "WHGFTIcBOvEgQ5OCx8A2",
              favourite: true,
            }}
          />
        </Stack>
      </div>
    </div>
  );
}
