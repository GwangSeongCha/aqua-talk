import { SET_USER, CLEAR_USER } from "../actions/types";
// , SET_PHOTO_URL

// const initialUserState = {
//   currentUser: null,
//   isLoading: true,
// };

const initialUserState = {
  currentUser: null,
  // id: null,
  // email: null,
  // displayName: null,
  // googleId: null,
};

export default function (state = initialUserState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case CLEAR_USER:
      return { ...state, currentUser: null };
    //   case SET_PHOTO_URL:
    //     return {
    //       ...state,
    //       currentUser: { ...state.currentUser, SET_PHOTO_URL: action.payload },
    //     };
    default:
      return state;
    // }
  }
}
