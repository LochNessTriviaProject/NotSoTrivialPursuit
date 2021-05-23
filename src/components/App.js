import '../styles/App.css';
import firebase from "../config/firebase";
import { useEffect, useState } from "react";
import axios from 'axios';
import Trivia from './Trivia';
import Footer from './Footer';
import Form from './Form';
import SavedGames from './SavedGames';

function App() {

  //PSEUDO CODE
  //
  
  const [quizAmount, setQuizAmount] = useState(10);
  const [quizCategory, setQuizCategory] = useState(14); // 9(general knowledge) ~ 32(entertainment)
  const [quizDifficulty, setQuizDifficulty] = useState('hard');
  const [quizType, setQuizType] = useState('multiple') //multiple or boolean string

  const [quizOptions, setQuizOptions] = useState ([]);

  const [userName, setUserName] = useState("");


  // const [quizOptions, setQuizOptions] = useState ([]);
  const [quizArray, setQuizArray] = useState([1,2,3]);
  const [quizCount, setQuizCount] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [userData, setUserData] = useState([]);

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
      }

    }).then((res) =>{
      console.log(res);
      console.log(res.data.response_code);
      
      if (res.data.response_code === 0) {

        // quotes and '(apostrophe) are turning into weird unicodes (&#039;) from API call right away, there should be way to convert/fix this?
        console.log(res.data.results);
        
        const quizObjArray = res.data.results;
        
        console.log(quizObjArray);
        
        const newQuizArray = res.data.results.map((quiz, index) => {
          return {
            name: userName,
            progress: quizCount,
            key: `quiz-${index}`,
            question: res.data.results[index].question,
            correctAnswer: res.data.results[index].correct_answer,
            wrongAnswer1: res.data.results[index].incorrect_answers[0],
            wrongAnswer2: res.data.results[index].incorrect_answers[1],
            wrongAnswer3: res.data.results[index].incorrect_answers[2],
          };
        });
        
        console.log(newQuizArray);
        
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

      }
      else {
        alert('no dice pal');
      }
    });




    // FIRE BASE IS HARDDDD


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizCategory, userName]);

  const submitQuizAmount = (amount) => {
    setQuizAmount(amount);
  }

  const submitQuizCategory = (category) => {
    setQuizCategory(category);
  }

  const submitQuizDifficulty = (difficulty) => {
    setQuizDifficulty(difficulty);
  }

  const handleUserName = (event) => {
    // console.log(event.target.value);
    console.log(event);
    let userNameValue = event.target.value;
    setUserName(userNameValue);
  }
    const handleAnswerChoice = (event) => {
      console.log(event.target);

      if(event.target.className === "correct"){
        //SHOW CORRECT ANIMATION HERE?
        setQuizScore(quizScore + 1);
        setQuizCount(quizCount + 1);

      }
      
      else{
        //SHOW INCORRECT ANIMATION HERE?
        setQuizCount(quizCount + 1);
      }
    };



  
  return (
    <>


      <Trivia
        quizArray={quizArray}
        quizCount={quizCount}
        handleAnswerChoice={handleAnswerChoice}
        quizScore={quizScore}
      />

      <Form 
        submitQuizAmount={submitQuizAmount} submitQuizCategory={submitQuizCategory} submitQuizDifficulty={submitQuizDifficulty} handleUserName={handleUserName} userName={userName} dbRef={dbRef} quizArray={quizArray}
      />

      <SavedGames userData = {userData}/>


      <Footer />


    </>
  );
}

export default App;
