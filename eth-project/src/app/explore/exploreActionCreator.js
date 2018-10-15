import { getRequest } from "../../utils/data/API";

export function fetchItems() {
  const url = '/open/item'
  return dispatch => {
    dispatch(fetchItemsBegin());
    return getRequest(url)
      .then(response => {
        dispatch(fetchItemsSuccess(response.data.rows));
        return response;
      })
      .catch(error => dispatch(fetchItemsError(error)));
  }
}

export const fetchItemsBegin = () => ({
  type: "FETCH_ITEMS_BEGIN"
});

export const fetchItemsSuccess = items => ({
  type: "FETCH_ITEMS_SUCCESS",
  payload: { items }
});

export const fetchItemsError = error => ({
  type: "FETCH_ITEMS_FAILURE",
  payload: { error }
});
