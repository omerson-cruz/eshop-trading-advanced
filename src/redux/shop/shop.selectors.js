import { createSelector } from 'reselect'


/**
 * No need of ID Mapping because of Data Normalization
 */
// const COLLECTION_ID_MAP = {
//     hats: 1,
//     sneakers: 2,
//     jackets: 3,
//     womens: 4,
//     mens: 5
// }

const selectShop = state => state.shop

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

// NOTE how we are wrapping the "createSelector" with another arrow function
// in order to pass the value of "collectionUrlParam" from the url path
export const selectCollection = collectionUrlParam =>
    createSelector(
      [selectCollections],
      collections =>
        collections[collectionUrlParam]
    )


/**
 * Creating a new selector that will convert "collections" keye'd normalized object
 * into an Array.
 */
 export const selectCollectionsForPreview = createSelector(
     [selectCollections],
     // what Object.keys does is to return an array of keys of an object
     // in this case we intend to create an array of "keys" for this
     //     normalized object and then using map to re-create the
     //     object in an Array format
     collections => {
         // so this is conversion of "keyed" Object or Map Object into an Array
         return Object.keys(collections).map(key => collections[key])
     }
 )