  
  <script>
  import { data } from 'autoprefixer';
import  axios  from 'axios';
  import { decodeCredential } from 'vue3-google-login';
    export default {
      methods: {
        callback(response) {
          const userData = decodeCredential(response.credential)
          // console.log("Handle the userData", response)
          console.log(userData)
          axios.post('http://localhost:5000/api/login', {
            credential: response.credential

          })
          .then(data => console.log(data))
          .catch(error => console.log(error))
        },
        test(){
          axios.get('http://localhost:5000', {
            withCredentials: true  // Include credentials (cookies) in the request
          })
            .then(response => {
              console.log(response.data);  // Log the response data
            })
            .catch(error => {
              console.error('Error:', error);  // Handle errors
            });
        }
      }
    }
  </script>
<template>
 <GoogleLogin :callback="callback"/>
  <button @click="test">Click Me</button>
</template>