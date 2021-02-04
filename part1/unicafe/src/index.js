import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({eventHandler, text}) => 
  <button onClick={eventHandler}>
    {text}
  </button>

const Statistic = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({good, bad, neutral}) => {
  return (
    <>
    <h1>Statistics</h1>
      {(good + bad + neutral) === 0 
      ? <p>No feedback given</p>
      : 
      <table>
        <tbody>
        <Statistic text='good' value={good}/>
        <Statistic text='bad' value={bad}/>
        <Statistic text='neutral' value={neutral}/>
        <Statistic text='all' value={good + bad + neutral}/>
        <Statistic text='average' value={(good-bad)/(good + bad + neutral)}/>
        <Statistic text='positive' value={(good*100)/(good + bad + neutral) + '%'}/>
        </tbody>
      </table>}
    </>
  )
}


const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button eventHandler={() => setGood(good + 1)} text={'Good'} />
      <Button eventHandler={() => setNeutral(neutral + 1)} text={'Neutral'} />
      <Button eventHandler={() => setBad(bad + 1)} text={'Bad'} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
