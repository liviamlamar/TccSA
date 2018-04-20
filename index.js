import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import Estomatos from './ui/Estomatos'
import Sobre from './ui/Sobre'
import { Router, Route, browserHistory } from 'react-router'

ReactDOM.render(
<Router history={browserHistory}>
    {/* <Route path='/' component={Login} />
    <Route path='/reset' component={Forgot} /> */}
    <Route path='/app' component={App}>
      {/* <IndexRoute component={Home} /> */}
      {/* <Route path='/home' component={Home} /> */}
      {/* <Route path='/projetos' component={Projetos} /> */}
      <Route path='/estomatos' component={Estomatos} />
      <Route path='/sobre' component={Sobre} />
    </Route>
  </Router>
    , document.getElementById('root'));
registerServiceWorker();
