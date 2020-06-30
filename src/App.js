import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from './components/header/header.component'
import SignInPage from './pages/signin/signin.component'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'


class App extends React.Component {
  constructor() {
    super()

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null // function that will be assigned to so that we can loged in and logged out

  componentDidMount() {
    // auth.onAuthStateChanged() receives a CB that has argv1 --> w/c is the userAuthenticated object
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      // this.setState({currentUser: userAuth})
      // createUserProfileDocument(userAuth)
      // console.log('user', userAuth)

      // if userAuth is NOT null or if user exists
      if(userAuth) {
        // we will get the  documentRef object of user as implemented on firebase.utils.js
        const userRef = await createUserProfileDocument(userAuth)

        // we are using userRef to check if our databaes has updated with new data
        //    that is very similar with "auth.onAuthStateChanged"
        //    saying if the snapShot is changed. Though user data is really not going to be updated in the database as per our implementation
        // What we intentded to do is actually get the snapshot of object "representing the data that is currently stored in our database "

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          },  () => {
                console.log(this.state)
              }
          )  // putting the console log here at the 2nd argument
             // because we know that setState is asynchronous right?
        })

        // first let's try to log the current state of the App component
        //    whenever we have changes on the SignUp component
        console.log(this.state)

      } else {  // if the userAuth is null
        this.setState({currentUser: userAuth})
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()  // this will unsubscribe only but WILLNOT LOGGED OUT of our app
  }

  render () {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInPage} />

        </Switch>
      </div>
    );
  }
}

export default App;
