## Start the project:

- `npm i`
- `npm start` => this will run `vite`

[S.O.L.I.D principles]("https://developero.io/blog/react-solid-example")

### Imports order:

- External components
- Internal components
- Resources

Example:

```
*external*
import React from "react"
*internal*
import Input1 from "../components/general/Input1";
*media*
import Eye from "../assets/images/eye.png";
```

### Reusability / Abstraction:

- If something is used more than once, abstract it
- If something is not relevant for the component, split it

[Thinking in React:](https://reactjs.org/docs/thinking-in-react.html) ↓

- Break The UI Into A Component Hierarchy
- Build A Static Version
- Identify The Minimal (but complete) Representation Of UI State
- Identify Where Your State Should Live
- Add Inverse Data Flow
- And That’s It

### Making calls to server

- Use async/await
- Wrap in try/catch block
- Use axios to make calls
- No need to send user email or id, it is sent always ( check authentication ↓ )

### When logging in:

- token will be saved in cookies

### Authentication

- Function looks for token in cookies
- If no token => to login
- If token => check token
- If token ivalid => to login
- If token valid => wherever user was going
- Also token is saved in axios.defaults.headers.common.Authorization

### Styling:

- If style is used in +1 component => create class
- else use @emotion/react
- to use @emotion/react:
  - Import this on top of page:
  ```/** @jsxRuntime classic */
     /** @jsx jsx */
     import { jsx } from "@emotion/react";
  ```
  - It removes the need to import react

### Get User Info

- Import useContext
- Import AuthContext
- Destructure { user, isLoggedIn } from it

### Commenting

- Ideally code is descriptive enough to avoid commenting
- Comments should only be used if variable naming is not enough
