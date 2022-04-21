import React, { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import {
  FaTwitter,
  FaTiktok,
  FaTelegramPlane,
  FaPaypal,
  FaGoogle,
  FaGithub,
  FaApple,
  FaYoutube,
} from "react-icons/fa";

const Imgs = [
  <FaTwitter />,
  <FaTelegramPlane />,
  <FaTiktok />,
  <FaPaypal />,
  <FaGoogle />,
  <FaGithub />,
  <FaApple />,
  <FaYoutube />,
];

const imgs = [];
const GlobalContext = createContext();

function App({ Content }) {
  const [selected, setSelected] = useState([]);
  const [done, setDone] = useState([]);
  return (
    <GlobalContext.Provider value={{ selected, setSelected, done, setDone }}>
      {Content}
    </GlobalContext.Provider>
  );
}

export const Content = () => {
  const [images, setImages] = useState([]);
  const { done } = useContext(GlobalContext);

  useEffect(() => {
    for (var i = 0; i < 2; i++) {
      Imgs.forEach((img) => {
        imgs.push({ id: Math.random(), content: img });
      });
    }
    setImages(imgs.sort((a, b) => a.id - b.id));
  }, []);

  return (
    <div className="pair-the-pic">
      <p className="title">
        {done.length < Imgs.length ? "Pair the Pic Game" : "You won"}
      </p>
      <div className="main-container">
        {images.map((image) => (
          <MainContent key={image.id} {...image} />
        ))}
      </div>
      {done.length == Imgs.length && (
        <div>
          <button onClick={() => window.location.reload(false)}>
            Play again
          </button>
        </div>
      )}
    </div>
  );
};

const MainContent = ({ content, id }) => {
  const [hasSelected, setHasSelected] = useState(false);
  const { selected, setSelected, done, setDone } = useContext(GlobalContext);

  useEffect(() => {
    if (selected.length == 2) {
      setTimeout(() => {
        if (selected[0].content == selected[1].content) {
          setDone([...done, selected[0].content]);
        } else {
          if (selected[0].id == id || selected[1].id == id) {
            setHasSelected(false);
          }
        }
        if (done.includes(content)) {
          setHasSelected(true);
        }
        setSelected([]);
      }, 300);
    }
  }, [selected]);

  const SelectItem = () => {
    if (!hasSelected && selected.length < 2) {
      setHasSelected(true);
      setSelected([...selected, { content, id }]);
    }
  };

  return (
    <div className="img-container" onClick={() => SelectItem()}>
      {hasSelected ? content : <div></div>}
    </div>
  );
};

export default App;
