Spring Boot Vue Example
======================================

A Vue.js version of this example ( https://github.com/winterbe/spring-react-example ).

The `CommentBox` main view is isomorphic: HTML is initially rendered on the server with Nashhorn by utilizing `renderToString`. All interactive DOM manipulations are handled by Vue.js directly in the browser.

#### How to launch

```sh
mvn spring-boot:run
```

#### How to build JavaScript

```sh
# First time only
git submodule init

git submodule update

# If you want to update Vue.js
cd js/vue && git pull origin next
npm install
cd ../..

# Build bundle.js
npm run build
```
