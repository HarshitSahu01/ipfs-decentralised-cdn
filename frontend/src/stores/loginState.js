import { defineStore } from "pinia";

export const useLoginState = defineStore('loginState', {
    state: () => ({
        isLoggedIn: false,
        displayName: '',
        email: '',
        picture: ''
    }),

    actions: {
        logout() {
            this.isLoggedIn = false;
            this.displayName = '';
            this.email = '';
            this.displayPhoto = '';
            this.credential = '';
        },
        login(userData, credential) {
            this.isLoggedIn = true;
            this.displayName = userData.displayName;
            this.email = userData.email;
            this.picture = userData.photoURL;
            this.credential = credential;
        }
    }
})