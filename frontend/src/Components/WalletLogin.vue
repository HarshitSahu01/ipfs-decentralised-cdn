<script>
import { useLoginState } from '../stores/loginState';
import axios from 'axios';
import { decodeCredential } from 'vue3-google-login';

export default {
  data() {
    return {
      loginState: useLoginState(),
    };
  },
  computed: {
    isLoggedIn() {
      return this.loginState.isLoggedIn;
    },
  },
  methods: {
    callback(response) {
      const userData = decodeCredential(response.credential);
      console.log(userData);

      axios
        .post('http://localhost:5000/api/login', {
          credential: response.credential,
        })
        .then((response) => response.data)
        .then((data) => {
          console.log('Login successful');
          this.loginState.login(data.user, response.credential); // Assuming the 'login' method exists in store
        })
        .catch((error) => console.log(error));
    },
    test() {
      axios
        .get('http://localhost:5000')
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
