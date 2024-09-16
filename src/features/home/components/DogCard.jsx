import React from "react";
import { Card, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons";

export function DogCard({
  dog,
  onFavouriteToggle,
  isFavourite,
  className,
  showFavourite,
}) {
  return (
    <Card style={{ width: "12rem" }} className={className}>
      <Card.Img height={200} width={140} variant="top" src={dog.img} />
      <Card.Body>
        <Card.Title className="ps-1">
          <span>{dog.name}</span>
          {showFavourite && !isFavourite && (
            <Heart
              size={24}
              style={{ cursor: "pointer", float: "right" }}
              onClick={() => onFavouriteToggle(dog)}
            />
          )}
          {showFavourite && isFavourite && (
            <HeartFill
              size={24}
              style={{ cursor: "pointer", color: "red", float: "right" }}
              onClick={() => onFavouriteToggle(dog)}
            />
          )}
        </Card.Title>
        <Card.Text>
          <Badge bg="secondary" className="m-1">
            {dog.age} years old
          </Badge>
          <Badge bg="secondary" className="m-1">
            {dog.zip_code}
          </Badge>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={(props) => <Tooltip {...props}>{dog.breed}</Tooltip>}
          >
            <Badge
              bg="secondary"
              className="m-1 d-block"
              style={{
                maxWidth: "100%",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {dog.breed}
            </Badge>
          </OverlayTrigger>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
