import '../styles/App.css';
import firebase from "../config/firebase";
import { useEffect, useState } from "react";
import axios from 'axios';
import Trivia from './Trivia';
import Footer from './Footer';

function App() {

  //PSEUDO CODE
  //
  
  const [quizAmount, setQuizAmount] = useState(10);
  const [quizCategory, setQuizCategory] = useState(14); // 9(general knowledge) ~ 32(entertainment)
  const [quizDifficulty, setQuizDifficulty] = useState('hard');
  const [quizType, setQuizType] = useState('multiple') //multiple or boolean string

  // const [quizOptions, setQuizOptions] = useState ([]);
  const [quizArray, setQuizArray] = useState([1]);
  const [quizCount, setQuizCount] = useState(0);
  const [quizScore, setQuizScore] = useState(0);

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
      // quotes and '(apostrophe) are turning into weird unicodes (&#039;) from API call right away, there should be way to convert/fix this?
      console.log(res.data.results);

      const quizObjArray = res.data.results;

      console.log(quizObjArray);

      const newQuizArray = res.data.results.map((quiz, index) => {
        return {
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
    });




    // FIRE BASE IS HARDDDD

    dbRef.on("value", (res) => {
      const newDataArray = [];
      const data = res.val();


      for (let key in data) {
        let searchObj = {
          key: key,
        };
        newDataArray.unshift(searchObj);
      }


    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      <Footer />


    </>
  );
}

export default App;
