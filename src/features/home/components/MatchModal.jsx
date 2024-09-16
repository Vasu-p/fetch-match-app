import React from "react";
import { Button, Modal } from "react-bootstrap";
import { DogCard } from "./DogCard";

export function MatchModal({ user, show, matchedDog, onClose }) {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onBackdropClick={onClose}
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Congratulations {user.name}! You have a match!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DogCard dog={matchedDog} className={"mx-auto"} showFavourite={false} />
      </Modal.Body>
    </Modal>
  );
}
