import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

// eslint-disable-next-line import/no-unresolved
import Head from 'next/head';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';

const PageHead = () => (
  <Head>
    <title>Aluraquiz — Digimon</title>
    <meta property="og:title" content="Aluraquiz — Digimon" key="title" />
    <meta property="og:image" content={db.bg} />
  </Head>
);

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
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <PageHead />
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Digimon</h1>
          </Widget.Header>

          <Widget.Content>
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);

              // router manda para a próxima página
            }}
            >
              <input
                onChange={function (event) {
                  setName(event.target.value);
                }}
                placeholder="Diz aí seu nome"
              />
              <button type="submit" disabled={name.length === 0}>
                Jogar
                {name}
              </button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da galera</h1>

            <p>lorem ipsum sit dolor...</p>
          </Widget.Content>
        </Widget>

        <Footer />

        <GitHubCorner projectUrl="https://github.com/PhelipeBrito/digimon-quiz-imersao-react" />

      </QuizContainer>
    </QuizBackground>
  );
}
