import client,{
    removeAuthorizationHeader,
  setAuthorizationHeader,
} from "./client";
import storage from "./tokenStorage";

export const login = credentials => {
    return client.post('api/auth/login', credentials).then(({ accessToken }) => {
      setAuthorizationHeader(accessToken);
      storage.set('auth', accessToken);
    });
  };
  
  export const logout = () => {
    return Promise.resolve().then(() => {
      removeAuthorizationHeader();
      storage.remove('auth');
    });
  };
  
  export const createAdverts = articles => {
    return client.post('/api/v1/adverts', articles)
    };

  export const getAdverts = () => {
    return client.get('/api/v1/adverts');
  }
  export const getAdvertsDetail = advertId => {
    return client.get(`/api/v1/adverts/${advertId}`);
  }

  export const deleteAdvertsDetail = advertId => {
    return client.get(`/api/v1/adverts/${advertId}`);
  }
  