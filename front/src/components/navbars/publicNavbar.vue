<template>
    <div>
        <h1>public Navbar</h1>
        <router-link to="/">Sign In</router-link>
        <router-link to="/signUp">Sign Up</router-link>
        <hr>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'publicNavbar'
    }
</script>