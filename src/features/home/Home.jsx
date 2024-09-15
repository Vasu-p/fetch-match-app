import React from "react";
import { SelectionView } from "./components/SelectionView";
import { ListView } from "./components/ListView";

export function Home() {
  return (
    <div className="h-100 d-flex">
      <ListView className={"col-lg-9 border-end"} />
      <SelectionView className={"col-lg-3"} />
    </div>
  );
}
