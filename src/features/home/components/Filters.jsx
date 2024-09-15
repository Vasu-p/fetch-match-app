import React from "react";
import { FloatingLabel, Form, Stack } from "react-bootstrap";
import cn from "classnames";
import { BreedSelect } from "./BreedSelect";

export function Filters({ className }) {
  return (
    <div style={{ width: "75%" }} className="mx-auto mt-4 p-4 border-bottom">
      <h3>Filters</h3>
      <Stack
        direction={"horizontal"}
        gap={4}
        className={cn(className, "flex-wrap")}
      >
        <BreedSelect className={"flex-grow-1"} />

        <FloatingLabel label="Min Age" className="flex-grow-1">
          <Form.Control
            type={"text"}
            placeholder={"Min Age"}
            style={{ flexBasis: "300px" }}
          />
        </FloatingLabel>

        <FloatingLabel label="Max Age" className="flex-grow-1">
          <Form.Control
            type={"text"}
            placeholder={"Max Age"}
            style={{ flexBasis: "300px" }}
          />
        </FloatingLabel>

        <FloatingLabel label="Zip Code" className="flex-grow-1">
          <Form.Control
            type={"text"}
            placeholder={"Zip Code"}
            style={{ flexBasis: "300px" }}
          />
        </FloatingLabel>
      </Stack>
    </div>
  );
}
