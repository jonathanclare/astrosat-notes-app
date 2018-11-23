### Files...

```sh
\src\App.js
```
Contains routing.

```sh
\src\store\store.js
```
Contains the Redux Store for handling all the data and persisting the state to local storage.

```sh
\src\container\Note.js
```
The guts of the App - responsible for the majority of the rendering and UI logic.

### Known Issue...
Theres a routing BUG so that if your not at the base url ie. https://jonathanclare.github.io/astrosat-notes/ and you refresh the page you'll get a 404 returned. I know a couple of solutions to this but havent had time to figure it out yet for GitHub hosted pages.
https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writting-manually

### Browsers...
Ive just stuck with the default browser support that comes with create-react-app. So chrome tends to be ok and any version of IE > 11. Any issues viewing this and you can get in touch with me at jonathan.david.clare@gmail.com