import Head from "next/head";
import { GetServerSideProps } from "next";

import { CompletedChalenge } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { ChallengeBox } from "../components/ChallengeBox";


import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";

interface HomeProps {
  level: number,
  currentExperience: number,
  challengeCompleted: number
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
     level ={props.level}
     currentExperience={props.currentExperience}
     challengeCompleted={props.challengeCompleted}
     >
      <div className={styles.container}>
        <Head>
          <title>Inicio</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChalenge />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

//função que possibilita manipular quais dados que podem ser acessados e manipulados pelo frontend
//tudo feito nessa função executa no servidor Node e não no Browser
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengeCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengeCompleted: Number(challengeCompleted)
    }
  }
}
