import React, {useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'

import HomePage from './components/HomePage'

import LoginCallbackHandler from './components/LoginCallbackHandler';
import {spotifyLogin, geniusLogin, tryLocalSpotifyAuth, tryLocalGeniusAuth} from './store/actions/auth'

const doSpotifyLogin = (hash) => {
  store.dispatch(spotifyLogin(hash))
}

const doGeniusLogin = (hash) => {
  store.dispatch(geniusLogin(hash))
}

function App() {

  useEffect(() => {
    store.dispatch(tryLocalSpotifyAuth())
    store.dispatch(tryLocalGeniusAuth())
  }, [])

  return (
      <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/callback-spotify" render={(props)=><LoginCallbackHandler {...props} redirect='/' handlerFunc={doSpotifyLogin}/>} />
          <Route path="/callback-genius" render={(props)=><LoginCallbackHandler {...props} redirect='/' handlerFunc={doGeniusLogin}/>} />
        </Switch>      
      </BrowserRouter>
      </Provider>
  );
}

export default App;
