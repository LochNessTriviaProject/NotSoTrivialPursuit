import { useState } from 'react';

const Form = (props) => {
    // Destructure props (functions which change state for API call)
    const { submitQuizCategory, submitQuizAmount, submitQuizDifficulty, handleUserName, userName, dbRef, quizArray } = props;

    // Initialize state to hold user's inputs
    const [ quizCategory, setCategory ] = useState("");
    const [ quizAmount, setAmount ] = useState("");
    const [ quizDifficulty, setDifficulty ] = useState("");

    // Define event handlers
    const handleCategory = (event) => {
        // console.log(event.target.value);
        let categoryValue = parseInt(event.target.value);
        setCategory(categoryValue);
    }

    const handleAmount = (event) => {
        // console.log(event.target.value);
        let amountValue = parseInt(event.target.value);
        setAmount(amountValue);
    }

    const handleDifficulty = (event) => {
        // console.log(event.target.value);
        let difficultyValue = event.target.value;
        setDifficulty(difficultyValue);
    }

    // Function to handle submit: upon submit, take user's choices send to other functions for API call
    const handleSubmit = (event) => {
        event.preventDefault();
        submitQuizCategory(quizCategory);
        submitQuizAmount(quizAmount);
        submitQuizDifficulty(quizDifficulty);
        console.log('dbReftimes', dbRef);
        // console.log(quizArray);
        dbRef.push(quizArray);
        console.log(dbRef);
        console.log('we have clicked');


    }

    return (
        <>
            <form action="submit" onSubmit={function(event){ handleSubmit(); handleUserName()}}>
            {/* Drop down menu for # of questions, category, and difficulty */}
                <fieldset>
                    <label htmlFor="quizCategory">Category</label>
                    <select 
                        name="quizCategory" 
                        id="quizCategory"
                        onChange={handleCategory}
                    >
                        <option disabled selected value>Choose a Category</option>
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

                    <label htmlFor="quizNumber">Number of Questions</label>
                    <select 
                        name="quizNumber" 
                        id="quizNumber"
                        onChange={handleAmount}
                    >
                        <option disabled selected value>Number of Questions</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                    </select>

                    <label htmlFor="quizDifficulty">Difficulty</label>
                    <select 
                        name="quizDifficulty" 
                        id="quizDifficulty"
                        onChange={handleDifficulty}
                    >
                        <option disabled selected value>Difficulty Level</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </fieldset>

                <fieldset>
                {/* Text input for unique game ID (likely user's name/nickname) */}
                    <label htmlFor="playerName">Enter your name</label>
                    <input 
                        type="text" 
                        id="playerName" 
                        name="playerName"
                        onChange={handleUserName}
                        value={userName}
                        // Still need to find a way to push name to firebase
                    />
                </fieldset>

                {/* Submit button for all inputs */}
                <button type="submit">Trivia it up!</button>
            </form>
        </>
    )
}


// Firebase note: each key will have game ID and full object of trivia questions and answers (and extra stuff possibly)

export default Form;