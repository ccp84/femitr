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