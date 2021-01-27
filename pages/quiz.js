import React from 'react';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import Button from '../src/components/Button';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question, 
  totalQuestions, 
  questionIndex
}) {
  const questionId = `question__${questionIndex}`
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

        <form>
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
              >           
                <input 
                  style={{display: 'none'}}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            )
          })}
        

          <Button type="submit">
            Confirmar
          </Button>
        </form>
      </Widget.Content> 
    </Widget>
  )
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT'
}

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING)
  const questionIndex = 1;
  const [currentQUestion]
  const question = db.questions[questionIndex];
  const totalQuestions = db.questions.length;

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 1 * 1000);
  })
  
  

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>

       {screenState === screenStates.QUIZ &&
       <QuestionWidget  
          question={question}
          questionIndex={questionIndex}
          totalQuestions={totalQuestions}
       />
       }

       {screenState === screenStates.LOADING && <LoadingWidget />}  

       {screenState === screenStates.RESULT && <div>Você acertou x questões, parabens!</div>}    
      </QuizContainer>
    </QuizBackground>
  );
}
