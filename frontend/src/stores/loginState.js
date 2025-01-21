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
        },
        login(userData) {
            this.isLoggedIn = true;
            this.displayName = userData.name;
            this.email = userData.email;
            this.picture = userData.picture;
        }
    }
})