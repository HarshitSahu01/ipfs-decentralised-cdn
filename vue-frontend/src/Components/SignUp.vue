    <script>
    import WalletLogin from '../Components/WalletLogin.vue';
    
    export default {
        name: 'SignUp'
    }
    </script>
<template>
    <h1>Sign Up</h1>
    <div class="signup">
        <input type="text" v-model="name" placeholder="Enter name"/>
        <input type="text" v-model="email" placeholder="Enter email" />
        <input type="password" v-model="password" placeholder="Enter password" />
        <button>Sign up</button>
        <p>
            <router-link to="/login">Login</router-link>
        </p>
    </div>
    <WalletLogin/>
</template>


<style scoped>
    h1 {
        text-align: center;
        color: #2c3e50;
        font-family: 'Poppins', sans-serif;
        margin-bottom: 20px;
        font-weight: bold;
    }

    .signup {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        max-width: 400px;
        margin: 0 auto;
        padding: 30px;
        border: 1px solid #e1e1e1;
        border-radius: 10px;
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
        background-color: #ffffff;
        transition: transform 0.3s ease;
    }

    .signup:hover {
        transform: translateY(-5px);
    }

    input {
        width: 100%;
        padding: 12px;
        border: 1px solid #dcdcdc;
        border-radius: 6px;
        font-size: 16px;
        font-family: 'Roboto', sans-serif;
        background-color: #f8f8f8;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: border-color 0.3s ease;
    }

    input:focus {
        border-color: #007bff;
        outline: none;
    }

    button {
        padding: 12px 25px;
        border: none;
        border-radius: 6px;
        background-color: #28a745;
        color: white;
        font-size: 16px;
        font-family: 'Poppins', sans-serif;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }

    button:hover {
        background-color: #218838;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    button:active {
        background-color: #1e7e34;
    }

    p {
        margin-top: 10px;
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
        color: #6c757d;
    }

    p a {
        color: #007bff;
        text-decoration: none;
        font-weight: bold;
    }

    p a:hover {
        text-decoration: underline;
    }
</style>
