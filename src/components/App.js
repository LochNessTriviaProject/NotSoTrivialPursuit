import "../styles/App.scss";
import firebase from "../config/firebase";
import { useEffect, useState } from "react";
import axios from "axios";
import Trivia from "./Trivia";
import Footer from "./Footer";
import Form from "./Form";
import SavedGames from "./SavedGames";
import shapes from "../assets/shapes.png";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import spiral from "../assets/spiral.png";
import Header from "./Header";

function App() {

  const [displayTrivia, setDisplayTrivia] = useState(false);
  const [quizAmount, setQuizAmount] = useState(10);
  const [quizCategory, setQuizCategory] = useState(14); // 9(general knowledge) ~ 32(entertainment)
  const [quizDifficulty, setQuizDifficulty] = useState("hard");
  const quizType = "multiple";
  const [savedGame, setSavedGame] = useState(false);
  const [savedQuizArray, setSavedQuizArray] = useState([1, 2, 3]);
  const [quizArray, setQuizArray] = useState([1,2,3]);
  const [quizCount, setQuizCount] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [userData, setUserData] = useState([]);
  const dbRef = firebase.database().ref();
  // test change

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
            quizLength: data[key][i].quizLength
          };


          newDataArray.push(searchObj);
        }
      }
      
      updatedArray = newDataArray.filter((user) => {
        return user.name === userNameValue;
      });
    });

    if (updatedArray[0]) {
      alert('cant use same name twice')
    }
    else{
    axios({
      method: "GET",
      url: "https://opentdb.com/api.php",
      responseType: "json",
      params: {
        amount: quizAmount,
        category: quizCategory,
        difficulty: quizDifficulty,
        type: quizType,
      },
    }).then((res) => {
      if (res.data.response_code === 0) {
        // quotes and '(apostrophe) are turning into weird unicodes (&#039;) from API call right away, there should be way to convert/fix this?

        const quizObjArray = res.data.results;
        console.log(quizObjArray);

        const newQuizArray = quizObjArray.map((quiz, index) => {

          return {
            name: userNameValue,
            quizLength: quizObjArray.length,
            category: quizObjArray[index].category,
            key: `quiz-${index}`,
            question: unicodeReplacer(quizObjArray[index].question),
            correctAnswer: unicodeReplacer(quizObjArray[index].correct_answer),
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
        console.log(newQuizArray);
        setQuizArray(newQuizArray);
        dbRef.push(newQuizArray);
        setDisplayTrivia(true);
        
      } else {
        Swal.fire({
          title: "Uh oh!",
          text: "We don't have enough questions in that category to challenge you.",
          imageUrl:
            "https://images.blush.design/UMepYocbuMn1l5E92vl7?w=920&auto=compress&cs=srgb",
          imageWidth: 300,
          imageAlt: "Custom image",
        });
      }
    });
    }
  };

  // const handleUserName = (event) => {
  //   let userNameValue = event.target.value;
  //   setUserName(userNameValue);
  //   console.log(userNameValue);
  // };

  const handleAnswerChoice = (event, quizLength, userSavedName) => {
    const buttonClassName = event.target.className;
    console.log(quizLength);

    if (quizCount === quizLength - 1) {
      if (buttonClassName === "correct") {
        //SHOW CORRECT ANIMATION HERE?
        setQuizScore(quizScore + 1);

        endGame(userSavedName);
      } else {
        //SHOW INCORRECT ANIMATION HERE?
        endGame(userSavedName);
      }
    } else {
      if (buttonClassName === "correct") {
        //SHOW CORRECT ANIMATION HERE?
        setQuizScore(quizScore + 1);
        setQuizCount(quizCount + 1);
      } else {
        //SHOW INCORRECT ANIMATION HERE?
        setQuizCount(quizCount + 1);
      }
    }
  };

  const endGame = (savedUserName) => {
    // when user wants to end game, hide modal
    console.log(savedUserName);
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
            quizLength: data[key][i].quizLength
          };


          newDataArray.push(searchObj);
        }
      }
      console.log(savedUserName);
      updatedArray = newDataArray.filter((user) => {
        return user.name === savedUserName;
      });
    });
    const savedDbRef = firebase.database().ref(updatedArray[0].key);


    if (quizCount === updatedArray[0].quizLength-1) {

      // savedDbRef.remove();
      // setQuizArray([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);

      savedDbRef.update({completed:true, progress:quizCount+1, score: quizScore});
      alert("yay u finished quiz!");

    } else {
      const data = {
        progress: quizCount,
        score: quizScore,
      };
      console.log(data);

      savedDbRef.update(data);
    }
    setDisplayTrivia(false);
    setQuizScore(0);
  };

  const resumeGame = (savedUserKey) => {

    dbRef.on("value", (res) => {
      const newDataArray = [];
      const data = res.val();
      console.log("data", data);

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
      console.log("newdataArray", newDataArray);
      console.log(savedUserKey);


      const updatedArray = newDataArray.filter((user) => {
        return user.key === savedUserKey;
      });

      console.log("what", updatedArray);

      setSavedQuizArray(updatedArray);

      console.log(updatedArray)
      setQuizCount(updatedArray[0].progress);
      setQuizScore(updatedArray[0].score);
      setSavedGame(true);
    });

    setDisplayTrivia(true);
  };

  
  return (
    <>
      <Header/>

      <main>
        <div className="wrapper">
          {savedGame ? (
            displayTrivia ? (
              <Trivia
                quizArray={savedQuizArray}
                quizCount={quizCount}
                handleAnswerChoice={handleAnswerChoice}
                quizScore={quizScore}
                endGame={endGame}
                //if else statement to show saved games instead of fresh api called games!
              />
            ) : (
              <div aria-hidden="true"></div>
            )
          ) : displayTrivia ? (
            <Trivia
              quizArray={quizArray}
              quizCount={quizCount}
              handleAnswerChoice={handleAnswerChoice}
              quizScore={quizScore}
              endGame={endGame}
              //if else statement to show saved games instead of fresh api called games!
            />
          ) : (
            <div aria-hidden="true"></div>
          )}

          <Form
            handleCategory={handleCategory}
            handleAmount={handleAmount}
            handleDifficulty={handleDifficulty}
            handleSubmit={handleSubmit}
          />

          <SavedGames userData={userData} resumeGame={resumeGame} />
        </div>

        <img src={shapes} alt="" className="shapes" aria-hidden="true" />
        <img src={spiral} alt="" className="spiral spiralOne" aria-hidden="true" />
        <img src={spiral} alt="" className="spiral spiralTwo" aria-hidden="true" />
        <img src={spiral} alt="" className="spiral spiralThree" aria-hidden="true" />
        <img src={spiral} alt="" className="spiral spiralFour" aria-hidden="true" />
        <img src={spiral} alt="" className="spiral spiralFive" aria-hidden="true" />
        <img src={spiral} alt="" className="spiral spiralSix" aria-hidden="true" />

      </main>

      <Footer />
    </>
  );
}

export default App;
