import React, { useCallback } from "react";
import { SelectionView } from "./components/SelectionView";
import { ListView } from "./components/ListView";
import { MatchModal } from "./components/MatchModal";
import { axiosInstance } from "src/axios";
import { Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export function Home({ user, onLogout }) {
  const nav = useNavigate();
  const [favouritedDogs, setFavouritedDogs] = React.useState([]);
  const [showMatchModal, setShowMatchModal] = React.useState(false);
  const [matchedDog, setMatchedDog] = React.useState(null);

  const handleFavouriteToggle = useCallback((dog) => {
    setFavouritedDogs((prevFavouritedDogs) => {
      if (prevFavouritedDogs.some((favDog) => favDog.id === dog.id)) {
        return prevFavouritedDogs.filter((favDog) => favDog.id !== dog.id);
      } else {
        return [...prevFavouritedDogs, dog];
      }
    });
  }, []);

  const handleMatch = useCallback(() => {
    const dogIds = favouritedDogs.map((dog) => dog.id);
    axiosInstance.post("/dogs/match", dogIds).then((response) => {
      const matchedId = response.data.match;
      const matchedDog = favouritedDogs.find((dog) => dog.id === matchedId);
      setMatchedDog(matchedDog);
      setShowMatchModal(true);
    });
  }, [favouritedDogs]);

  const handleLogout = useCallback(() => {
    axiosInstance.post("/auth/logout").then(() => {
      onLogout();
      nav("/login");
    });
  }, []);

  return (
    <>
      <Navbar bg="warning">
        <Navbar.Brand className="ps-5">Fetch Dog Match</Navbar.Brand>
        <Navbar.Text className="ms-auto me-5">
          {user !== null && <span className={"px-3"}>Hello {user.name}!!</span>}
          {user !== null && <Link onClick={handleLogout}>Logout</Link>}
        </Navbar.Text>
      </Navbar>
      {user === null && (
        <p>
          <Link to="/login">Login</Link> to view the page
        </p>
      )}
      {user !== null && (
        <div className="d-flex" style={{ height: "calc(100% - 58px)" }}>
          <ListView
            className={"col-lg-9 border-end"}
            favouritedDogs={favouritedDogs}
            onFavouriteToggle={handleFavouriteToggle}
          />
          <SelectionView
            className={"col-lg-3"}
            favouritedDogs={favouritedDogs}
            onFavouriteToggle={handleFavouriteToggle}
            onMatch={handleMatch}
          />
          <MatchModal
            matchedDog={matchedDog}
            user={user}
            show={showMatchModal}
            onClose={() => setShowMatchModal(false)}
          />
        </div>
      )}
    </>
  );
}
