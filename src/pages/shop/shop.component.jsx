import React from "react";

import { Route } from "react-router-dom"

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from "../collection/collection.component";

// levergaging our "firestore" from our firebase.utils.js
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

// pushing the SHOP_DATA from Firebase to our Reducer
import { connect } from 'react-redux'
import { updateCollections } from "../../redux/shop/shop.actions";


class ShopPage extends React.Component{

  // Snapshot will be a representation of our collections array
  // that we are going to get from firestore
  unsubscribeFromSnapshot = null

  componentDidMount() {
    // using the "updateCollection" to push SHOP_DATA from firebaes to Redux store
    const { updateCollections } = this.props

    const collectionRef = firestore.collection('collections')

    // so similar to what we did with the "userRef" in our App.js
    // we are going to call the collectionRef here
    // "onSnapshot" will simply informs our App whenever there is an Update
    // or whenever the component is just runs for the first time
    // this collectionRef will send us the snapshot representing the
    // code of our collections objects array at the time this code renders

    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async (snapshot) => {
      console.log("snapshot.docs: ", snapshot.docs)
      // calling the converter util from firebase.utils.js
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)

      console.log("collectionsMap: " , collectionsMap )

      // pushing SHOP DATA from firebase to Redux store
      updateCollections(collectionsMap)
    })

  }

  render () {
    const { match } = this.props

    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview}/>

        {/* INstead of doing "path={"/shop/:category"}" */}
        {/* with  `${match.path}/` it wil be very flexible and you can use it anywhere */}
        <Route path={`${match.path}/:collectionId`}  component={CollectionPage}/>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage)
