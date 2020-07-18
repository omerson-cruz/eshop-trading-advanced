import React from "react";

import { Route } from "react-router-dom"

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from "../collection/collection.component";

// levergaging our "firestore" from our firebase.utils.js
// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

// pushing the SHOP_DATA from Firebase to our Reducer
import { connect } from 'react-redux'
// import { updateCollections, fetchCollectionsStart } from "../../redux/shop/shop.actions";

//implementing Redux-thunk
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import { createStructuredSelector } from 'reselect'
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors'

// using our HOC Spinner
import WithSpinner from '../../components/with-spinner/with-spinner.component'

/**
 * Below components will be the one to be placed on the "Router" below
 */
// creating the CollectionsOverview Component that will have the WithSpinner HOC
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)


class ShopPage extends React.Component{

  // constructor() {
  //   super()

  //   this.state ={
  //     laoding: true
  //   }
  // }

  // or as a shortcut we can utilize the ES6
  // this will call the constructor and super() implicitly
  // state = {
  //   loading: true
  // }



  // Snapshot will be a representation of our collections array
  // that we are going to get from firestore
  // unsubscribeFromSnapshot = null

  componentDidMount() {

    const { fetchCollectionsStartAsync } = this.props
    fetchCollectionsStartAsync()

    // using the "updateCollection" to push SHOP_DATA from firebaes to Redux store
    // const { updateCollections } = this.props

    // const collectionRef = firestore.collection('collections')

    // so similar to what we did with the "userRef" in our App.js
    // we are going to call the collectionRef here
    // "onSnapshot" will simply informs our App whenever there is an Update
    // or whenever the component is just runs for the first time
    // this collectionRef will send us the snapshot representing the
    // code of our collections objects array at the time this code renders

    /* Using the OBservable Pattern here at the "collectionRef.onSnapshot( )" */
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async (snapshot) => {
    //   console.log("snapshot.docs: ", snapshot.docs)
    //   // calling the converter util from firebase.utils.js
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot)

    //   console.log("collectionsMap: " , collectionsMap )

    //   // pushing SHOP DATA from firebase to Redux store
    //   updateCollections(collectionsMap)

    //   this.setState({loading: false})
    // })


    /**
     * This is moved to the "REDUCER" because now we utilize the Redux-THunk
     */
    // An alternative to the "observable pattern" above for firebase
    // Here we are going to use the Promise Pattern
    // but as you see it has the same "callback" method
    // collectionRef.get()
    //   .then((snapshot) => {
    //     console.log("snapshot.docs: ", snapshot.docs)
    //     // calling the converter util from firebase.utils.js
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot)

    //     console.log("collectionsMap: " , collectionsMap )

    //     // pushing SHOP DATA from firebase to Redux store
    //     updateCollections(collectionsMap)

    //     this.setState({loading: false})
    //   })

    /* 3rd method
      Using the "fetch()" method to get the SHOP_DATA
      and hitting the REST API method of the Firebase Database
      But this is for demo purpose only
    */
    // fetch('https://firestore.googleapis.com/v1/projects/eshop-trading/databases/(default)/documents/collections/')
    //   .then(response => response.json())
    //   .then(collections => console.log(collections))

  }

  render () {
    const { match, isCollectionFetching } = this.props
    // "loading" is now in Redux - Thunk implementation
    // const { loading } = this.state

    console.log("isCollectionFetching: ", isCollectionFetching)

    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`}
          render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} /> }
        />

        {/* INstead of doing "path={"/shop/:category"}" */}
        {/* with  `${match.path}/` it wil be very flexible and you can use it anywhere */}
        <Route path={`${match.path}/:collectionId`}
          render={(props) => <CollectionPageWithSpinner isLoading={isCollectionFetching} {...props} />}
        />
      </div>
    );
  }
}

/** No need for this since we are not getting data from Redux Store
 * by implementing the "Redux-Thunk"
 */
// const mapDispatchToProps = dispatch => ({
//   updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
// })

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)
