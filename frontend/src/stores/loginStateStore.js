import { defineStore } from "pinia";
// import router from 'vue'

export const useLoginState = defineStore('loginState', {
    state: () => ({
        isLoggedIn: false,
        displayName: '',
        email: '',
        picture: '',
        credential: ''
    }),

    actions: {
        logout() {
            this.isLoggedIn = false;
            this.displayName = '';
            this.email = '';
            this.displayPhoto = '';
            this.credential = '';
            router.push({ name: 'home' });
        },
        login(userData, credential) {
            this.isLoggedIn = true;
            this.displayName = userData.displayName;
            this.email = userData.email;
            this.picture = userData.photoURL;
            this.credential = credential;
            router.push({name: 'dashboard'});
        }
    }
})