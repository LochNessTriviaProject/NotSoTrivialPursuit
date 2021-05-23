// Create UL to house all our saved games and another UL for completed games
// Within UL we have unique LI for each saved game
// Saved games each have a firebase array with game ID (i.e. Spencer123), complete set of questions and answers based on API call and index to save how far the user has gotten in the game (i.e. question 7 of 10)

// Clicking on a saved game will pop up a modal with the current question displaying

// In progress games will show at at the top, with some indicator that they are still ongoing, completed games will show up at the bottom with the score displayed. 



const SavedGames = ({userData, resumeGame})=> {

    return (
        <>
            <ul>
                {
                    userData.map((user)=>{

                        return (
                            <>
                            <li>Name: {user.name} Progress: {user.progress}/10 quizzes</li>
                            <button onClick={resumeGame} className={user.name}>Resume</button>
                            </>
                        )

                    })
                }

            </ul>
        </>
    )
}

export default SavedGames;