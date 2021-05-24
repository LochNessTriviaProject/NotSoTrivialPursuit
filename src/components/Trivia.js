// Import Fontawesome icon
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Trivia = ({endGame, quizArray, quizCount, handleAnswerChoice, quizScore }) => {
  // Take response object from API call, put in dummy array then into state
  // Display question and multiple choice answers in modal. Once user selects an answer, run logic to determine if correct and play animation accordingly. Then the modal updates to the next question and so on, until the user completes the set of questions or clicks "save for later"
const randoIndex = Math.floor(Math.random() * 4);
console.log('random', randoIndex);

if (randoIndex === 0) {
  return (
    <div className="modal">

      <div className="modalContent">
        <h2>TRIVIA!!</h2>
        <p>{quizArray[quizCount].question}</p>
        <ul className="answersContainer">
          <li>A: {quizArray[quizCount].correctAnswer}</li>
          <li>B: {quizArray[quizCount].wrongAnswer1}</li>
          <li>C: {quizArray[quizCount].wrongAnswer2}</li>
          <li>D: {quizArray[quizCount].wrongAnswer3}</li>
        </ul>

        {/* also how do we hook up these buttons to randomized options? should we just move the buttons inside those li? but then CSS might be bit tricky*/}

        <div className="buttonsContainer">
          <button className="correct" onClick={handleAnswerChoice}>
            A
          </button>
          <button className="wrong" onClick={handleAnswerChoice}>
            B
          </button>
          <button className="wrong" onClick={handleAnswerChoice}>
            C
          </button>
          <button className="wrong" onClick={handleAnswerChoice}>
            D
          </button>
        </div>
        <p>quiz score = {quizScore}</p>
        <button onClick={endGame}>
          <span className="srOnly">Close trivia game</span>
          <FontAwesomeIcon icon={faTimes} aria-hidden="true" />
        </button>
      </div>
    </div>
  );}

else if (randoIndex === 1) {
  return (
    <div className="modal">

      <div className="modalContent">
        <h2>TRIVIA!!</h2>
        <p>{quizArray[quizCount].question}</p>
        <ul className="answersContainer">
          <li>A: {quizArray[quizCount].wrongAnswer1}</li>
          <li>B: {quizArray[quizCount].correctAnswer}</li>
          <li>C: {quizArray[quizCount].wrongAnswer2}</li>
          <li>D: {quizArray[quizCount].wrongAnswer3}</li>
        </ul>

        {/* also how do we hook up these buttons to randomized options? should we just move the buttons inside those li? but then CSS might be bit tricky*/}

        <div className="buttonsContainer">
          <button className="wrong" onClick={handleAnswerChoice}>
            A
          </button>
          <button className="correct" onClick={handleAnswerChoice}>
            B
          </button>
          <button className="wrong" onClick={handleAnswerChoice}>
            C
          </button>
          <button className="wrong" onClick={handleAnswerChoice}>
            D
          </button>
        </div>
        <p>quiz score = {quizScore}</p>
        <button onClick={endGame}>
          <span className="srOnly">Close trivia game</span>
          <FontAwesomeIcon icon={faTimes} aria-hidden="true" />
        </button>
      </div>


    </div>
  );}

  else if (randoIndex === 2) {
  return (
    <div className="modal">

        <div className="modalContent">
          <h2>TRIVIA!!</h2>
          <p>{quizArray[quizCount].question}</p>
          <ul className="answersContainer">
            <li >
              A: {quizArray[quizCount].wrongAnswer1}
            </li>
            <li >
              B: {quizArray[quizCount].wrongAnswer2}
            </li>
            <li >
              C: {quizArray[quizCount].correctAnswer}
            </li>
            <li >
              D: {quizArray[quizCount].wrongAnswer3}
            </li>
          </ul>

          {/* also how do we hook up these buttons to randomized options? should we just move the buttons inside those li? but then CSS might be bit tricky*/}
          
          <div className="buttonsContainer">
            <button className="wrong" onClick={handleAnswerChoice}>A</button>
            <button className="wrong" onClick={handleAnswerChoice}>B</button>
            <button className="correct" onClick={handleAnswerChoice}>C</button>
            <button className="wrong" onClick={handleAnswerChoice}>D</button>
          </div>
          <p>quiz score = {quizScore}</p>
          <button onClick={endGame}>
            <span className="srOnly">Close trivia game</span>
            <FontAwesomeIcon icon={faTimes} aria-hidden="true" />
          </button>
        </div>
    </div>
    
  )}

  else {
  return (
    <div className="modal">

      <div className="modalContent">
        <h2>TRIVIA!!</h2>
        <p>{quizArray[quizCount].question}</p>
        <ul className="answersContainer">
          <li>A: {quizArray[quizCount].wrongAnswer1}</li>
          <li>B: {quizArray[quizCount].wrongAnswer2}</li>
          <li>C: {quizArray[quizCount].wrongAnswer3}</li>
          <li>D: {quizArray[quizCount].correctAnswer}</li>
        </ul>

        {/* also how do we hook up these buttons to randomized options? should we just move the buttons inside those li? but then CSS might be bit tricky*/}

        <div className="buttonsContainer">
          <button className="wrong" onClick={handleAnswerChoice}>
            A
          </button>
          <button className="wrong" onClick={handleAnswerChoice}>
            B
          </button>
          <button className="wrong" onClick={handleAnswerChoice}>
            C
          </button>
          <button className="correct" onClick={handleAnswerChoice}>
            D
          </button>
        </div>
        <p>quiz score = {quizScore}</p>
        <button onClick={endGame}>
          <span className="srOnly">Close trivia game</span>
          <FontAwesomeIcon icon={faTimes} aria-hidden="true" />
        </button>
      </div>

    </div>
  );};

};

export default Trivia;
