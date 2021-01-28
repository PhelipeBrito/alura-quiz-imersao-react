import Lottie from 'react-lottie';
import styled from 'styled-components';
import React, {useState} from 'react'
import animationData from './loading.json'

const Loading = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
`

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };


export default function() {
    const [animationState, setAnimationState] = useState({isStopped: false, isPaused: false})

    return <Loading>
    <Lottie options={defaultOptions}
            height={200}
            width={200}
            isStopped={animationState.isStopped}
            isPaused={animationState.isPaused}/>
  </Loading>
}

