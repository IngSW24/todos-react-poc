# React Crash Course

This is a React app which uses [Vite](https://vite.dev/) as a build tool. Online you might see a lot of examples based on a build tool known as **create-react-app** which is slowly becoming legacy and is quite known to be slow and boring. Vite is the new way to go, it works very well and creates efficient bundles providing a great dev experience.

The app consists of three examples:

- TodoAppBasic (`src/TodoAppBasic`)
- TodoAppLocalStorage (`src/TodoAppLocalStorage`)
- TodoAppContext (`src/TodoAppContext`)

All the examples illustrate different react functionalities. The first one focuses on stateful variables and rendering, the second one illustrates what side effects are and the third one shows how the context API can be used to simplify the application's logic providing shared access to some parts of the state.

All the folders have a README file with more in-depth explanations.

The `App.tsx` file is the application entrypoint which is itself a React example. It uses state and conditional rendering to render the selected version of the Todo App.

## Running the app

- Clone the repository
- Run `npm install` to install dependencies
- Run `npm run dev` for a live dev server which reloads on changes
- Run `npm run build` to build the application. The build can be deployed as any other static asset
