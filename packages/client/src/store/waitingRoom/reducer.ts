import { WaitingRoomEnum } from './enum';
import { waitingRoomInitialState } from './initialState';
import { AlertTypes } from '../../models/alerts';
import { WaitingRoomActions } from './action.interface';
import { WaitingRoomInterface } from './initialState.interface';

const gameReducer = (
  state = waitingRoomInitialState,
  action: WaitingRoomActions,
): WaitingRoomInterface => {
  switch (action.type) {
    case WaitingRoomEnum.InitSavePosts: {
      return {
        ...state,
        alert: false,
        error: null,
      };
    }
    case WaitingRoomEnum.InitGetPosts:
      return {
        ...state,
        loading: true,
      };
    case WaitingRoomEnum.SuccessGetPosts: {
      const { posts } = action.data;
      return {
        ...state,
        loading: false,
        posts,
      };
    }
    case WaitingRoomEnum.SuccessSavePosts: {
      return {
        ...state,
        alert: true,
        alertType: AlertTypes.SavePost,
      };
    }
    case WaitingRoomEnum.FailSavePosts:
    case WaitingRoomEnum.FailGetPosts: {
      const { error } = action.data;
      let alertType = AlertTypes.ServerError;
      const errorStatus = error.response?.status;
      if (!errorStatus || errorStatus >= 500) {
        alertType = AlertTypes.ServerError;
      } else if (errorStatus === 401) {
        alertType = AlertTypes.UnAuthorized;
      } else {
        alertType = AlertTypes.FetchingPosts;
      }
      return {
        ...state,
        loading: false,
        error,
        alertType,
      };
    }
    default:
      return state;
  }
};

export default gameReducer;
