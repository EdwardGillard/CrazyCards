import React from 'react'
import { Link } from 'react-router-dom'

function Errors() {
  return (
    <div className="errors--page">
      <h1>Oops something went wrong</h1>
      <p><Link to="/form">Click here</Link> to return back to the form</p>
    </div>
  )
}




export default Errors