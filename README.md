## Start the project:

1. `npm i`
2. `npm start` => this will run `vite`

[SOLID principles:](https://developero.io/blog/react-solid-example)

### Imports order:

1. External components
2. Internal components
3. Resources

Example:

```
// external
import React from "react"
// internal
import Input1 from "../components/general/Input1";
// media
import Eye from "../assets/images/eye.png";
```

### Reusability / Abstraction:

- If something is used more than once, abstract it
- If something is not relevant for the component, split it

### [Thinking in React:](https://reactjs.org/docs/thinking-in-react.html) ↓

1. Break The UI Into A Component Hierarchy
2. Build A Static Version
3. Identify The Minimal (but complete) Representation Of UI State
4. Identify Where Your State Should Live
5. Add Inverse Data Flow
6. And That’s It

### Making calls to server

- Use async/await
- Wrap in try/catch block
- Use axios to make calls
- No need to send user email or id, it is sent always ( check authentication ↓ )

### When logging in:

- Token will be saved in cookies

### Authentication

- Function looks for token in cookies
- If no token => redirect to login
- If token => check token
- If token ivalid => redirect to login
- If token valid => go
- Also token is saved in axios.defaults.headers.common.Authorization

### Styling:

- If style is used in +1 component => create class
- Else use @emotion/react
- In order to use @emotion/react:
  - Import this on top of page:
  ```
  /** @jsxRuntime classic */
  /** @jsx jsx */
  import { jsx } from "@emotion/react";
  ```
  - It removes the need to import react

### ENV

- NODE_NPSDN means inches or mms

### Get User Info

1. Import useContext
2. Import AuthContext
3. Destructure { user, isLoggedIn } from it

### Commenting

- Ideally code is descriptive enough to avoid commenting
- Comments should only be used if variable naming is not enough

### Librería de Iconos:

[](https://icons8.com/)

### Help I got online:

- [Borders for fake table:](https://stackoverflow.com/questions/10023799/how-to-collapse-the-borders-of-a-set-of-div-tags-using-css/10023942#10023942)]
- [How to paste from Excel](https://stackblitz.com/edit/paste-from-excel?file=index.js)
- [Reset input to defaultValue](https://stackoverflow.com/questions/42706265/react-es6-const-clear-input-defaultvalue-on-focus)
- [Blur Input on press Esc](https://stackoverflow.com/questions/48961342/how-to-blur-the-input-provided-in-semantic-ui-react)
- [Paste Table To Clipboard](https://stackoverflow.com/questions/66585315/how-to-copy-table-with-link-to-clipboard-to-paste-it-into-excel)
- [Export table to Excel](https://stackoverflow.com/questions/11084564/export-html-table-to-excel-javascript-function-special-characters-changed)
- [Trigger re-render when location change](https://stackoverflow.com/questions/57986395/react-useeffect-is-not-triggering-on-route-change)

### FEED

1. Things you CAN do:

- Copy 1 cell
- Copy 1 row
- Copy multiple rows
- Copy all rows
- Paste 1 cell
- Paste 1 row
- Paste multiple rows

# CAMBIAR FEED PIPES VIEW:

CREATE
ALGORITHM = UNDEFINED
DEFINER = `root`@`localhost`
SQL SECURITY DEFINER
VIEW `feed_pipes_view` AS
SELECT
`feed_pipes`.`id` AS `id`,
`feed_pipes`.`line_refno` AS `line_refno`,
`feed_pipes`.`area_id` AS `area_id`,
`feed_pipes`.`diameter` AS `diameter`,
`feed_pipes`.`train` AS `train`,
`feed_pipes`.`status` AS `status`,
`lines`.`calc_notes` AS `calc_notes`,
`lines`.`tag` AS `line_reference`,
`lines`.`unit` AS `unit`,
`lines`.`fluid` AS `fluid`,
`lines`.`seq` AS `seq`,
`lines`.`spec_code` AS `spec`,
`lines`.`insulation` AS `insulation`,
`areas`.`name` AS `area`
FROM
((`feed_pipes`
JOIN `lines` ON ((`feed_pipes`.`line_refno` = `lines`.`refno`)))
JOIN `areas` ON ((`feed_pipes`.`area_id` = `areas`.`id`)))
