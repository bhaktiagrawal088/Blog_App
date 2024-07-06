# ***All steps to create this app***
### Some basic stuff that we needed
1. Create a new folder  (npm create vite@latest)
2. Install npm (npm i)
3. Install some dependencies (npm i @reduxjs/toolkit react-redux react-router-dom appwrite @tinymce/tinymce-react html-react-parser
react-hook-form )
4. Create a environment file (.env) in the root folder and also create a (.env.sample ) for github purpose

    **This environment variable will be defined for you on process.env. For example have an evironment variable REACT_APP_NOT_SECRET_CODE will be exposed in your JS process.env.**
    ```javaScript
    REACT_APP_APPWRITE_URL="test evironment"
    console.log(process.env.REACT_APP_APPWRITE_URL)
    ```
###     ***But this not use for our app because we are create a vite app***
**To prevent accidentally leaking env variables to the client, only variables prefixed with VITE_ are exposed to your Vite-processed code. e.g. for the following env variables:**

```javaScript
VITE_APPWRITE_URL="test evironment"
console.log(import.meta.env.VITE_APPWRITE_URL)
```

***Add some variable in our .env file***
```javascript
VITE_APPWRITE_URL=""
VITE_APPWRITE_PROJECT_ID=""
VITE_APPWRITE_DATABASE_ID=""
VITE_APPWRITE_COLLECTION_ID=""
VITE_APPWRITE_BUCKET_ID=""



