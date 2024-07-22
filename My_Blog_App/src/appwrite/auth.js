import conf from "../conf/conf.js";
import {Client, Account, ID} from "appwrite"

class AppwriteException extends Error {
    constructor(message, status, type, data) {
        super(message);
        this.status = status;
        this.type = type;
        this.data = data;
    }
}
export class AuthService {
    client = new Client()
    account



    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name )
            console.log(userAccount)
            if (userAccount) {
                // call another method
                return this.login({email, password})
            } else {
                return userAccount
            }
            
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }
    // async login({ email, password }) {
    //     try {
    //         const session = await this.account.createEmailSession(email, password);
    //         if (session) {
    //             localStorage.setItem('appwriteSession', JSON.stringify(session));
    //             return session;
    //         }
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    async getCurrentUser(){
        try {
            const acc = await this.account.get();
            console.log(acc)
            return acc;
            
        } catch (error) {
            if (error.code === 401) {
                console.error("User is not authenticated. Redirecting to login...");
                
               
            } else {
                console.error("Appwrite service :: getCurrentUser :: error", error);
            }        
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions()
            
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error)
        }
    }
}

const authService = new AuthService
export default authService