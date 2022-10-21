import "./App.css";
import React, { useEffect, useState } from "react";
import { getStars } from "./api";
import { AiFillStar  } from "react-icons/ai";

const App = () => {
  const [stars, setStars] = useState([]);

  const loadStars = async () => {
    const result = await getStars();
    setStars(result);
  };

  useEffect(() => {
    loadStars();

    const source = new EventSource(`http://localhost:5000/stream`);

    source.addEventListener("open", () => {
      console.log("SSE opened!");
    });

    source.addEventListener("message", (e) => {
      window.location.reload();
    });

    source.addEventListener("error", (e) => {
      console.error("Error: ", e);
    });

    return () => {
      source.close();
    };
  }, []);

  return (
    <div className="App">
      <h1>Repo stars</h1>
      {stars.map((star) => {
        return <AiFillStar color="#add8e6" />;
      })}
    </div>
  );
};

export default App;
