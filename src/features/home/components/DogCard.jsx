import React from "react";
import { Card, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons";

export function DogCard({ dog }) {
  return (
    <Card style={{ width: "10rem" }}>
      <Card.Img height={200} width={140} variant="top" src={dog.img} />
      <Card.Body>
        <Card.Title className="ps-1">
          <span>{dog.name}</span>
          {!dog.favourite && (
            <Heart size={24} style={{ cursor: "pointer", float: "right" }} />
          )}
          {dog.favourite && (
            <HeartFill
              size={24}
              style={{ cursor: "pointer", color: "red", float: "right" }}
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
