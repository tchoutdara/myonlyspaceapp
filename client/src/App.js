import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import Posts from './components/Posts'
import PostView from './components/PostView'
import NoMatch from './components/NoMatch'

const Post = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/posts" component={Posts} />
    <Route exact path="/posts/:id" component={PostView} />
  </Switch>
)

export default App