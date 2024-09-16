import React from "react";
import { FloatingLabel, Form, Stack } from "react-bootstrap";
import cn from "classnames";
import { BreedSelect } from "./BreedSelect";

export function Filters({ className, onFilterChange }) {
  return (
    <div className={cn(className, "mt-4 p-4")}>
      <h2>Filters</h2>
      <Stack direction={"horizontal"} gap={4} className={cn("flex-wrap")}>
        <BreedSelect
          className={"flex-grow-1"}
          onBreedChange={(breed) =>
            onFilterChange("breeds", breed !== "" ? [breed] : [])
          }
        />

        <FloatingLabel label="Min Age" className="flex-grow-1">
          <Form.Control
            type={"text"}
            placeholder={"Min Age"}
            style={{ flexBasis: "300px" }}
            onBlur={(e) => {
              const val = e.target.value;
              onFilterChange("ageMin", val !== "" ? val : 0);
            }}
          />
        </FloatingLabel>

        <FloatingLabel label="Max Age" className="flex-grow-1">
          <Form.Control
            type={"text"}
            placeholder={"Max Age"}
            style={{ flexBasis: "300px" }}
            onBlur={(e) => {
              const val = e.target.value;
              onFilterChange("ageMax", val !== "" ? val : 100);
            }}
          />
        </FloatingLabel>

        <FloatingLabel label="Zip Code" className="flex-grow-1">
          <Form.Control
            type={"text"}
            placeholder={"Zip Code"}
            style={{ flexBasis: "300px" }}
            onBlur={(e) => {
              const val = e.target.value;
              onFilterChange("zipCodes", val !== "" ? [val] : []);
            }}
          />
        </FloatingLabel>
      </Stack>
    </div>
  );
}
