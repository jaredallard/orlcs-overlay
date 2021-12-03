# orlcs-overlay

A Rocket League overlay written in react (create-react-app) for use with [SOS](https://gitlab.com/bakkesplugins/sos).

## Running

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## OBS

To use in OBS, run with `yarn start` and add a web source pointing to http://localhost:3000.

## Configuration

Currently there is a super simple configuration system. Run the server component with `nodemon controller.js`. This will start a local web server that dishes out the contents of `state.json`.

NOTE: See `state.example.json` for the format

This is then polled by the web component every 1000ms. Eventually I'll make this better, but I needed a quick way to do this.

### Changing the logo

Replace `logo.svg` in `src/` with something else. If you want to use a non svg you'll want to update the import path as well (grep for `logo.svg`)