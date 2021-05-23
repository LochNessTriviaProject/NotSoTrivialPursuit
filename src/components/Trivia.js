

const Trivia = ({ quizArray, quizCount, handleAnswerChoice, quizScore }) => {
  // Take response object from API call, put in dummy array then into state
  // Display question and multiple choice answers in modal. Once user selects an answer, run logic to determine if correct and play animation accordingly. Then the modal updates to the next question and so on, until the user completes the set of questions or clicks "save for later"

  return (
    <>
      <h2>TRIVIA!!</h2>

      {/* {
        //If we are gonna show one question at a time, I guess we can't use map?
        quizArray.map((quiz, index)=>{
            return(
                <div key = {`quiz-${index}`}>
                <p>{quiz.question}</p>
                <li>A: {quiz.correctAnswer}</li>
                <li>B: {quiz.wrongAnswer1}</li>
                <li>C: {quiz.wrongAnswer2}</li>
                <li>D: {quiz.wrongAnswer3}</li>
                </div>
            )
        })
    } */}

      {/* second try */}
      {
        //   HOW DO WE RANDOMIZE OPTIONS SO THAT CORRECTANSWER IS NOT ONLY ON A?
        <div>
          <p>{quizArray[quizCount].question}</p>
          <div className="answersContainer">
            <li className="correct" onClick={handleAnswerChoice}>
              A: {quizArray[quizCount].correctAnswer}
            </li>
            <li className="wrong" onClick={handleAnswerChoice}>
              B: {quizArray[quizCount].wrongAnswer1}
            </li>
            <li className="wrong" onClick={handleAnswerChoice}>
              C: {quizArray[quizCount].wrongAnswer2}
            </li>
            <li className="wrong" onClick={handleAnswerChoice}>
              D: {quizArray[quizCount].wrongAnswer3}
            </li>
          </div>

          {/* also how do we hook up these buttons to randomized options? should we just move the buttons inside those li? but then CSS might be bit tricky*/}
          
          <div className="buttonsContainer">
            <button>A</button>
            <button>B</button>
            <button>C</button>
            <button>D</button>
          </div>
        </div>
      }

      <p>quiz score = {quizScore}</p>
    </>
  );
};

export default Trivia;
