import React, { useState, useEffect } from 'react'
import services from './services/note'
import './App.css';

const Person = ({ person, deleteHandler }) => (
  <div className='capital' key={person.id}>
    {person.name} {person.number} 
    <button name={person.id} key={`delete ${person.id}`} onClick={deleteHandler}>Delete</button> 
  </div>
)

const Notification = ({ message, messageType }) => {
  if (message === '') {
    return null
  }

  const style = {
    color: messageType === 'error' ? 'darkred' : 'darkgreen',
    background: '#ade6bb',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div className='notification' style={style}>
      {message}
    </div>
  )
}

const Filter = ({ target, handler }) => (
  <>
    filter shown with <input value={target} onChange={handler}/>
  </>
)

const PersonForm = ({ name, nameHandler, number, numberHandler, submit }) => 
  <form onSubmit={submit}>
    <div>
      name: <input value={name} onChange={nameHandler}/>
    </div>
    <div>
      number: <input value={number} onChange={numberHandler} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

const PersonsList = ({filter, persons, filterFunction, deleteHandler}) => (
  <>
    { filter.trim() === '' 
    ? persons.map(element => <Person person={element} key={element.name} deleteHandler={deleteHandler} />)
    : persons.filter(filterFunction).map(element => <Person person={element} deleteHandler={deleteHandler} key={element.name} />)}
  </>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState({ type: 'noti', mess: '' })

  useEffect(() => {
    services.getAll()
    .then(response => {
      setPersons(response)
    })
    .catch(error => console.log(error))
  }, []); 

  const changeNameHandler = (event) => {
    setNewName(event.target.value);
  }

  const changeNumberHandler = (event) => {
    setNewNumber(event.target.value);
  }

  const filterHandler = (event) => {
    setFilter(event.target.value);
  }

  const checkProperty = (persons, person) => {
    if (person.name === '' || person.number === '') {
      alert(`Person\'s ${person.name === '' ? 'name' : 'numer'} cannot be empty!`)
      return false
    }
    if (persons.map(item => item.number).includes(person.number)) {
      alert(`${newNumber.trim()} is already in use`)
      return false
    }
    return true
  }

  const addHandle = (newPerson) => {
    services.createNewPerson(newPerson)
    .then(newItem => {
      setPersons(persons.concat(newItem))
      setMessage({ type: 'noti', mess: `Added ${newPerson.name}` })
      setTimeout(() => setMessage({ ...message, mess: ''}), 5000)
    })
  }

  const updateHandle = (newPerson) => {
    if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
      services.updatePerson(persons.find(item => item.name === newPerson.name).id, newPerson)
      .then(returnedItem => {
        setPersons(persons.map(item => item.name === newPerson.name ? returnedItem : item))
        setMessage({ type: 'noti', mess: `Updated ${newPerson.name}'s contact` })
        setTimeout(() => setMessage({...message, mess: ''}), 5000)
      })
      .catch(error => {
        setMessage({ type: 'error', mess: `${newPerson.name}'s contact has already been deleted` })
        setTimeout(() => setMessage({...message, mess: ''}), 5000)
      })
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
    }
    if (checkProperty(persons, newPerson)) {
      if (persons.map(item => item.name.toLowerCase()).includes(newPerson.name.toLowerCase())) {
        updateHandle(newPerson)
      } else {
        addHandle(newPerson)
      }
    }
    setNewName('')
    setNewNumber('')
  } 

  const deleteHandler = (event) => {
    event.preventDefault();
    const deletedId = event.target.name
    const deletedName = persons.find(person => person.id.toString() === deletedId).name
    if (window.confirm(`Delete ${deletedName} ?`)) {
      services.deletePerson(deletedId)
      .then(() => {
        setPersons(persons.filter(item => item.id.toString() !== deletedId))
        setMessage({ type: 'noti', mess: `Deleted ${deletedName}'s contact` })
        setTimeout(() => setMessage({...message, mess: ''}), 5000)
      })
      .catch(error => {
        setMessage({ type: 'error', mess: `${deletedName}'s contact has already been deleted` })
        setTimeout(() => setMessage({...message, mess: ''}), 5000)
      })
    }
  }

  const findFunction = (element) => 
    element.name.toLowerCase().includes(filter.trim().toLowerCase())

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message.mess} 
              messageType={message.type}/>

      <Filter target={filter} handler={filterHandler}/>

      <h3>Add a new</h3>

      <PersonForm name={newName} nameHandler={changeNameHandler} number={newNumber} 
      numberHandler={changeNumberHandler} submit={submitHandler} />

      <h3>Numbers</h3>

      <PersonsList filter={filter} persons={persons} filterFunction={findFunction} 
                    deleteHandler={deleteHandler}/>
    </div>
  )
}

export default App;
