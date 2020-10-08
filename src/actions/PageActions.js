const loadPhotoAction = (data) => {
    return dispatch => {
        data
            .then(response => {
                dispatch({
                    type: 'LOAD_PHOTOS_SUCCESS_ACTION',
                    result: response,
                    name: 'listPhotos'
                });
            })
            .catch(error => {
                 dispatch({
                    type: 'LOAD_FAILURE_ACTION',
                    payload: error
                });
            });
    }
};



const loadSearchPhotosAction = (data, qwery) => {
    return dispatch => {
        data
            .then(response => {
                dispatch({
                    type: 'LOAD_SEARCH_PHOTOS_ACTION',
                    result: response.results,
                    total: response.total,
                    pages: response.total_pages,
                    qwery: qwery,
                    name: 'searchPhotos'
                });
            })
            .catch(error => {
                dispatch({
                    type: 'LOAD_FAILURE_ACTION',
                    payload: error
                });
            });
    }
};

const loadProfileAction = (data) => {
    return dispatch => {
      data
          .then(response => {
              dispatch({
                  type: 'LOAD_PROFILE_SUCCESS_ACTION',
                  result: response
              });
          })
          .catch(error => {
              dispatch({
                  type: 'LOAD_FAILURE_ACTION',
                  payload: error
              });
          });
  }
};


const loadPhotoDetailsAction = (data) => {
    return dispatch => {
        data
            .then(response => {
                dispatch({
                    type: 'LOAD_DETAILS_SUCCESS_ACTION',
                    result: response
                });
            })
            .catch(error => {
                dispatch({
                    type: 'LOAD_FAILURE_ACTION',
                    payload: error
                });
            });
    }
}
  
const likePhotoAction = (id, status) => {
    return {
        type: 'LIKE_PHOTO_ACTION',
        id, status
    }
};

const disLikePhotoAction = (id, status) => {
    return {
        type: 'DISLIKE_PHOTO_ACTION',
        id, status
    }
};

const logOutAction = () => {
    return {
        type: 'LOG_OUT_ACTION'
    }
};

const logInAction = () => {
    return {
        type: 'LOG_IN_ACTION'
    }
};


const handlerInputsValueAction = (value, id) => {
    return {
        type: 'HANDLER_INPUTS_VALUE_ACTION',
        value, id
    }
};

const handlerClickSearchAction = () => {
    return {
        type: 'HANDLER_CLICK_SEARCH_ACTION'
    }
};


export {
    loadPhotoAction,
    loadSearchPhotosAction, 
    loadProfileAction,
    loadPhotoDetailsAction,
    logOutAction,
    logInAction, 
    likePhotoAction, 
    disLikePhotoAction,
    handlerInputsValueAction,
    handlerClickSearchAction,
}