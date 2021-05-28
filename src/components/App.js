import "../styles/App.scss";
import firebase from "../config/firebase";
import { useEffect, useState } from "react";
import axios from "axios";
import Trivia from "./Trivia";
import Footer from "./Footer";
import Form from "./Form";
import SavedGames from "./SavedGames";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import Header from "./Header";
import Spirals from "./Spirals";

function App() {
  const [displayTrivia, setDisplayTrivia] = useState(false);
  const [quizAmount, setQuizAmount] = useState(10);
  const [quizCategory, setQuizCategory] = useState(14);
  const [quizDifficulty, setQuizDifficulty] = useState("easy");
  const quizType = "multiple";
  const [savedGame, setSavedGame] = useState(false);
  const [savedQuizArray, setSavedQuizArray] = useState([1, 2, 3]);
  const [quizArray, setQuizArray] = useState([1, 2, 3]);
  const [quizCount, setQuizCount] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [userData, setUserData] = useState([]);
  const dbRef = firebase.database().ref();

  useEffect(() => {
    dbRef.on("value", (res) => {
      const newDataArray = [];
      const data = res.val();
      for (let key in data) {
        let searchObj = {
          key: key,
          name: data[key][0].name,
          progress: data[key][0].progress,
        };
        newDataArray.unshift(searchObj);
      }
      setUserData(newDataArray);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unicodeReplacer = (string) => {
    return string
      .replace(/&quot;/g, `"`)
      .replace(/&#039;/g, `'`)
      .replace(/&ouml;/g, "ö");
  };

  const handleCategory = (event) => {
    let categoryValue = parseInt(event.target.value);
    setQuizCategory(categoryValue);
  };

  const handleAmount = (event) => {
    let amountValue = parseInt(event.target.value);
    setQuizAmount(amountValue);
  };

  const handleDifficulty = (event) => {
    let difficultyValue = event.target.value;
    setQuizDifficulty(difficultyValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuizCount(0);

    let userNameValue = event.target[5].value;

    let updatedArray = [];
    dbRef.on("value", (res) => {
      const newDataArray = [];
      const data = res.val();

      for (let key in data) {
        const counter = Object.keys(data[key]).length;

        for (let i = 0; i < counter - 3; i++) {
          let searchObj = {
            key: key,
            name: data[key][i].name,
            question: data[key][i].question,
            correctAnswer: data[key][i].correctAnswer,
            wrongAnswer1: data[key][i].wrongAnswer1,
            wrongAnswer2: data[key][i].wrongAnswer2,
            wrongAnswer3: data[key][i].wrongAnswer3,
            quizLength: data[key][i].quizLength,
          };

          newDataArray.push(searchObj);
        }
      }

      updatedArray = newDataArray.filter((user) => {
        return user.name === userNameValue;
      });
    });

    if (updatedArray[0]) {
      Swal.fire({
        title: "Uh oh",
        text: "Cannot have duplicate user names! (no authentication!) Please choose another user name again!",
        imageUrl:
          "https://images.blush.design/UMepYocbuMn1l5E92vl7?w=920&auto=compress&cs=srgb",
        imageWidth: 250,
        imageAlt: "Custom image",
      });
    } else {

      const searchParams = {
        amount: quizAmount,
        category: quizCategory,
        type: quizType}

      if (quizDifficulty !== "any") {
        searchParams.difficulty = quizDifficulty;
      }

      axios({
        method: "GET",
        url: "https://opentdb.com/api.php",
        responseType: "json",
        params: searchParams
      }).then((res) => {
        if (res.data.response_code === 0) {
          const quizObjArray = res.data.results;

          const newQuizArray = quizObjArray.map((quiz, index) => {
            return {
              name: userNameValue,
              quizLength: quizObjArray.length,
              category: quizObjArray[index].category,
              key: `quiz-${index}`,
              question: unicodeReplacer(quizObjArray[index].question),
              correctAnswer: unicodeReplacer(
                quizObjArray[index].correct_answer
              ),
              wrongAnswer1: unicodeReplacer(
                quizObjArray[index].incorrect_answers[0]
              ),
              wrongAnswer2: unicodeReplacer(
                quizObjArray[index].incorrect_answers[1]
              ),
              wrongAnswer3: unicodeReplacer(
                quizObjArray[index].incorrect_answers[2]
              ),
            };
          });
          newQuizArray.progress = 0;
          newQuizArray.score = 0;
          newQuizArray.completed = false;
          setQuizArray(newQuizArray);
          dbRef.push(newQuizArray);
          setDisplayTrivia(true);
        } else {
          Swal.fire({
            title: "Uh oh!",
            text: "We don't have enough questions in that category to challenge you.",
            imageUrl:
              "https://images.blush.design/UMepYocbuMn1l5E92vl7?w=920&auto=compress&cs=srgb",
            imageWidth: 250,
            imageAlt: "Custom image",
          });
        }
      });
    }
  };

  const handleAnswerChoice = (event, quizLength, userSavedName) => {
    const buttonClassName = event.target.className;

    if (quizCount === quizLength - 1) {
      if (buttonClassName === "correct") {
        setQuizScore(quizScore + 1);
        endGame(userSavedName);
      } else {
        endGame(userSavedName);
      }
    } else {
      if (buttonClassName === "correct") {
        setQuizScore(quizScore + 1);
        setQuizCount(quizCount + 1);
      } else {
        setQuizCount(quizCount + 1);
      }
    }
  };

  const endGame = (savedUserName) => {
    let updatedArray = [];
    dbRef.on("value", (res) => {
      const newDataArray = [];
      const data = res.val();

      for (let key in data) {
        const counter = Object.keys(data[key]).length;

        for (let i = 0; i < counter - 3; i++) {
          let searchObj = {
            key: key,
            name: data[key][i].name,
            question: data[key][i].question,
            correctAnswer: data[key][i].correctAnswer,
            wrongAnswer1: data[key][i].wrongAnswer1,
            wrongAnswer2: data[key][i].wrongAnswer2,
            wrongAnswer3: data[key][i].wrongAnswer3,
            quizLength: data[key][i].quizLength,
          };

          newDataArray.push(searchObj);
        }
      }
      updatedArray = newDataArray.filter((user) => {
        return user.name === savedUserName;
      });
    });
    const savedDbRef = firebase.database().ref(updatedArray[0].key);

    if (quizCount === updatedArray[0].quizLength - 1) {
      savedDbRef.update({
        completed: true,
        progress: quizCount + 1,
        score: quizScore,
      });
      Swal.fire({
        title: "YAY",
        text: "You completed the quiz!",
        imageUrl:
          "https://images.blush.design/UMepYocbuMn1l5E92vl7?w=920&auto=compress&cs=srgb",
        imageWidth: 250,
        imageAlt: "Custom image",
      });
    } else {
      const data = {
        progress: quizCount,
        score: quizScore,
      };
      savedDbRef.update(data);
    }
    setDisplayTrivia(false);
    setQuizScore(0);
    setQuizArray([1,2,3]);
    setSavedQuizArray([1,2,3]);
    setQuizCount(0);




  };

  const resumeGame = (savedUserKey) => {
    dbRef.on("value", (res) => {
      const newDataArray = [];
      const data = res.val();
      for (let key in data) {
        for (let i = 0; i < Object.keys(data[key]).length - 3; i++) {
          let searchObj = {
            key: key,
            name: data[key][i].name,
            progress: data[key].progress,
            score: data[key].score,
            quizLength: data[key][i].quizLength,
            question: data[key][i].question,
            correctAnswer: data[key][i].correctAnswer,
            wrongAnswer1: data[key][i].wrongAnswer1,
            wrongAnswer2: data[key][i].wrongAnswer2,
            wrongAnswer3: data[key][i].wrongAnswer3,
          };
          newDataArray.push(searchObj);
        }
      }

      const updatedArray = newDataArray.filter((user) => {
        return user.key === savedUserKey;
      });
      setSavedQuizArray(updatedArray);
      setQuizCount(updatedArray[0].progress);
      setQuizScore(updatedArray[0].score);
      setSavedGame(true);
    });

    setDisplayTrivia(true);
  };

  return (
    <>
      <Header />

      <main>
        <div className="wrapper">
          {displayTrivia ? (
              <Trivia
                quizArray={savedGame ? savedQuizArray : quizArray}
                quizCount={quizCount}
                handleAnswerChoice={handleAnswerChoice}
                quizScore={quizScore}
                endGame={endGame}
              />
            ) : (
              <div aria-hidden="true"></div>
            )
          }

          <Form
            handleCategory={handleCategory}
            handleAmount={handleAmount}
            handleDifficulty={handleDifficulty}
            handleSubmit={handleSubmit}
          />

          <SavedGames userData={userData} resumeGame={resumeGame} />
        </div>

        <Spirals/>
      </main>

      <Footer />
    </>
  );
}

export default App;
