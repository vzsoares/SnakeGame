import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { FaGithubSquare } from "react-icons/fa";

export default function Home() {
  const [myGrid, setMyGrid] = useState([
    ["white", "white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white", "white"],
  ]);
  const [snake, setSnake] = useState(["13", "14", "15", "16"]);

  const [apple, setApple] = useState(["43"]);
  const [lastDirection, setLastDirection] = useState("down");
  const [playing, setPlaying] = useState(true);
  const youLost = (myMsg) => {
    alert(`${myMsg}`);
  };
  const [lastHeads, setLastHeads] = useState("16 26");
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
    // handle oppositeDirectionClick
    if (lastHeads === `${snakeHead} ${prevHead}`) {
      let oppositeDirection = "";
      if (direction === "left") {
        oppositeDirection = "right";
      }
      if (direction === "right") {
        oppositeDirection = "left";
      }
      if (direction === "up") {
        oppositeDirection = "down";
      }
      if (direction === "down") {
        oppositeDirection = "up";
      }
      const newAnswer = getNextGridBlock(
        `${oppositeDirection}`,
        dumbSnake[dumbSnake.length - 1]
      );
      setLastDirection(oppositeDirection);
      setLastHeads(`${newAnswer} ${prevHead}`);
      return newAnswer;
    }
    setLastHeads(`${prevHead} ${snakeHead}`);
    if (dumbSnake.includes(snakeHead)) {
      setPlaying(false);
      youLost("oh no you hit yourself");
    }
    return snakeHead;
  };
  let dumbSnake = [...snake];
  const mainMovement = (direction) => {
    dumbSnake.shift();
    dumbSnake.push(
      getNextGridBlock(direction, dumbSnake[dumbSnake.length - 1])
    );
    if (apple.includes(dumbSnake[dumbSnake.length - 1])) {
      // increase snake size
      dumbSnake = [...apple, ...dumbSnake];
      // get new randomApple
      const getApple = (i, j) => {
        let myApple = `${apple}`;
        while (dumbSnake.includes(myApple)) {
          myApple =
            String(Math.floor(Math.random() * i)) +
            String(Math.floor(Math.random() * j));
        }
        return myApple;
      };
      setApple(getApple(7, 7));
    }
    setSnake([...dumbSnake]);
  };

  useEffect(() => {
    // set Event Listeners
    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        setLastDirection("right");
      }
      if (event.key === "ArrowLeft") {
        setLastDirection("left");
      }
      if (event.key === "ArrowUp") {
        setLastDirection("up");
      }
      if (event.key === "ArrowDown") {
        setLastDirection("down");
      }
    });
  }, []);

  useEffect(() => {
    if (playing) {
      const myInterval = setInterval(() => {
        mainMovement(lastDirection);
      }, 500);
    }
    return () => clearInterval(myInterval);
  }, [lastDirection, playing]);
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
