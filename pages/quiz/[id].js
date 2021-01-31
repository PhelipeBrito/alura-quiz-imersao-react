import React from 'react';
import {ThemeProvider} from 'styled-components'
import QuizScreen from '../../src/screens/Quiz'

export default function QuizDaGalera({dbExterno}) {
    return(
        <ThemeProvider theme={dbExterno.theme}>
            <QuizScreen 
                externalQuestions={dbExterno.questions}
                externalBg={dbExterno.bg}
                externalTheme={dbExterno.theme}
            />
        </ThemeProvider>

    )
}

export async function getServerSideProps(context) {
    const [projectName, githubUser] = context.query.id.split('___') 

     const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
        .then((respostaDoServer) => {
            if(respostaDoServer.ok) {
                return respostaDoServer.json();
            }

            throw new Error('falha em pegar dados')
        })
        .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto)
        .catch((err) => {
            console.log(err);
        })

        console.log('dbExterno: ',dbExterno);

    return{
        props: {
            dbExterno
        }, 
    }
}