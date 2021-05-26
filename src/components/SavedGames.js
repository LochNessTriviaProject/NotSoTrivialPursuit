import firebase from "../config/firebase";
// Create UL to house all our saved games and another UL for completed games
// Within UL we have unique LI for each saved game
// Saved games each have a firebase array with game ID (i.e. Spencer123), complete set of questions and answers based on API call and index to save how far the user has gotten in the game (i.e. question 7 of 10)

// Clicking on a saved game will pop up a modal with the current question displaying

// In progress games will show at at the top, with some indicator that they are still ongoing, completed games will show up at the bottom with the score displayed.

const SavedGames = ({ userData, resumeGame }) => {

  const dbRef = firebase.database().ref();
const newDataArray = [];
  dbRef.on("value", (res) => {
    
    const data = res.val();

    for (let key in data) {
      let searchObj = {
          key: key,
          name: data[key][0].name,
          progress: data[key].progress,
          score: data[key].score
      }
      newDataArray.unshift(searchObj);
    }

  });

  return (
    <>
      <ul>
        {newDataArray.map((user) => {


          return (
            <>
              <ul className="savedGames">
                {user.score ? (
                  <li>
                    Name: {user.name} Progress: {user.progress}/10 questions
                    Score: {user.score}
                  </li>
                ) : (
                  <li>
                    Name: {user.name} Progress: 0/10 questions
                    Score: 0 // IT MEANS USER DIDNT USE PROPER ENGAME FUNCTION!
                  </li>
                )}

                <button
                  onClick={() => {
                    resumeGame(user.name);
                  }}
                  className={user.name}
                >
                  Resume
                </button>
              </ul>
            </>
          );
        })}
      </ul>
    </>
  );
};

export default SavedGames;
