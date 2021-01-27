import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

// eslint-disable-next-line import/no-unresolved
import Head from 'next/head';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import Form from '../src/components/Form';
import Footer from '../src/components/Footer';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import GitHubCorner from '../src/components/GitHubCorner';

const PageHead = () => (
  <Head>
    <title>Aluraquiz — Black Clover</title>
    <meta property="og:title" content="Aluraquiz — Black Clover" key="title" />
    <meta property="og:image" content={db.bg} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://alura-quiz-imersao-react.phelipebrito.vercel.app/" />
    <meta property="og:description" content="Um quiz para testar seus conhecimentos do universo Black Clover e se divertir!" />
  </Head>
);

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
            <h1>Black Clover</h1>
          </Widget.Header>

          <Widget.Content>
            <p>Teste seu conhecimento sobre o universo de Black Clover e divirta-se!</p>
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
              // router manda para a próxima página
            }}
            >
              <Input
                name="nomedousuario"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                placeholder="Diz aí seu nome para jogar :)"
                value={name}
              />

              <Button type="submit" disabled={name.length === 0}>
                {`JOGAR ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da galera</h1>

            <p>Dá uma olhada nos demais quizes que a galera da imersão react fez</p>
            <Widget.Link>
              <Widget.A href="/">umlinkizinho/aluraquiz</Widget.A>
            </Widget.Link>

            <Widget.Link>
              <Widget.A href="/">linkizinho/aluraquiz</Widget.A>
            </Widget.Link>

            <Widget.Link>
              <Widget.A href="/">outrolinkizinho/aluraquiz</Widget.A>
            </Widget.Link>
          </Widget.Content>
        </Widget>

        <Footer />

        <GitHubCorner projectUrl="https://github.com/PhelipeBrito" />

      </QuizContainer>
    </QuizBackground>
  );
}
