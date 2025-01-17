  
  <script>
    export default {
      methods: {
        callback(response) {
          console.log("The response was", response);
        } 
      }
    }
  </script>
<template>
 <GoogleLogin :callback="callback"/>
    
</template>