import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { FaGithubSquare } from "react-icons/fa";

export default function Home() {
  const [myGrid, setMyGrid] = useState([
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

  const youLost = (myMsg) => {
    alert(`${myMsg}`);
  };

  const getNextGridBlock = (direction, prevHead) => {
    let snakeHead = "";

    if (direction === "right") {
      if (Number(prevHead[1]) + 1 > 7) {
        setPlaying(false);
        youLost("oh no you hit the wall");
        return;
      }
      snakeHead = String(Number(prevHead) + 1);
    }

    if (direction === "left") {
      if (Number(prevHead[1]) - 1 < 0) {
        setPlaying(false);
        youLost("oh no you hit the wall");
        return;
      }
      snakeHead = String(Number(prevHead) - 1);
    }
    if (direction === "up") {
      if (Number(prevHead[0]) - 1 < 0) {
        setPlaying(false);
        youLost("oh no you hit the wall");
        return;
      }
      snakeHead = Number(prevHead[0]) - 1 + prevHead[1];
    }

    if (direction === "down") {
      if (Number(prevHead[0]) + 1 > 7) {
        setPlaying(false);
        youLost("oh no you hit the wall");
        return;
      }
      snakeHead = Number(prevHead[0]) + 1 + prevHead[1];
    }
    // prevent wrong output when i=0
    if (snakeHead.length !== 2) {
      snakeHead = `${0}${snakeHead}`;
    }

    return snakeHead;
  };

  const mainMovement = (direction) => {
    const nextHead = getNextGridBlock(direction, snake[snake.length - 1]);
    function getApple(i, j) {
      let result = `${Math.floor(Math.random() * i)}${Math.floor(
        Math.random() * j
      )}`;
      if (!snake.includes(result) && result !== nextHead) {
        return result;
      } else return getApple(i, j);
    }

    if (apple.includes(nextHead)) {
      setSnake([...apple, ...snake.slice(1), nextHead]);
      setApple([getApple(7, 7)]);
      return;
    }

    setSnake([...snake.slice(1), nextHead]);
  };
  //
  function getNextHead(direction, prevHead) {}
  const [keyPressed, setKeyPressed] = useState("");

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
    keyFunctions[keyPressed] && keyFunctions[keyPressed]();
  }, [keyPressed]);
  useEffect(() => {
    // set Event Listeners
    window.addEventListener("keydown", (event) => {
      setKeyPressed(event.key);
    });
  }, []);

  useEffect(() => {
    if (!playing) {
      return;
    }
    const myInterval = setInterval(() => {
      mainMovement(lastDirection);
    }, 500);
    return () => clearInterval(myInterval);
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
                  {snake}
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
