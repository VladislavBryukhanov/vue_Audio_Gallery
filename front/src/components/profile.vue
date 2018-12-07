<template>
    <div>
        <h2>Profile</h2>
        <p>{{profile.username}}</p>
        <p>{{profile.login}}</p>
        <router-link to="editProfile">Edit profile</router-link>
    </div>
</template>

<script>
    export default {
        name: 'profile',
        computed: {
            profile() {
                return this.$store.state.profile;
            }
        }
    }
</script>
