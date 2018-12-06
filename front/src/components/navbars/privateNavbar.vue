<template>
    <div>
        <h1>private Navbar</h1>
        <router-link :to="{name: 'home'}">Home</router-link>
        <router-link to="profile">Profile</router-link>
        <hr>
        <router-view></router-view>
    </div>

</template>

<script>
    export default {
        name: 'privateNavbar'
    }
</script>