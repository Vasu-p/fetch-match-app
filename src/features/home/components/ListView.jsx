import React from "react";
import cn from "classnames";
import { Form, Stack } from "react-bootstrap";
import { Filters } from "./Filters";

export function ListView({ className }) {
  return (
    <div className={cn(className, "d-flex flex-column")}>
      <Filters />
    </div>
  );
}
