import config from "../config/config";
import { Client, ID, Databases, Storage, Query  } from "appwrite";


export class Service{

    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectID);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);     
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteTableID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
            
        } catch (error) {
            console.error("Appwrite service :: createPost :: error :: "+error);
        }
    }

    async updatePost(slug,{title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteTableID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
            
        } catch (error) {
            console.error("Appwrite service :: updatePost :: error :: "+error);
        }
    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteTableID,
                slug
            )
            return true;
        } catch (error) {
            console.error("Appwrite service :: deletePost :: error :: "+error);
            return false; 
        }
    }

    async getPost(slug){

        try {
            
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteTableID,
                slug
            )

        } catch (error) {
            console.error("Appwrite service :: getPost :: error :: "+error);
            return false;
        }

    }


    async getPosts( queries = [ Query.equal("status", "active") ] ){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteTableID,
                queries
            )
            
        } catch (error) {
            console.error("Appwrite service :: getPosts :: error :: "+error);
            return false;
        }
    }


}

const service = new Service();

export default service;