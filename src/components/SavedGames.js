import firebase from "../config/firebase";

const SavedGames = ({ resumeGame }) => {
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
        category: data[key][0].category,
        completed: data[key].completed,
        quizLength: data[key][0].quizLength,
      };
      newDataArray.unshift(searchObj);
    }
  });

  const completed = () => {
    alert("this is already completed!");
  };

  return (
    <>
      <div className="wrapper">
        <div className="flexContainer">
          <h2 className="gamesHeader">Saved Games:</h2>
        </div>
        <div className="gamesContainer">
          <ul className="savedGames">
            {newDataArray.map((user, index) => {
              return (
                <li
                  key={`${user.key}-${index}`}
                  className={user.completed ? "completed" : ""}
                >
                  <button
                    onClick={
                      user.completed
                        ? completed
                        : () => {
                            resumeGame(user.key);
                          }
                    }
                    className={user.name}
                  >
                    <span>Name:</span> {user.name} | <span>category:</span>{" "}
                    {user.category} | <span>Progress:</span>{" "}
                    {user.score
                      ? `${user.progress}/${user.quizLength} questions Score: ${user.score}`
                      : `0/10 questions Score: 0`}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SavedGames;
