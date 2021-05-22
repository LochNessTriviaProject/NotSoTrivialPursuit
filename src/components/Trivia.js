
const trivia = ({quizArray}) => {

// Take response object from API call, put in dummy array then into state
// Display question and multiple choice answers in modal. Once user selects an answer, run logic to determine if correct and play animation accordingly. Then the modal updates to the next question and so on, until the user completes the set of questions or clicks "save for later" 

return(
    <>

    
    <h2>TRIVIA!!</h2>


    {
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

    }
    
    </>
)


}


export default trivia;