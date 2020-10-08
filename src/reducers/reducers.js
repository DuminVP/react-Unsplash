const initialState = {
	photos: [], // фото
	stepLoad: 10, // фото на странице
	photosPhotographer: [], // фото фотографа
	searchResult: { // результаты поиск
		searchPhotos: [] // найденные фото
	},
	profileUser: {}, // профиль пользователя
	profilePhotographer: {}, // профиль фотографа
	photoDetails: {}, // детали фото
	searchQwery: '', // введенный поиск
	loading: false,
	loaded: false,
	error: null
}

// сохранение изменённых полей input
const saveInputValue = (state, name, value) => {
	
	const obj = state.profileUser;

	for(var key in obj){
		if(key === name) obj[key] = value;
	}

	return obj;
}
		
// добавление в state новых  фотографий
const addLoadedPhotos = (state, photos, name) => {
	let arr;
	if(name === 'photosPhotographer') arr = state.photosPhotographer.slice();
	else if(name === 'searchPhotos') arr = state.searchResult.searchPhotos.slice();
	else arr = state.photos.slice(); // name === 'listPhotos'
	//объединяем массивы
	const newArray = arr.concat(photos);
	return newArray;
}

// изменение кол-ва лайков/дизлайков и статуса liked_by_user
const changeStatusLike = (state, idx, status) => {
	const arr = state.photos.slice();

	
	const index = arr.findIndex(param => param.id === idx);

	arr[index].liked_by_user = !status;

	if(status) arr[index].likes -= 1;
	else arr[index].likes += 1;

	return arr;
}








const Reducer = (state = initialState, action) => {
	switch(action.type){

	    case 'LOAD_REQUESTED_ACTION': // загрузить запрошенное действие
	      	return {
		        ...state,
		        loading: true,
		        loaded: false
	      	};

		case 'LOAD_FAILURE_ACTION': // отказ
			return {
				...state,
				loading: false,
				loaded: true,
				error: action.payload
			};	

		case 'LOAD_PHOTOS_SUCCESS_ACTION': // загрузить фото
			return {
				...state,
				photos: addLoadedPhotos(state, action.result, action.name),
		        loading: false,
		        loaded: true,
		        error: null
			}	

		case 'LOAD_SEARCH_PHOTOS_ACTION': // загрузить фото по поиску
			return{ 
				...state,
				searchResult: {
					searchPhotos: addLoadedPhotos(state, action.result, action.name),
                    totalPhotos: action.total,
                    pages: action.pages,
        			qwery: action.qwery
				},
				searchQwery: '',
		        loading: false,
		        loaded: true,
		        error: null
			}		

		case 'LOAD_PROFILE_SUCCESS_ACTION': //загрузка профиля
			return{ 
				...state,
				profileUser: action.result,
		        loading: false,
		        loaded: true,
		        error: null
			}	

		case 'LOAD_DETAILS_SUCCESS_ACTION': // загрузка деталей фото
			return {
				...state,
				photoDetails: action.result,
		        loading: false,
		        loaded: true,
		        error: null
			}

		case 'LIKE_PHOTO_ACTION': // лайк
			return{ 
				...state,
				photos: changeStatusLike(state, action.id, action.status)
			};

		case 'DISLIKE_PHOTO_ACTION': //дизлайк
			return{ 
				...state,
				photos: changeStatusLike(state, action.id, action.status)
			};

		case 'LOG_OUT_ACTION': // выйти из профиля
			return{ 
				...state,
			};

		case 'LOG_IN_ACTION': // войти в профиль
			return{ 
				...state,
			};

		case 'HANDLER_INPUTS_VALUE_ACTION': // проверка на ввод в поиск
			if(action.id === 'search'){
				return{ 
					...state,
					searchQwery: action.value
				};
			}
			else{
				return{ 
					...state,
					profileUser: saveInputValue(state, action.id, action.value)
				};
			};

		case 'HANDLER_CLICK_SEARCH_ACTION': // нажатие кнопки поиск
			return{ 
				...state,
				searchResult: {
					searchPhotos: [],
			        totalPhotos: 0,
			        pages: 0,
        			qwery: ''
				}
			};

		default:
			return state;
	}
}

export default Reducer;