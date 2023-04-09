# Frontend Masters Intro To React v8

## Setup 
* Ran `npm init -y`
* Using prettier version 2.7.1 : `npm install -D prettier@2.7.1`, create .prettierrc file in root
```
{}
```
* Add ESLint to project : `npm install -D eslint@8.24.0 eslint-config-prettier@8.5.0`, create .eslintrc.json in root
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
* Installed vite - `npm install -D vite@3.1.4 @vitejs/plugin-react@2.1.0` , create vite.config.js
```
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
plugins: [react()],
root: "src",
});
```
* Installed react - `npm install react@18.2.0 react-dom@18.2.0`
* In package.json add:
```
// inside scripts
"dev": "vite",
"build": "vite build",
"preview": "vite preview"
```
* Update ESLint for JSX - `npm install -D eslint-plugin-import@2.26.0 eslint-plugin-jsx-a11y@6.6.1 eslint-plugin-react@7.31.8` and update .eslintrc.json
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
* Install ESLint plugin for hooks `npm install -D eslint-plugin-react-hooks@4.6.0`
* Add to .eslintrc.json 
```
"plugin:react-hooks/recommended",
```

## Development

### Pet.jsx
* Files started: main App.jsx, Pet.jsx module. 
* Import Pet into App.jsx 
* From App
```javascript
const App = () => {
return (
<div>
<h1>Adopt Me!</h1>
<Pet name="Obi" animal="Dog" breed="Poodle" />
<Pet name="Fizz" animal="Cat" breed="Persian" />
<Pet name="Nala" animal="Hamster" breed="Sirian" />
</div>
);
};
```
* To test site : `npm run dev`

### SearchParams.jsx
* CSS classes use `<div className="search-params">`
* Form labels use `<label htmlFor="location">`
* Export default SearchParams, start using SearchParams in App and it will auto import at the top!
* `import { useState } from "react";` - React hook, used to pass form variable to update 
* `const [location, setLocation] = useState("");` - set the variables to use from the hook array
* Call this function to update the hook `onChange={(e) => setLocation(e.target.value)}` to pick up user changes within the input box. 
* 
```javascript
 <label htmlFor="breed"> // label the input
          Breed
          <select // html dropdown
            id="breed" // id for form element
            onChange={(e) => setBreed(e.target.value)} // React hook behaviour
            disabled={BREEDS.length === 0} // if no breeds, disable dropdown
            value={breed}
          >
            <option /> // first empty box
            {BREEDS.map((breed) => ( // create array from BREEDS array
              <option key={breed}>{breed}</option> // return a React option tag for each value in BREEDS array
            ))}
          </select>
        </label>
```

* `import { useEffect, useState } from "react";` - useEffect for calls from / write to API, database etc
```javascript
useEffect(() => { 
requestPets();
}, []); // eslint-disable-line react-hooks/exhaustive-deps - this gets eslint to ignore it when its definitely what we meant to do

async function requestPets() {
const res = await fetch( // write the function that calls out to the api
`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
);
const json = await res.json(); // store the response

    setPets(json.pets); // initialise the pets array from the returned json

}

<form
        onSubmit={(e) => {
          e.preventDefault(); // stop submit button refreshing the page
          requestPets();  // submit button calls the function instead
        }}
      >
// OUTSIDE THE FORM - returned data displayed on page
{pets.map((pet) => ( // pets array mapped to Pet modules
<Pet
          name={pet.name}
          animal={pet.animal}
          breed={pet.breed}
          key={pet.id} // always add an id eslint should remind you
        />
))}

```
### Use Breed List
```javascript
if (!animal) { // if theres no animal passed from search set an empty list
setBreedList([]);
} else if (localCache[animal]) { // if list in local cache return that
setBreedList([localCache[animal]]);
} else {
requestBreedList(); // otherwise call the api
}

    async function requestBreedList() {
      setBreedList([]);
      setStatus("Loading");

      const res = await fetch( //fetch result from api
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json(); // set json returned from api
      localCache[animal] = json.breeds || []; // ret cache to api result if empty set to blank list
      setBreedList(localCache[animal]); // set breed list to local cache
      setStatus("Loaded"); // update status
    }

}, [animal]); // pass in parameter

```

### Results

* Moved results div outside search params file into its own component
```javascript
const Results = ({ pets }) => { // parameter passed in
return (
<div className="search">
{!pets.length ? ( // if pets array is empty 
<h1>No Pets Found</h1>
) : (
pets.map((pet) => ( // map pets array
<Pet // react component
animal={pet.animal}
breed={pet.breed}
images={pet.images}
location={`${pet.city}, ${pet.state}`}
key={pet.id}
/>
))
)}
</div>
);
};
```

## React Router
* Install `npm install react-router-dom@6.4.1`
* Import to App `import { BrowserRouter, Routes, Route } from "react-router-dom";`
* Wrap app in tags so that you can use routing:
```javascript
<BrowserRouter>
      <div>
        <h1>Adopt Me!</h1>
        // routing goes in here
      </div>
    </BrowserRouter>
```
* Add in routes :
```javascript
<Routes>
        <Route path="/details/:id" element={<Details />} /> // path is the URL
        <Route path="/" element={<SearchParams />} />      // element is the React component to render
      </Routes>
```
### Using Link-to
* Improves refreshing and accessibility:
* Import `import { Link } from "react-router-dom";`
* Replace `<a href={/details/${id}} className="pet">` with `<Link to={/details/${id}} className="pet">`

## React Query
* Install `npm install @tanstack/react-query@4.10.1`
* Import to app `import { QueryClient, QueryClientProvider } from "@tanstack/react-query";`
* Set up the client:
```javascript
const queryClient = new QueryClient({
defaultOptions: {
queries: {
staleTime: Infinity,
cacheTime: Infinity, // never re fetch or a number in milliseconds
},
},
});
```
* Wrap your app in the query client, after the browser router:
```javascript
<BrowserRouter>
      <QueryClientProvider client={queryClient}>
```
* Use the query : import `import { useQuery } from "@tanstack/react-query";`