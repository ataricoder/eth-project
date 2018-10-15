const initialState = {
  web3Instance: null,
  isLoading: false
}

const web3Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "WEB3_INITIALIZED":
      return Object.assign({}, state, {
        web3Instance: action.payload.web3Instance.eth
      });
    case "WEB3_ACCOUNT_GET":
      return Object.assign({}, state, { account: action.payload });
    case "WEB3_BALANCE_UPDATED":
      return Object.assign({}, state, { balance: action.payload });
    case "WEB3_TRANSCATION_MADE":
      return Object.assign({}, state, { block: action.payload });
    case "WEB3_CONTRACT_DEPLOYED":
      return Object.assign({}, state, { contractAddress: action.payload, isLoading: false });
    case "WEB3_CONTRACT_DEPLOY_START":
      return Object.assign({}, state, { contractAddress: action.payload, isLoading: true });

    default:
      return state;
  }
}

export default web3Reducer
