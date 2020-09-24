import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Form from './components/users/Form'
import Home from './components/common/Home'
import AvailableCards from './components/users/AvailableCards'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/form' component={Form} />
        <Route path='/your-available-cards' component={AvailableCards} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
