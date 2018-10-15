const initialState = {
  items: [],
  loading: false,
  error: null,
  itemCount: 0,
  itemFilter: "all",
  pending: false
};

export default function exploreReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_ITEMS_BEGIN":
      return { ...state, loading: true, error: null };
    case "FETCH_ITEMS_SUCCESS":
      return { ...state, loading: false, items: action.payload.items };
    case "FETCH_ITEMS_ERROR":
      return { ...state, loading: false, error: action.payload.error };
    case "CAMPAIGN_CONTRIBUTE_START":
      return { ...state, pending: true };
    case "CAMPAIGN_CONTRIBUTE_SUCCESS":
      return { ...state, pending: false, receipt: action.payload };
    case "CAMPAIGN_CONTRIBUTE_FAILURE":
      return { ...state, pending: false, error: action.payload };
    case "ITEMS_DATABASE_UPDATE_SUCCESS":
      return { ...state, receipt: action.payload.data };
    default:
      return state;
  }
}
