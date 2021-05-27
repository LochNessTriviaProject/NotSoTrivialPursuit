
const Form = ({
  handleCategory,
  handleAmount,
  handleDifficulty,
  handleSubmit,
}) => {


  // Define event handlers
  

  // Function to handle submit: upon submit, take user's choices send to other functions for API call

  return (
    <>
      <form action="submit" onSubmit={handleSubmit}>
        <fieldset>
            <div className="category">
                <label htmlFor="quizCategory" className="srOnly">Category</label>
                <select
                    name="quizCategory"
                    id="quizCategory"
                    onChange={handleCategory}
                >
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="13">Entertainment: Musicals and Theatres</option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16">Entertainment: Board Games</option>
                    <option value="17">Science and Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                    <option value="29">Entertainment: Comics</option>
                    <option value="30">Science: Gadgets</option>
                    <option value="31">Entertainment: Japanese Anime and Manga</option>
                    <option value="32">Entertainment: Cartoon and Animations</option>
                </select>
            </div>

            <div className="numberQuestions">
                <label htmlFor="quizNumber" className="srOnly">Number of Questions</label>
                <select name="quizNumber" id="quizNumber" onChange={handleAmount}>
                    <option value="10">10 questions</option>
                    <option value="20">20 questions</option>
                    <option value="30">30 questions</option>
                    <option value="40">40 questions</option>
                    <option value="50">50 questions</option>
                </select>
            </div>

            <div className="difficulty">
                <label htmlFor="quizDifficulty" className="srOnly">Difficulty</label>
                <select
                    name="quizDifficulty"
                    id="quizDifficulty"
                    onChange={handleDifficulty}
                    
                >
                    {/* <option disabled selected value="1">
                    Difficulty Level
                    </option> */}
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            
        </fieldset>

        <fieldset>
          {/* Text input for unique game ID (likely user's name/nickname) */}
          <div className="enterName">
            <label htmlFor="playerName">Enter your code name</label>
            <input
                type="text"
                id="playerName"
                name="playerName"
                required
            />
          </div>
        </fieldset>

        {/* Submit button for all inputs */}
        <button type="submit">Trivia it up!</button>
      </form>
    </>
  );
};


// Firebase note: each key will have game ID and full object of trivia questions and answers (and extra stuff possibly)

export default Form;