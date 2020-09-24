import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home--page">
      <h1> Welcome to Crazy Cards</h1>
      <p> Please <Link to="/form">Click here</Link> to find out which cards you're eligable for</p>
    </div>
  )
}

export default Home