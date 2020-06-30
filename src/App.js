import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from './components/header/header.component'
import SignInPage from './pages/signin/signin.component'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'

// redux-related imports
import {connect } from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions'


class App extends React.Component {

  unsubscribeFromAuth = null // function that will be assigned to so that we can loged in and logged out

  componentDidMount() {
    const { setCurrentUser } = this.props

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
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          })  // putting the console log here at the 2nd argument
             // because we know that setState is asynchronous right?
        })

        // first let's try to log the current state of the App component
        //    whenever we have changes on the SignUp component
        // console.log(this.state)

      } else {  // if the userAuth is null
        // setCurrentUser({currentUser: userAuth})
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()  // this will unsubscribe only but WILLNOT LOGGED OUT of our app
  }

  render () {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/signin"
            render={() =>
              this.props.currentUser ? (<Redirect to='/' />) : (<SignInPage />)}
          />

        </Switch>
      </div>
    );
  }
}

// argv1 - " state of the whole root reducer" or the root reducer
// const mapStateToProps = (state) => ({
//   currentUser: state.user.currentUser
// })

// similar to the above code but we just destructure the "user" reducer here
const mapStateToProps = ({ user}) => ({
  currentUser: user.currentUser
})


// here we are not going to use mapStateToProps
// we only need to set the initial currentUser state with user data from firebase

const mapDispatchToProps = dispatch => ({
  // it is the way of redux to know that whatever
  //  object you are passing me. I'm going to pass to every reducer
  // so our user action (setCurrentUser) is a function that gets the user and
  // returns an action object
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
})


// export default connect(null, mapDispatchToProps)(App);
// instead of null on argv1 we are going to pass "mapStateToProps"

export default connect(mapStateToProps, mapDispatchToProps)(App);
