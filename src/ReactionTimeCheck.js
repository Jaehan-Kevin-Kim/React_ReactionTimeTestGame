import React, { Component } from 'react';
import './ReactionTimeCheck.css';

export class ReactionTimeCheck extends Component {
  state = {
    resultsHistory: [],
    message: 'Click to start',
    color: 'waiting',
    result: '',
  };

  timeout;
  startTime;
  finishTime;
  // requestHistoryClass = document.querySelector('.resultHistoryClass');

  onClick = () => {
    const { resultsHistory, message, color, result } = this.state;
    if (color === 'waiting') {
      this.setState({
        message: 'Click when the screen turns to green',
        color: 'ready',
        result: '',
      });

      this.timeout = setTimeout(() => {
        this.startTime = new Date();
        this.setState({
          message: 'Click Now!!',
          color: 'now',
        });
      }, Math.floor(Math.random() * 2000 + 2000));
    } else if (color === 'ready') {
      clearTimeout(this.timeout);
      this.setState({
        message: 'You clicked too early. Click for retry',
        color: 'early',
      });
    } else if (color === 'early') {
      this.setState({
        message: 'Click to start',
        color: 'waiting',
      });
    } else {
      this.finishTime = new Date();
      this.setState((prevState) => {
        return {
          result: `${this.finishTime - this.startTime}ms`,
          color: 'waiting',
          resultsHistory: [
            ...prevState.resultsHistory,
            this.finishTime - this.startTime,
          ],
        };
      });
    }

    console.log(resultsHistory);
  };

  resetHistory = () => {
    const requestHistoryClass = document.querySelector('.resultHistoryClass');
    this.setState({
      resultsHistory: [],
      message: 'Click to start',
      color: 'waiting',
      result: '',
    });
    requestHistoryClass.classList.remove('active');
  };

  averagePrint = () => {
    const requestHistoryClass = document.querySelector('.resultHistoryClass');
    if (this.state.resultsHistory.length % 3 === 0) {
      requestHistoryClass.classList.add('active');
      console.log('threetimes');
      const resultsSum = this.state.resultsHistory.reduce(
        (acc, cur) => acc + cur
      );
      this.average = resultsSum / this.state.resultsHistory.length;

      //   this.setState({
      //     resultHistory: [],
      //   });

      return (
        <>
          <ul>
            {this.state.resultsHistory.map((resultHistory, i) => {
              return (
                <li key={i + resultHistory}>
                  Try {i + 1}: {resultHistory}ms
                </li>
              );
            })}
            <li></li>
          </ul>
          <h3>Average: {Math.round(this.average)}ms</h3>
        </>
      );
    }
    // else if (this.state.resultsHistory.length > 3) {
    //   this.resetHistory();
    // }
  };

  // return this.state.resultsHistory.length === 0 ? null : (
  //   <>
  //     {this.state.resultsHistory.reduce((acc, cur) => acc + cur) /
  //       this.state.resultsHistory.length}
  //     ms
  //   </>
  // );

  render() {
    const { result, message, color } = this.state;
    return (
      <>
        <div id='screen' className={color} onClick={this.onClick}>
          <p className='paragraph'>{message}</p>
          <h4 className='result'>{result}</h4>
          <div className='resultHistoryClass'>
            {this.state.resultsHistory.length === 0
              ? null
              : this.averagePrint()}
          </div>
        </div>
        <div className='btnContainer'>
          {this.state.resultsHistory.length !== 3 ? null : (
            <button id='resetHistory' onClick={this.resetHistory}>
              Start Again
            </button>
          )}
        </div>
      </>
    );
  }
}

export default ReactionTimeCheck;
