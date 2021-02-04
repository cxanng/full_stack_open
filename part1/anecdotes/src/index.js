import React, {useState} from 'react';
import ReactDOM from 'react-dom';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const Button = ({text, eventHandler}) => <button onClick={eventHandler}>{text}</button>

const App = ({ anecdotes }) => {
  const arr = Array(anecdotes.length).fill(0);
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(arr)

  const onNextButton = () => {
    const num = getRandomInt(anecdotes.length)
    setSelected(num); 
    console.log(num);
  }

  const onVoteButton = () => {
    const copy = [...vote];
    copy[selected] += 1
    setVote(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {vote[selected]} votes</div>
      <Button text='vote' eventHandler={onVoteButton} />
      <Button text='next anecdote' eventHandler={onNextButton} />
      <h1>Anecdote with most votes</h1>
      <div>{Math.max(...vote) === 0 ? "" : anecdotes[vote.indexOf(Math.max(...vote))]}</div>

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
