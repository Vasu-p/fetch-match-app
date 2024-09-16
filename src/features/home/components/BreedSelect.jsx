import React from "react";
import cn from "classnames";
import { FloatingLabel, Form } from "react-bootstrap";
import { useFetchBreeds } from "../hooks/useFetchBreeds";

export function BreedSelect({ className, onBreedChange }) {
  const { breeds, loading, error } = useFetchBreeds();
  return (
    <div className={cn(className)}>
      <FloatingLabel label="Breed">
        <Form.Select
          style={{ flexBasis: "300px" }}
          isInvalid={error !== null}
          id="breedSelect"
          onChange={(e) => onBreedChange(e.target.value)}
        >
          {loading && <option>Loading...</option>}
          {error && <option>Error loading breeds</option>}
          {!loading && !error && <option>Select a breed</option>}
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
    </div>
  );
}
