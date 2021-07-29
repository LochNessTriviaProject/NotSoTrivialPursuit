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

  const renderTriviaOptions = (randomNum) => {
    const answerArray = ["", "", "", ""];

    if (randomNum === 0) {
      answerArray[0] = "correctAnswer";
      answerArray[1] = "wrongAnswer1";
      answerArray[2] = "wrongAnswer2";
      answerArray[3] = "wrongAnswer3";
    }
    if (randomNum === 1) {
      answerArray[1] = "correctAnswer";
      answerArray[0] = "wrongAnswer1";
      answerArray[2] = "wrongAnswer2";
      answerArray[3] = "wrongAnswer3";
    }
    if (randomNum === 2) {
      answerArray[2] = "correctAnswer";
      answerArray[1] = "wrongAnswer1";
      answerArray[0] = "wrongAnswer2";
      answerArray[3] = "wrongAnswer3";
    }
    if (randomNum === 3) {
      answerArray[3] = "correctAnswer";
      answerArray[1] = "wrongAnswer1";
      answerArray[2] = "wrongAnswer2";
      answerArray[0] = "wrongAnswer3";
    }

    return (
      <ul className="answersContainer">
        <li>A: {quizArray[quizCount][answerArray[0]]}</li>
        <li>B: {quizArray[quizCount][answerArray[1]]}</li>
        <li>C: {quizArray[quizCount][answerArray[2]]}</li>
        <li>D: {quizArray[quizCount][answerArray[3]]}</li>
      </ul>
    );
  };

  const createTriviaModal = (randomNum) => {
    const newArray = [];
    //Assume for option A,B,C,D
    for (let i = 0; i < 4; i++) {
      newArray.push(buttonMaker(i, randomNum));
    }

    return (
      <div className="modal">
        <div className="modalContent">
          <img src={blob} alt="" />
          <div className="triviaContent">
            <p>{quizArray[quizCount].question}</p>
            {renderTriviaOptions(randomNum)}
          </div>
          <div className="buttonsContainer">{newArray}</div>
          <p className="score">Score = {quizScore}</p>

          <button className="exitButton" onClick={() => {endGame(userSavedName)}}>
            <span className="srOnly">Close trivia game</span>
            <FontAwesomeIcon icon={faTimes} aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  };

  const buttonMaker = (index, randomNum) => {
    let answerLabel = "";

    switch (index) {
      case 0:
        answerLabel = "A";
        break;
      case 1:
        answerLabel = "B";
        break;
      case 2:
        answerLabel = "C";
        break;
      case 3:
        answerLabel = "D";
        break;
      default:
        break;
    }

    return (
      <button
        className={randomNum === index ? "correct" : "wrong"}
        onClick={(event) => {
          handleAnswerChoice(event, quizLength, userSavedName);
        }}
      >
        {answerLabel}
      </button>
    );
  };

  return createTriviaModal(randoIndex);
};

export default Trivia;
