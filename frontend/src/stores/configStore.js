import { defineStore } from "pinia";

export const configStore = defineStore('configStore',{
    actions:{
        backendURL(){
            return process.env.BACKEND_URL
        }
    }
})