import { defineStore } from "pinia";

export const configStore = defineStore('configStore',{
    state: () => {
        renderURL: 'https://express-backend-2b4s.onrender.com'
    },

    actions:{
        backendURL(){
            if(location.hostname === 'localhost')
                return 'http://localhost:5000'
            return this.renderURL
        }
    }
})