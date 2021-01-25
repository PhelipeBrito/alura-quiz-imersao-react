import styled from 'styled-components'
import db from '../db.json'
import Head from 'next/head'
import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizBackground from '../src/components/QuizBackground'

const PageHead = () => {
  return (
    <Head>
      <title>Quiz do Digimon — Imersão React</title>
      <meta property="og:title" content="Quiz do Digimon" key="title" />
      <meta property="og:image" content={db.bg}/>
    </Head>
  )
} 

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  return (
    <>
    <PageHead/>
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>

        <Widget>
          <Widget.Header>
              <h1>Digimon</h1>
          </Widget.Header>

          <Widget.Content>
            <p>lorem ipsum sit dolor...</p>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da galera</h1>

            <p>lorem ipsum sit dolor...</p>
          </Widget.Content>
        </Widget>

        <Footer/>

        <GitHubCorner projectUrl={'https://github.com/PhelipeBrito/digimon-quiz-imersao-react'}/>

      </QuizContainer>
    </QuizBackground>
    </>
  )
}
