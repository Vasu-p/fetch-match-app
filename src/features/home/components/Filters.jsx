import React from "react";
import { FloatingLabel, Form, Stack } from "react-bootstrap";
import cn from "classnames";
import { BreedSelect } from "./BreedSelect";

export function Filters({ className, onFilterChange }) {
  return (
    <div className={cn(className, "mt-4 p-4")}>
      <h3>Filters</h3>
      <Stack direction={"horizontal"} gap={4} className={cn("flex-wrap")}>
        <BreedSelect
          className={"flex-grow-1"}
          onBreedChange={(breed) => onFilterChange("breeds", [breed])}
        />

        <FloatingLabel label="Min Age" className="flex-grow-1">
          <Form.Control
            type={"text"}
            placeholder={"Min Age"}
            style={{ flexBasis: "300px" }}
            onBlur={(e) => onFilterChange("ageMin", e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel label="Max Age" className="flex-grow-1">
          <Form.Control
            type={"text"}
            placeholder={"Max Age"}
            style={{ flexBasis: "300px" }}
            onBlur={(e) => onFilterChange("ageMax", e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel label="Zip Code" className="flex-grow-1">
          <Form.Control
            type={"text"}
            placeholder={"Zip Code"}
            style={{ flexBasis: "300px" }}
            onBlur={(e) => onFilterChange("zipCodes", [e.target.value])}
          />
        </FloatingLabel>
      </Stack>
    </div>
  );
}
