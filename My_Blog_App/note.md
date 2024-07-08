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
```
### **Create a conf folder and then in this create a confi.js file**
This file will be used to store all the environment variable that we need to use in our app
```javascript
const conf = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    ppwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    
}
export default conf
```

## ***Time to write our code and Implements it***
- Create a folder appwrite and in this folder create a file auth.js
```javascript
import conf from "../conf.js"
import {Client, Account, ID} from "appwrite"
export class AuthService {
    client = new Client();
    account;
    // Because when me create object then constructor automatically invoke 
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }
    async createAccount({email, password, name}) { // write code }
    async login({email, password}) { // write code }
    async getCurrentUser() {// write code}
    async logout() { // write code }

}
const authService = new AuthService
export Default AuthService
```

Now we create a **config.js** file in the appwrite folder 
```javascript
import conf from "../conf.js"
import {Client, ID, Databases, Storage, Query} from "appwrite"
export class Service {
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Strorage(this.clinet)
    }

    async createPost{(title, slug,content, featuresImage, status, userId)}{
    // write the code 
    }

    async updatePost(slug, {title, content, featureImage, status}){
        // write the code
    }

    aysnc deletePost(slug){
        // write the code
    }

    async getPost(){
        // write the code
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        // write the code
    }

    async uploadFile(file){
        // write the code
    }

    async deleteFile(FileId){
        // write the code
    }


}

const service = new Service()
export default service
```


