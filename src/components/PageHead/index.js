import Head from 'next/head';
import db from '../../../db.json';

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

  export default PageHead