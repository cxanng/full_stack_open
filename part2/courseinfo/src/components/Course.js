import React from 'react'

const Header = ({course}) => {
    return (
      <h1>{course.name}</h1>
    )
}
  
const Part = (props) => (
<>
    <p key={props.id}>
    {props.name} {props.exNum}
    </p>
</>
)

const Content = ({course}) => {
return (
<>
{course.parts.map(element => <Part name={element.name} key={element.id} exNum={element.exercises} />)}
</>
)}

const Course = ({course}) => (
<>
    <Header id={course.id} course={course} />
    <Content course={course}/>
    <Total course={course}/>
</>
)



const Total = (props) => (
<p><strong>Total of {props.course.parts.map(element => element.exercises).reduce((a, b) => a+b, 0)} exercises</strong></p>
)

export default Course