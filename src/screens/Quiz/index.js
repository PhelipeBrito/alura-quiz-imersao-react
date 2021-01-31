import React from 'react';
import { useRouter } from 'next/router';

import db from '../../../db.json';
import Widget from '../../components/Widget';
import PageHead from '../../components/PageHead';
import QuizLogo from '../../components/QuizLogo';
import QuizContainer from '../../components/QuizContainer';
import AlternativesForm from '../../components/AlternativesForm';
import QuizBackground from '../../components/QuizBackground';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

function ResultWidget({ results }) {
  const router = useRouter()
  const { name } = router.query

  return (
    <Widget>
      <Widget.Header>
        Tela de Resultado:
      </Widget.Header>

      <Widget.Content>
        <h1>Parabens</h1>
        <p>
          Você acertou
          {' '}
          {results.filter((x) => x).length}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #
              {index + 1}
              {' '}
              Resultado:
              {result === true
                ? 'Acertou'
                : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Now Loading...
      </Widget.Header>

      <Widget.Content>
        <Loading />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question, 
  totalQuestions, 
  questionIndex, 
  onSubmit, 
  addResult
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = React.useState(false)
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;
  return (
    <Widget>
      
      <Widget.Header>
        {/*<BackLinkArrow href="/" */}
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header> 
      <img 
        alt="Descrição"
        style={{
          width:'100%',
          height:'150px',
          objectFit: 'cover'
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>

        <p>
        {question.description}
        </p>

        <AlternativesForm onSubmit={((event) => {
          event.preventDefault();
          setIsQuestionSubmitted(true)
          setTimeout(() => {
            addResult(isCorrect);
            onSubmit();
            setIsQuestionSubmitted(false);
            setSelectedAlternative(undefined);
          }, 2 * 1000);
        })}>
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR'; 
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmitted && alternativeStatus}
              >           
                <input 
                  style={{display: 'none'}}
                  id={alternativeId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  name={questionId}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            )
          })}
        

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmitted && isCorrect && <p>{`Você acertou! >.<`}</p>}
          {isQuestionSubmitted && !isCorrect && <p>Você não acertou ;-;</p>}
        </AlternativesForm>
      </Widget.Content> 
    </Widget>
  )
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT'
}

export default function QuizPage({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING)
  const [results, setResults] = React.useState([]) 
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const totalQuestions = externalQuestions.length;
  const bg = externalBg;

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }


  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 1 * 1000);
  }, [])
  
  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <PageHead />
      <QuizContainer>
        <QuizLogo />
       {screenState === screenStates.QUIZ &&
       <QuestionWidget  
          question={question}
          questionIndex={questionIndex}
          totalQuestions={totalQuestions}
          onSubmit={handleSubmitQuiz}
          addResult={addResult}
       />
       }

       {screenState === screenStates.LOADING && <LoadingWidget />}  

       {screenState === screenStates.RESULT && <ResultWidget results={results}/>}    
      </QuizContainer>
    </QuizBackground>
  );
}
