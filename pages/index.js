import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { FaGithubSquare } from "react-icons/fa";

export default function Home() {
  const [myGrid] = useState([
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
  ]);
  const [playing, setPlaying] = useState(true);
  const [snake, setSnake] = useState(["13", "14", "15", "16"]);
  const [apple, setApple] = useState(["43"]);
  const [lastDirection, setLastDirection] = useState("down");

  function finishGame() {
    setPlaying(false);
    alert("You Lost !!!");
  }

  function getNextHead(direction, prevHead) {
    switch (direction) {
      case "up":
        if (Number(prevHead[0]) - 1 < 0) finishGame();
        return Number(prevHead[0]) - 1 + prevHead[1];

      case "down":
        if (Number(prevHead[0]) + 1 > 7) finishGame();
        return Number(prevHead[0]) + 1 + prevHead[1];

      case "left":
        if (Number(prevHead[1]) - 1 < 0) finishGame();
        return `${prevHead[0]}${Number(prevHead[1]) - 1}`;

      case "right":
        if (Number(prevHead[1]) + 1 > 7) finishGame();
        return `${prevHead[0]}${Number(prevHead[1]) + 1}`;
    }
  }

  const mainMovement = (direction) => {
    const nextHead = getNextHead(direction, snake[snake.length - 1]);

    function getApple(i, j) {
      const result = `${Math.floor(Math.random() * i)}${Math.floor(
        Math.random() * j
      )}`;
      if (!snake.includes(result) && result !== nextHead) {
        return result;
      } else return getApple(i, j);
    }

    if (snake.includes(nextHead)) {
      finishGame();
      return;
    }

    if (apple.includes(nextHead)) {
      setSnake([...apple, ...snake.slice(1), nextHead]);
      setApple([getApple(8, 8)]);
      return;
    }

    setSnake([...snake.slice(1), nextHead]);
  };

  const keyFunctions = {
    ArrowUp: () => {
      if (lastDirection !== "down") {
        setLastDirection("up");
      }
    },
    ArrowDown: () => {
      if (lastDirection !== "up") {
        setLastDirection("down");
      }
    },
    ArrowRight: () => {
      if (lastDirection !== "left") {
        setLastDirection("right");
      }
    },
    ArrowLeft: () => {
      if (lastDirection !== "right") {
        setLastDirection("left");
      }
    },
  };

  useEffect(() => {
    function executeKeyFunction(event) {
      // executes key function if exists
      keyFunctions[event.key] && keyFunctions[event.key]();
    }
    window.addEventListener("keydown", executeKeyFunction);
    return () => window.removeEventListener("keydown", executeKeyFunction);
  }, [lastDirection]);

  useEffect(() => {
    if (!playing) {
      return;
    }
    const gameInterval = setInterval(() => {
      mainMovement(lastDirection);
    }, 500);
    return () => clearInterval(gameInterval);
  }, [lastDirection, playing, snake]);

  return (
    <div className='main'>
      <div
        className='title'
        style={{
          fontSize: "2rem",
          textAlign: "center",
          fontFamily: "Roboto",
          fontWeight: "500",
          marginTop: "1rem",
        }}
      >
        Snake
      </div>
      <div
        className={styles.container}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "75vh",
        }}
      >
        <ul
          className='grid-container'
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(8,1fr)",
            textDecoration: "none",
            padding: "0",
            overflow: "hidden",
          }}
        >
          {myGrid.map((element, i) => {
            return element.map((content, j) => {
              return (
                <li
                  className='cell'
                  key={(i, j)}
                  style={{
                    color: "rgba(76, 175, 80, 0.0)",
                    border: "1px solid black",
                    width: "20px",
                    listStyle: "none",
                    backgroundColor: snake.includes(String(i) + String(j))
                      ? "black"
                      : apple.includes(String(i) + String(j))
                      ? "red"
                      : "white",
                  }}
                >
                  {String(i) + String(j)}
                </li>
              );
            });
          })}
        </ul>
        {!playing && (
          <button style={{ border: "2px solid black", borderRadius: "10px" }}>
            <a
              href=''
              style={{
                fontSize: "1rem",
                textTransform: "capitalize",
                fontFamily: "Roboto",
                fontWeight: "500",
                textDecoration: " none",
                color: "black",
              }}
            >
              restart
            </a>
          </button>
        )}
      </div>
      {/* gitHub ref */}
      <div
        className='github'
        style={{
          textAlign: "center",
        }}
      >
        <a
          href='https://github.com/vzsoares'
          target='_blank'
          rel='noreferrer'
          className='github'
        >
          <FaGithubSquare
            style={{ color: "black", fontSize: "3rem", marginTop: "0.5rem" }}
          />
        </a>
      </div>
    </div>
  );
}
