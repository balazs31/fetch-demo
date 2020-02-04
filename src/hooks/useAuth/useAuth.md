# The `useAuth` hook

A simple auth hook extendable with various strategies.

## How it works

- `useAuth.js` returns always these results:

  - `<AuthProvider>` - A top level auth provider
  - `useAuth` - A hook to be called by components

- in `useAuth.js` one has to choose (import) a strategy for authentication. This strategy is usually API (or project) specific.

## Usage

1. Select (import) a strategy specific to the project in `useAuth.js`
2. Remove all the other strategies
3. Make sure `useAuthStrategy` is prepared for the imported strategy:

```js
// in useAuth.js

import { useAuthStrategyYours } from "./strategies/useAuthStrategyYours/";

const useAuthStrategy = strategy => {
  const defaultStrategy = useAuthStrategyDefault();
  const yourStrategy = useAuthStrategyYours();

  switch (strategy) {
    case "yours":
      return yourStrategy;
    case "none":
    default:
      return defaultStrategy;
  }
};
```

4. Wrap the app body into the auth provider:

```js
// in App.js

const App = () => {
  return <AuthProvider strategy="yours">{/* ... */}</AuthProvider>;
};
```

5. Write your own functions handling the API calls / endpoints

```js
// in useAuthStrategyYours.js

/**
 * API specific fetcher
 *
 */
const fetcherLogin = async ({ user }) => {
  const { email, password } = user;

  const response = await fetch(
    `http://api.finsterdata.com/v1/login?email=${email}&password=${password}`
  );

  if (response?.status === "error") throw new Error(`Error: ${response}`);
  return response.json();
};

/**
 * Defines the login function
 */
login = user => {
  setApiCall({
    options: {
      promiseFn: fetcherLogin,
      promiseFnParams: { user: user },
      initialValue: "Logging in ..."
    }
  });
};
```

6. Use your API functions

```js
// in src/components/YourComponent

import { useAuth } from "./../../hooks";

const YourComponent = props => {
  const { isAuthenticated, login, logout, strategy, message } = useAuth();

  const button = isAuthenticated ? (
    <button onClick={() => logout()}>Logout</button>
  ) : (
    <button onClick={() => login(credentials)}>Login</button>
  );

  return { button };
};
```

## Strategies

### Adding a new strategy

If the strategy is of general purpose (eg. oAuth) please consult [Passport.js strategies](http://www.passportjs.org/packages/) when adding a new strategy and try to use the names suggested there.

If the strategy is project specific choose your own name. If it's built on a general purpose strategy add the strategy name as a suffix. Ex.: `useAuthStrategyProjectNameToken`

### Default (none)

Used for demo / learning purposes.
Returns an empty auth object:

```js
auth = {
  isAuthenticated: false,
  user: {},
  login: () => {
    return "Login";
  },
  logout: () => {
    return "logout";
  },
  strategy: "none"
};
```

### Local (email + password)

Plain email and password authentication.
It's useful for testing restricted access points or protected areas in a project.

Please consult [the hook docs](./strategies/useAuthStrategyLocal/useAuthStrategyLocal.md) for details.
