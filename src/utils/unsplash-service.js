import Unsplash, { toJson } from "unsplash-js";

// Создаем экземпляр объекта для доступа к API
const unsplash = new Unsplash({
  // Application ID из настроек вашего приложения
  applicationId:
    "CxWe-Vb05mDpjLFF1V8YBgEor5sk5FiiPUFeysUrY5g",
  // Application Secret из настроек вашего приложения
  secret: "J2RjZ7yCCYZvZtPm77rm_lNzjkXlWGx9fU61Li5cfvI",
  // Полный адрес страницы авторизации приложения (Redirect URI)
  // Важно: этот адрес обязательно должен быть указан в настройках приложения на сайте Unsplash API/Developers
  callbackUrl: "http://localhost:3000/callback"
});

// Генерируем адрес страницы аутентификации на unsplash.com
// и указываем требуемые разрешения (permissions)
export const authenticationUrl = unsplash.auth.getAuthenticationUrl([ // обработка авторизации
  "public",
  "write_likes"
]);

export const setAccessTokenUnplash = code => { // обработка авторизации

  return unsplash.auth
    .userAuthentication(code)
    .then(res => res.json())
    .then(json => json.access_token);
};

export const getSearchPhotos = (searchQwery, page, per_page) => { // загрузка по поиску 

  return unsplash.search
    .photos(searchQwery, page, per_page)
    .then(res => res.json());
};

export const getProfileCurrentUser = () => { // извлекаем профиль

  const token = sessionStorage.getItem("token");
  unsplash.auth.setBearerToken(token);

  return unsplash.currentUser
    .profile()
    .then(res => res.json());
}

export const getlistPhoto = (page, per_page) => { // загрузить фото

  const token = sessionStorage.getItem("token");
  unsplash.auth.setBearerToken(token);

  return unsplash.photos
    .listPhotos(page, per_page)
    .then(res => res.json());
};

export const getPhotoDetails = (idPhoto) => { // загрузить детали фото

  return unsplash.photos
    .getPhoto(idPhoto)
    .then(res => res.json());
};

export const likePhoto = (id, token) => { // поставить лайк
  unsplash.auth.setBearerToken(token);

  unsplash.photos
    .likePhoto(id)
    .then(toJson)
    .then(json => {});
};

export const disLikePhoto = (id, token) => { //убрать лайк
  unsplash.auth.setBearerToken(token);

  unsplash.photos
    .unlikePhoto(id)
    .then(toJson)
    .then(json => {});
};