import React from "react";

import { Route } from "react-router-dom"

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from "../collection/collection.component";

const ShopPage = ({ match }) => {
  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionsOverview}/>

      {/* INstead of doing "path={"/shop/:category"}" */}
      {/* with  `${match.path}/` it wil be very flexible and you can use it anywhere */}
      <Route path={`${match.path}/:collectionId`}  component={CollectionPage}/>
    </div>
  );
};

export default ShopPage
