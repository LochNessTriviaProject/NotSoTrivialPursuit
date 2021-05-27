// Import Fontawesome icon
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import blob from "../assets/blob.svg";

const Trivia = ({
  endGame,
  quizArray,
  quizCount,
  handleAnswerChoice,
  quizScore,
}) => {
  const randoIndex = Math.floor(Math.random() * 4);

  let quizLength = quizArray[0].quizLength;

  let userSavedName = quizArray[0].name;
  let savedProgress = quizArray[0].progress;
  if (!savedProgress) {
    savedProgress = 0;
  }
  if (randoIndex === 0) {
    return (
      <div className="modal">
        <div className="modalContent">
          <img src={blob} alt="" />
          <div className="triviaContent">
            <p>{quizArray[quizCount].question}</p>
            <ul className="answersContainer">
              <li>A: {quizArray[quizCount].correctAnswer}</li>
              <li>B: {quizArray[quizCount].wrongAnswer1}</li>
              <li>C: {quizArray[quizCount].wrongAnswer2}</li>
              <li>D: {quizArray[quizCount].wrongAnswer3}</li>
            </ul>
          </div>

          <div className="buttonsContainer">
            <button
              className="correct"
              onClick={(event) => {
                handleAnswerChoice(event, quizLength, userSavedName);
              }}
            >
              A
            </button>
            <button
              className="wrong"
              onClick={(event) => {
                handleAnswerChoice(event, quizLength, userSavedName);
              }}
            >
              B
            </button>
            <button
              className="wrong"
              onClick={(event) => {
                handleAnswerChoice(event, quizLength, userSavedName);
              }}
            >
              C
            </button>
            <button
              className="wrong"
              onClick={(event) => {
                handleAnswerChoice(event, quizLength, userSavedName);
              }}
            >
              D
            </button>
          </div>
          <p className="score">Score = {quizScore}</p>

          <button
            className="exitButton"
            onClick={() => {
              endGame(userSavedName);
            }}
          >
            <span className="srOnly">Close trivia game</span>
            <FontAwesomeIcon icon={faTimes} aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  } else if (randoIndex === 1) {
    return (
      <div className="modal">
        <div className="modalContent">
          <img src={blob} alt="" />
          <div className="triviaContent">
            <p>{quizArray[quizCount].question}</p>
            <ul className="answersContainer">
              <li>A: {quizArray[quizCount].wrongAnswer1}</li>
              <li>B: {quizArray[quizCount].correctAnswer}</li>
              <li>C: {quizArray[quizCount].wrongAnswer2}</li>
              <li>D: {quizArray[quizCount].wrongAnswer3}</li>
            </ul>
          </div>
          <div className="buttonsContainer">
            <button
              className="wrong"
              onClick={(event) => {
                handleAnswerChoice(event, quizLength, userSavedName);
              }}
            >
              A
            </button>
            <button
              className="correct"
              onClick={(event) => {
                handleAnswerChoice(event, quizLength, userSavedName);
              }}
            >
              B
            </button>
            <button
              className="wrong"
              onClick={(event) => {
                handleAnswerChoice(event, quizLength, userSavedName);
              }}
            >
              C
            </button>
            <button
              className="wrong"
              onClick={(event) => {
                handleAnswerChoice(event, quizLength, userSavedName);
              }}
            >
              D
            </button>
          </div>
          <p className="score">Score = {quizScore}</p>
          <button
            className="exitButton"
            onClick={() => {
              endGame(userSavedName);
            }}
          >
            <span className="srOnly">Close trivia game</span>
            <FontAwesomeIcon icon={faTimes} aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  } else if (randoIndex === 2) {
    return (
      <div className="modal">
        <div className="modalContent">
          <img src={blob} alt="" />
          <div className="triviaContent">
            <p>{quizArray[quizCount].question}</p>
            <ul className="answersContainer">
              <li>A: {quizArray[quizCount].wrongAnswer1}</li>
              <li>B: {quizArray[quizCount].wrongAnswer2}</li>
              <li>C: {quizArray[quizCount].correctAnswer}</li>
              <li>D: {quizArray[quizCount].wrongAnswer3}</li>
            </ul>
          </div>
          <div className="buttonsContainer">
            <button
              className="wrong"
              onClick={(event) => {
                handleAnswerChoice(event, quizLength, userSavedName);
              }}
            >
              A
            </button>
            <button
              className="wrong"
              onClick={(event) => {
                handleAnswerChoice(event, quizLength, userSavedName);
              }}
            >
              B
            </button>
            <button
              className="correct"
              onClick={(event) => {
                handleAnswerChoice(event, quizLength, userSavedName);
              }}
            >
              C
            </button>
            <button
              className="wrong"
              onClick={(event) => {
                handleAnswerChoice(event, quizLength, userSavedName);
              }}
            >
              D
            </button>
          </div>
          <p className="score">Score = {quizScore}</p>
          <button
            className="exitButton"
            onClick={() => {
              endGame(userSavedName);
            }}
          >
            <span className="srOnly">Close trivia game</span>
            <FontAwesomeIcon icon={faTimes} aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="modal">
        <div className="modalContent">
          <img src={blob} alt="" />
          <div className="triviaContent">
            <p>{quizArray[quizCount].question}</p>
            <ul className="answersContainer">
              <li>A: {quizArray[quizCount].wrongAnswer1}</li>
              <li>B: {quizArray[quizCount].wrongAnswer2}</li>
              <li>C: {quizArray[quizCount].wrongAnswer3}</li>
              <li>D: {quizArray[quizCount].correctAnswer}</li>
            </ul>
          </div>
          <div className="buttonsContainer">
            <button
              className="wrong"
              onClick={(event) => {
                handleAnswerChoice(event, quizLength, userSavedName);
              }}
            >
              A
            </button>
            <button
              className="wrong"
              onClick={(event) => {
                handleAnswerChoice(event, quizLength, userSavedName);
              }}
            >
              B
            </button>
            <button
              className="wrong"
              onClick={(event) => {
                handleAnswerChoice(event, quizLength, userSavedName);
              }}
            >
              C
            </button>
            <button
              className="correct"
              onClick={(event) => {
                handleAnswerChoice(event, quizLength, userSavedName);
              }}
            >
              D
            </button>
          </div>
          <p className="score">Score = {quizScore}</p>
          <button
            className="exitButton"
            onClick={() => {
              endGame(userSavedName);
            }}
          >
            <span className="srOnly">Close trivia game</span>
            <FontAwesomeIcon icon={faTimes} aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }
};

export default Trivia;
