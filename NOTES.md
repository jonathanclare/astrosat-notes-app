Created astrosat-notes-app using create-react-app
Left all defaults for browsersList

Started and built app to check everything worked.

Added astrosat-notes-app repository to GitHub
Added astrosat-notes repository to GitHub

Set up astrosat-notes as GitHub Page to serve the built app
URL at https://jonathanclare.github.io/astrosat-notes/

Added postbuild to package.json to copy build files from astrosat-notes-app to astrosat-notes
"postbuild": "xcopy /s C:\\Work\\GitHub\\astrosat-notes-app\\build C:\\Work\\GitHub\\astrosat-notes",

URL didnt work first time out. Added homepage to package.json so that js and css files could be picked up from correct relative path
"homepage": "https://jonathanclare.github.io/astrosat-notes/"

Installed redux, react-redux and react-router-dom

Created redux store.

Created routing.

At this point should probably write some tests to test the routes and pass in a notes array

Started creating edit page as we need to be able to enter some notes before we can test the routing.

Installed moment for date manipulation.

// TODO
refactor css
add sass
Notes Page might be better refactored in to a view page and an edit page
formatting of text coming out of text area