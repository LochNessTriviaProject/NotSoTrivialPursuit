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

  const [quizOptions, setQuizOptions] = useState ([]);



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
    }).then(function (res) {
      
      console.log(res);

      console.log(res.data.results.length)
      const quizObjArray = res.data.results;

      console.log(quizObjArray);


      // const quizObj = {
      //   question: res.data.results[0].question,
      //   correctAnswer: res.data.results[0].correct_answer,
      //   wrongAnswer1: res.data.results[0].incorrect_answers[0],
      //   wrongAnswer2: res.data.results[0].incorrect_answers[1],
      //   wrongAnswer3: res.data.results[0].incorrect_answers[2],
      // };

      // for (let i=0 ; i>res.data.results.length;i++){
        
      //   quizObjArray.push(quizObj)


    });












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





  
  return (
    <>





      <Trivia/>
      <Footer/>




    </>

  );
}

export default App;
