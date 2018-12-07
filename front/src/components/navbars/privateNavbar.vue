<template>
    <div>
        <div class="navBar">
            <div  class="navigation">
                <router-link :to="{name: 'home'}">Home</router-link>
            </div>
            <div class="profile">
                <router-link class="username" to="profile">{{user.username}}</router-link>
                <!--<img-->
                        <!--src={{this.authService.myUser.avatar|imagePath}}-->
                        <!--class="userAvatar"-->
                        <!--routerLink="/profile/{{this.authService.myUser._id}}"/>-->
                <a @click="logOut" class="logOutBtn">Log out</a>
            </div>
        </div>
        <div class="mainContent">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'privateNavbar',
        methods: {
            logOut() {
                this.$store.commit('logOut');
                this.$router.push('/');
                // this.$router.go('/');
            }
        },
        computed: {
            user() {
                return this.$store.state.profile
            }
        }
    }
</script>