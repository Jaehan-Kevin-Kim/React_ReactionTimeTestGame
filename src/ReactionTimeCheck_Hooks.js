import React, { useState, useRef } from 'react';
import './ReactionTimeCheck.css';

const ReactionTimeCheck_Hooks = () => {
  const [message, setMessage] = useState('Click to start');
  const [color, setColor] = useState('waiting');
  const [result, setResult] = useState('');
  const [resultsHistory, setResultsHistory] = useState([]);

  const timeout = useRef(null);
  const startTime = useRef();
  const finishTime = useRef();
  const requestHistoryClass = document.querySelector('.resultHistoryClass');

  const onClick = () => {
    if (color === 'waiting') {
      setMessage('Click when the screen turns to green');
      setColor('ready');
      setResult('');

      timeout.current = setTimeout(() => {
        startTime.current = new Date();
        setMessage('Click Now!!');
        setColor('now');
      }, Math.floor(Math.random() * 2000 + 2000));
    } else if (color === 'ready') {
      clearTimeout(timeout.current);
      setMessage('You clicked too early, Click for retry');
      setColor('early');
    } else if (color === 'early') {
      setMessage('Click to start');
      setColor('waiting');
    } else {
      finishTime.current = new Date();
      setResult(`${finishTime.current - startTime.current}ms`);
      setColor('waiting');
      setResultsHistory((prevState) => [
        ...prevState,
        finishTime.current - startTime.current,
      ]);
    }
  };

  const resetHistory = () => {
    setResultsHistory([]);
    setMessage('Click to start');
    setColor('waiting');
    setResult('');
    requestHistoryClass.classList.remove('active');
  };

  const averagePrint = () => {
    console.log(resultsHistory);
    if (resultsHistory.length % 3 === 0) {
      requestHistoryClass.classList.add('active');
      const resultsSum = resultsHistory.reduce((acc, cur) => acc + cur);
      const average = resultsSum / resultsHistory.length;

      return (
        <>
          <ul>
            {resultsHistory.map((resultHistory, i) => {
              return (
                <li key={i + resultHistory}>
                  Try {i + 1}: {resultHistory}ms
                </li>
              );
            })}
            <li></li>
          </ul>
          <h3>Average: {Math.round(average)}ms</h3>
        </>
      );
    }
  };

  return (
    <>
      <div id='screen' className={color} onClick={onClick}>
        <p className='paragraph'>{message}</p>
        <h4 className='result'>{result}</h4>
        <div className='resultHistoryClass'>
          {resultsHistory.length === 0 ? null : averagePrint()}
        </div>
      </div>
      <div className='btnContainer'>
        {resultsHistory.length !== 3 ? null : (
          <button id='resetHistory' onClick={resetHistory}>
            Start Again
          </button>
        )}
      </div>
    </>
  );
};

export default ReactionTimeCheck_Hooks;
