<template>
    <div>
        <div class="navBar">
            <div class="navigation">
                <router-link to="/">Sign In</router-link>
                <router-link to="/signUp">Sign Up</router-link>
            </div>
        </div>
        <div class="mainContent">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'publicNavbar'
    }
</script>