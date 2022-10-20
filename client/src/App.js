import "./App.css";
import React, { useEffect, useState } from "react";
import { getStars } from "./api";

function App() {
  const [stars, setStars] = useState([]);

  const loadStars = async () => {
    const result = await getStars();
    setStars(result);
  };

  useEffect(() => {
    loadStars();
  }, []);

  return (
    <div className="App">
      {stars.map((stars) => {
        return <div>ok</div>;
      })}
      <button onClick={() => window.location.reload(false)}>Click to reload!</button>
    </div>
  );
}

export default App;
