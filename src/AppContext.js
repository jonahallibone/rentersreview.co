import React, { createContext, useState, useCallback, useMemo } from "react";
import auth0 from "auth0-js";

const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const auth = useMemo(() => {
    return new auth0.WebAuth({
      domain: "dev-yxi32afc.auth0.com",
      clientID: "FU9kq4KHArC6r1Q3H4WiS6JIYl0cefnk",
      redirectUri: `${process.env.REACT_APP_HOST_URL}/callback`,
      audience: "https://dev-yxi32afc.auth0.com/userinfo",
      responseType: "token id_token",
      scope: "openid email"
    });
  }, []);

  const authFlag = "isLoggedIn";

  const isAuthenticated = () => {
    const loggedIn = JSON.parse(localStorage.getItem(authFlag));
    return loggedIn;
  };

  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated || false);
  const [user, setUser] = useState(null);

  const login = () => {
    auth.authorize();
  };

  const logout = useCallback(() => {
    localStorage.setItem(authFlag, JSON.stringify(false));
    auth.logout({
      returnTo: process.env.REACT_APP_HOST_URL,
      clientID: "FU9kq4KHArC6r1Q3H4WiS6JIYl0cefnk"
    });
  }, [auth]);

  const setSession = useCallback(() => {
    localStorage.setItem(authFlag, JSON.stringify(true));
    setIsLoggedIn(isAuthenticated());
  }, [setIsLoggedIn]);

  const handleAuthentication = useCallback(() => {
    return new Promise((resolve, reject) => {
      auth.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        setSession(authResult);
        resolve();
      });
    });
  }, [auth, setSession]);

  const getSession = useCallback(
    () =>
      new Promise((resolve, reject) => {
        if (isAuthenticated()) {
          auth.checkSession({}, (err, authResult) => {
            if (err) {
              localStorage.removeItem(authFlag);
              return reject(err);
            }
            console.log(authResult);
            const { idTokenPayload } = authResult;
            
            setUser({
              email: idTokenPayload.email,
              id: idTokenPayload["https://rentersreview.co/uuid"]
            });

            return resolve(authResult);
          });
        } else return resolve("");
      }),
    [auth]
  );

  const silentAuth = useCallback(async () => {
    console.log("authed");
    if (isAuthenticated()) {
      const session = await getSession();
      setSession(session);
      return session;
    }
    return false;
  }, [getSession, setSession]);

  const initalValue = {
    auth,
    login,
    logout,
    silentAuth,
    setSession,
    getSession,
    handleAuthentication,
    isAuthenticated,
    isLoggedIn,
    user
  };

  return (
    <AppContext.Provider value={initalValue}>{children}</AppContext.Provider>
  );
};

export { AppContext as default, AppContextProvider };
