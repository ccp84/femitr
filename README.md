# Frontend Masters Intro To React v8

## Setup 
* Ran npm init -y
* Using prettier version 2.7.1 : npm install -D prettier@2.7.1, create .prettierrc file in root
```
{}
```
* Add ESLint to project : npm install -D eslint@8.24.0 eslint-config-prettier@8.5.0, create .eslintrc.json in root
```
{
"extends": ["eslint:recommended", "prettier"],
"plugins": [],
"parserOptions": {
"ecmaVersion": 2022,
"sourceType": "module",
"ecmaFeatures": {
"jsx": true
}
},
"env": {
"es6": true,
"browser": true,
"node": true
}
}
```
* Created .gitignore
```
node_modules
dist/
.env
.DS_Store
coverage/
.vscode/
```
* Installed vite - npm install -D vite@3.1.4 @vitejs/plugin-react@2.1.0 , create vite.config.js
```
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
plugins: [react()],
root: "src",
});
```
* Installed react - npm install react@18.2.0 react-dom@18.2.0
* In package.json add:
```
// inside scripts
"dev": "vite",
"build": "vite build",
"preview": "vite preview"
```
* Update ESLint for JSX - npm install -D eslint-plugin-import@2.26.0 eslint-plugin-jsx-a11y@6.6.1 eslint-plugin-react@7.31.8 and update .eslintrc.json
```
{
"extends": [
"eslint:recommended",
"plugin:import/errors",
"plugin:react/recommended",
"plugin:jsx-a11y/recommended",
"prettier"
],
"rules": {
"react/prop-types": 0,
"react/react-in-jsx-scope": 0
},
"plugins": ["react", "import", "jsx-a11y"],
"parserOptions": {
"ecmaVersion": 2022,
"sourceType": "module",
"ecmaFeatures": {
"jsx": true
}
},
"env": {
"es6": true,
"browser": true,
"node": true
},
"settings": {
"react": {
"version": "detect"
},
"import/resolver": {
"node": {
"extensions": [".js", ".jsx"]
}
}
}
}
```


## Development

* Files started: main App.jsx, Pet.jsx module. 
* Import Pet into App.jsx 