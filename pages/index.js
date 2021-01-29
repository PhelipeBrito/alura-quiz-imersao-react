import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion'
import { useRouter } from 'next/router';

// eslint-disable-next-line import/no-unresolved

import db from '../db.json';
import PageHead from '../src/components/PageHead';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import GitHubCorner from '../src/components/GitHubCorner';
import Link from '../src/components/Link';



export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <PageHead />
      <QuizContainer>
        <QuizLogo />
        <Widget 
          as={ motion.section }
          transition={{delay: 0 ,duration: .5}}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: {opacity: 0, y: '100%'}
          }}
          initial="hidden"
          animate="show"
        >
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

        <Widget
          as={ motion.section }
          transition={{delay: .2 ,duration: .5}}
          variants={{
            show: { opacity: 1},
            hidden: {opacity: 0}
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da galera</h1>

            <p>Dá uma olhada nos demais quizes que a galera da imersão react fez</p>
            <ul>

            {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

              return (
                <li key={linkExterno}>
                  <Widget.Topic 
                    href={`/quiz/${projectName}___${githubUser}`}
                    as={Link}
                  >
                    {`${githubUser}/${projectName}`}
                  </Widget.Topic>
                </li>
              )
            })}
            </ul>
          </Widget.Content>
        </Widget>

        <Footer />

        <GitHubCorner projectUrl="https://github.com/PhelipeBrito" />

      </QuizContainer>
    </QuizBackground>
  );
}
