import "../styles/App.scss";
import firebase from "../config/firebase";
import { useEffect, useState } from "react";
import axios from "axios";
import Trivia from "./Trivia";
import Footer from "./Footer";
import Form from "./Form";
import SavedGames from "./SavedGames";
import shapes from "../assets/shapes.png"; 

function App() {
  //PSEUDO CODE
  //
  const [displayTrivia, setDisplayTrivia] = useState(false);
  const [quizAmount, setQuizAmount] = useState(10);
  const [quizCategory, setQuizCategory] = useState(14); // 9(general knowledge) ~ 32(entertainment)
  const [quizDifficulty, setQuizDifficulty] = useState("hard");
  const [quizType, setQuizType] = useState("multiple"); //multiple or boolean string

  const [quizOptions, setQuizOptions] = useState([]);

  const [savedGame, setSavedGame] = useState(false);
  const [userName, setUserName] = useState("");
  const [savedQuizArray, setSavedQuizArray] = useState([1,2,3]);

  // const [quizOptions, setQuizOptions] = useState ([]);
  const [quizArray, setQuizArray] = useState([1, 2, 3]);
  const [quizCount, setQuizCount] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [userData, setUserData] = useState([]);
  const [resumeData, setResumeData] = useState([]);
  const [savedQuizScore, setSavedQuizScore] = useState([]);

  const dbRef = firebase.database().ref();
  // test change

  useEffect(() => {
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
      console.log(res);
      console.log(res.data.response_code);

      if (res.data.response_code === 0) {
        // quotes and '(apostrophe) are turning into weird unicodes (&#039;) from API call right away, there should be way to convert/fix this?
        console.log(res.data.results);

        const quizObjArray = res.data.results;

        console.log(quizObjArray);
        // let re = /(&quot;)|(&#039;)/gi;
        // const doubleQuote = `"`;
        
        const newQuizArray = res.data.results.map((quiz, index) => {
          console.log(res.data.results.length);
          return {
            name: userName,
            progress: quizCount,
            quizLength: res.data.results.length,
            key: `quiz-${index}`,
            question: unicodeReplacer(res.data.results[index].question),
            correctAnswer: unicodeReplacer(
              res.data.results[index].correct_answer
            ),
            wrongAnswer1: unicodeReplacer(
              res.data.results[index].incorrect_answers[0]
            ),
            wrongAnswer2: unicodeReplacer(
              res.data.results[index].incorrect_answers[1]),
            wrongAnswer3: unicodeReplacer(
              res.data.results[index].incorrect_answers[2]),
          };
        });

        

        // newQuizArray.map((quiz)=> {
        //   console.log(quiz);
        //   console.log(quiz.question);
        //   return (
        //     {
        //       name: quiz.name,
        //       question: quiz.question
        //     }
        //   )
        // })



        console.log(newQuizArray);
        // newQuizArray.push("progress");
        // newQuizArray.push("score");
        console.log(newQuizArray);
        newQuizArray.progress = 0;
        newQuizArray.score = 0;
        

        setQuizArray(newQuizArray);

        dbRef.on("value", (res) => {
          const newDataArray = [];
          const data = res.val();

          console.log("data", data);
          for (let key in data) {
            let searchObj = {
              key: key,
              name: data[key][0].name,
              progress: data[key][0].progress,
            };
            console.log("key", key);
            console.log(searchObj);
            newDataArray.unshift(searchObj);
          }

          setUserData(newDataArray);
          console.log(newDataArray);
          console.log(userData);
        });
      } else {
        alert("no dice pal");
      }
    });

    // FIRE BASE IS HARDDDD

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  const unicodeReplacer = (string) => {
    return string.replace(/&quot;/g, `"`).replace(/&#039;/g, `'`)
  }

  const handleCategory = (event) => {
    // console.log(event.target.value);
    let categoryValue = parseInt(event.target.value);
    setQuizCategory(categoryValue);
  };

  const handleAmount = (event) => {
    // console.log(event.target.value);
    let amountValue = parseInt(event.target.value);
    setQuizAmount(amountValue);
  };

  const handleDifficulty = (event) => {
    // console.log(event.target.value);
    let difficultyValue = event.target.value;
    setQuizDifficulty(difficultyValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // displayTrivia
    dbRef.push(quizArray);

    console.log(quizArray);
    console.log("we have clicked");
    setDisplayTrivia(true);
  };

  const handleUserName = (event) => {
    // console.log(event.target.value);
    // console.log(event);
    let userNameValue = event.target.value;
    setUserName(userNameValue);
  };
  const handleAnswerChoice = (event, quizLength, userSavedName) => {
    console.log(event);
    const buttonClassName = event.target.className;
    console.log(buttonClassName);

    if (quizCount === quizLength - 1) {
      if (buttonClassName === "correct") {
        //SHOW CORRECT ANIMATION HERE?
        setQuizScore(quizScore + 1);
        setQuizCount(quizCount + 1);
        
        endGame(userSavedName);
      } else {
        //SHOW INCORRECT ANIMATION HERE?
        setQuizCount(quizCount + 1);
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
    setDisplayTrivia(false);
    let updatedArray = [];

    dbRef.on("value", (res) => {
      const newDataArray = [];
      const data = res.val();
      
      for (let key in data) {
        
        const counter = Object.keys(data[key]).length;
        console.log(counter);
        // console.log("data", data);
        // console.log("key is here", key);
        for (let i = 0; i < (counter-2); i++) {
          // console.log(data[key]);
          let searchObj = {
            key: key,
            name: data[key][i].name,
            // progress: quizCount,
            // score: quizScore,
            question: data[key][i].question,
            correctAnswer: data[key][i].correctAnswer,
            wrongAnswer1: data[key][i].wrongAnswer1,
            wrongAnswer2: data[key][i].wrongAnswer2,
            wrongAnswer3: data[key][i].wrongAnswer3,
          };
          
          // console.log("key", key);
          // console.log(searchObj);
          // console.log(data[key][i]);
          newDataArray.unshift(searchObj);
        }

      }



      updatedArray = newDataArray.filter((user) => {

        return user.name == savedUserName;
      });

      console.log(updatedArray);

    });
        console.log(updatedArray);
        // console.log(updatedArray.key);
        
        
        const savedDbRef = firebase.database().ref(updatedArray[0].key);
        
        
        
        // console.log(savedDbRef);
        // console.log(savedDbRef[0]);
        
        
        
        const data = {
          progress: quizCount,
          score: quizScore,
        };

        savedDbRef.update(data);
        //BECAUSE OF THIS and OBJECT.KEY -2, we only will get 8 questions when user forcefully exits our game!
        setResumeData(updatedArray);
        setQuizScore(0);
        

    // After hiding modal, update the progress (quizCount)!
    // dbRef.push()? dbRef.update()?

    //savedQuizArray[0].key KEY
    
    
    // savedDbRef.on('value', (res)=>{
    //   const data = res.val();
    //   console.log(data);
    // })

    // let updates = {};
    // updates

    //  var updates = {};
    //  updates["/posts/" + newPostKey] = postData;
    //  updates["/user-posts/" + uid + "/" + newPostKey] = postData;

    //  return firebase.database().ref().update(updates);
  };

  const resumeGame = (savedUserName) => {

    dbRef.on("value", (res) => {
      const newDataArray = [];
      const data = res.val();
      console.log("data", data);

              for (let key in data) {
                console.log(data[key]);
                console.log(Object.keys(data[key]));
                console.log(Object.keys(data[key]).length-2);
                console.log(data[key][0]);

                  for (let i=0; i<Object.keys(data[key]).length-2;i++){
                    let searchObj = {
                      key: key,
                      name: data[key][i].name,
                      progress: data[key][i].progress,
                      question: data[key][i].question,
                      correctAnswer: data[key][i].correctAnswer,
                      wrongAnswer1: data[key][i].wrongAnswer1,
                      wrongAnswer2: data[key][i].wrongAnswer2,
                      wrongAnswer3: data[key][i].wrongAnswer3,
                    };

                    // console.log(data[key]);
                    // console.log("key", key);
                    // console.log(searchObj);
                    // console.log(data[key][i]);
                    newDataArray.unshift(searchObj);
                  }
                console.log(newDataArray);
              }
              console.log("newdataArray", newDataArray);

      const updatedArray = newDataArray.filter((user) => {
        console.log(user);
        console.log(user.name);
        return user.name === savedUserName;
      });

      console.log("what", updatedArray);

      setSavedQuizArray(updatedArray);
      setSavedGame(true);
    });

     setDisplayTrivia(true);
  };
  return (
    <>
      <header>
        <div className="wrapper">
          <h1><span className="notSo">Not So</span> <span className="trivial">Trivial</span> <span className="pursuit">Pursuit</span></h1>
        </div>
        {/* <p>TEST: {userName}</p> */}
      </header>

      <main>
        <div className="wrapper">

          {
            savedGame ? (
            displayTrivia ? (
            <Trivia
              quizArray={savedQuizArray}
              quizCount={quizCount}
              handleAnswerChoice={handleAnswerChoice}
              quizScore={quizScore}
              endGame={endGame}
              //if else statement to show saved games instead of fresh api called games!
              savedQuizArray={savedQuizArray}
              savedGame={savedGame}
            />
          ) : (
            <div aria-hidden="true"></div>
          )
            ) : (

              displayTrivia ? (
            <Trivia
              quizArray={quizArray}
              quizCount={quizCount}
              handleAnswerChoice={handleAnswerChoice}
              quizScore={quizScore}
              endGame={endGame}
              //if else statement to show saved games instead of fresh api called games!
              savedQuizArray={savedQuizArray}
              savedGame={savedGame}
            />

        ) : (
          <div aria-hidden="true"></div>
        )
            )
      }
      

        <Form
          handleUserName={handleUserName}
          handleCategory={handleCategory}
          handleAmount={handleAmount}
          handleDifficulty={handleDifficulty}
          handleSubmit={handleSubmit}
          userName={userName}
        />

        <SavedGames userData={userData} resumeGame={resumeGame} />

        </div>
        <img src={shapes} alt="" className="shapes"/>
      </main>

      <Footer />
    </>
  );
}

export default App;
