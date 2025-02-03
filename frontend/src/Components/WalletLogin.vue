<script>
import { useLoginState } from '../stores/loginStateStore';
import axios from 'axios';
import { decodeCredential } from 'vue3-google-login';
import { useRouter } from 'vue-router';
import { configStore } from '../stores/configstore';

// const router = useRouter();

export default {
  data() {
    return {
      loginState: useLoginState(),
      router: useRouter(),
      configState: configStore()
    };
  },
  computed: {
    isLoggedIn() {
      return this.loginState.isLoggedIn;
    },
    backendURL() {
      return this.configState.backendURL();
    }
  },
  methods: {
    callback(response) {
      const userData = decodeCredential(response.credential);
      // console.log(userData);

      axios.post(`${this.backendURL}/api/login`, {
          credential: response.credential,
        })
        .then((response) => response.data)
        .then((data) => {
          this.loginState.login(data.user, response.credential); 
          this.router.push({ name: 'dashboard' });
        })
        .catch((error) => console.log(error));
    },
    test() {
      axios
        .get(`${this.backendURL}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
  },
};
</script>

<template>
  <GoogleLogin v-if="!isLoggedIn" :callback="callback" />
  <button
    v-else
    @click="loginState.logout()"
    type="button"
    class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
  >
    Log out
  </button>
</template>
