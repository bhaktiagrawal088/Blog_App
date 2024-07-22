import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases
    bucket

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
        
    }

    async createPost({title, slug, content,  featureImage, status, userId}){
        try {
            const createpost = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status, 
                    userId
                }

            )
            console.log(createpost)
            return createpost
            
        } catch (error) {
            console.log("Appwrite service :: createPost :: error ", error)
        }

    }

    async updatePost(slug, {title, content, featureImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status
                }
            )
            
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error ", error)
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,

            )
            return true;
        }
        catch(error){
            console.log("Appwrite service :: deletePost :: error ", error)
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error" , error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            const pos =  await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
            console.log(pos)
            return pos;
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }
    // async getPosts(){
    //     try {
    //         const collection = await this.databases.getCollection(
    //             conf.appwriteDatabaseId, conf.appwriteCollectionId);
    //             const schema = collection.schema;
    //         if (schema.attributes.status) {
    //             return await this.databases.listDocuments(
    //                 conf.appwriteDatabaseId,
    //                 conf.appwriteCollectionId,
    //                 [Query.equal("status", "active")]
    //             )
    //         } else {
    //             console.log("Status attribute does not exist in the schema");
    //             return false;
    //         }
    //     } catch (error) {
    //         console.log("Appwrite service :: getPosts :: error", error);
    //         return false;
    //     }
    // }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        }
        catch(error){
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deletePost(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            ) 
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    async getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId,
            )
        } catch (error) {
            console.log("Appwrite service :: getFilePreviwe :: error", error);
            return false;
        }
    }
}


const service = new Service()
export default service