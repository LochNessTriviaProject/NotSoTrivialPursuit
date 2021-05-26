import firebase from "../config/firebase";
// Create UL to house all our saved games and another UL for completed games
// Within UL we have unique LI for each saved game
// Saved games each have a firebase array with game ID (i.e. Spencer123), complete set of questions and answers based on API call and index to save how far the user has gotten in the game (i.e. question 7 of 10)

// Clicking on a saved game will pop up a modal with the current question displaying

// In progress games will show at at the top, with some indicator that they are still ongoing, completed games will show up at the bottom with the score displayed.

const SavedGames = ({ userData, resumeGame }) => {
  console.log(userData);

  const dbRef = firebase.database().ref();
  const newDataArray = [];
  dbRef.on("value", (res) => {
    const data = res.val();

    for (let key in data) {
      let searchObj = {
        key: key,
        name: data[key][0].name,
        progress: data[key].progress,
        score: data[key].score,
      };
      newDataArray.unshift(searchObj);
    }
  });
  return (
    <>
      <div className="wrapper">
        <div className="flexContainer">
          <h2>Saved Games:</h2>
        </div>
        <container className="gamesContainer">
          <ul className="savedGames">
            {newDataArray.map((user) => {
              console.log(user);
              return (
                <>
                  {user.score ? (
                    <li>
                      <button
                        onClick={() => {
                          resumeGame(user.name);
                        }}
                        className={user.name}
                      >
                        <span>Name:</span> {user.name} | <span>Progress:</span>{" "}
                        {user.progress}/10 questions Score: user.score
                      </button>
                    </li>
                  ) : (
                    <li>
                      <button
                        onClick={() => {
                          resumeGame(user.name);
                        }}
                        className={user.name}
                      >
                        <span>Name:</span> {user.name} | <span>Progress:</span>{" "}
                        0/10 questions Score: 0
                      </button>
                    </li>
                  )}
                </>
              );
            })}
          </ul>
        </container>
      </div>
    </>
  );
};

export default SavedGames;
