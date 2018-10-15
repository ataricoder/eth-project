const initialState = {
  items: {
    target: 50,
    title: "",
    currency: "ETH",
    runner: "",
    beneficiary: "",
    beneAccount: "",
    description: "",
    city: "",
    country: "",
    category: "",
    duration: 30,
    story: ""
  },
  images: {
    cardImgUrl: "",
    storyImgUrl: ""
  },
  activeTab: 0,
  imageStatus: "empty",
  postStatus: null,
  error: null,
  campaignAddress: "",
  campaignId: ""
};

export default function exploreReducer(state = initialState, action) {
  switch (action.type) {
    case "UPLOAD_IMAGE_BEGIN":
      return { ...state, imageStatus: action.payload.status, error: null };

    case "UPLOAD_IMAGE_SUCCESS":
      if (state.activeTab === 1) {
        return { ...state, imageStatus: action.payload.status, images: { ...state.images, cardImgUrl: action.payload.fileURL } };
      }
      return { ...state, imageStatus: action.payload.status, images: { ...state.images, storyImgUrl: action.payload.fileURL } };

    case "UPLOAD_IMAGE_FAILURE":
      return { ...state, imageStatus: action.payload.status, error: action.payload.error };

    case "POST_CAMPAIGN_BEGIN":
      return { ...state, postStatus: action.payload.status, error: null };

    case "POST_CAMPAIGN_SUCCESS":
      return { ...state, postStatus: action.payload.status, campaignId: action.payload.campaignId };

    case "ADD_CAMPAIGN_CONTRACT":
      return { ...state, postStatus: action.payload.status, campaignAddress: action.payload.campaignAddress };

    case "POST_CAMPAIGN_FAILURE":
      return { ...state, postStatus: action.payload.status, error: action.payload.error };

    case "CHANGE_TAB":
      return { ...state, activeTab: action.payload.tabIndex, imageStatus: action.payload.status };

    case "DROP_IMAGE":
      return { ...state, imageStatus: action.status };

    case "SAVE_CHANGE":
      return { ...state, items: { ...state.items, ...action.payload.items } };

    case "RESET_FORM":
      return { ...initialState };

    default:
      return state;
  }
}
