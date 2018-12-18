<template>
    <div>
        <div v-if="isSignUp">
            <h1>Sign up</h1>
            <form>
                <label>login</label>
                <input v-model="login"/>
                <label>password</label>
                <input v-model="password"/>
                <label>username</label>
                <input v-model="username"/>
                <button @click.prevent="signUp">Sign up</button>
            </form>
        </div>
        <div v-else>
            <h1>Sign in</h1>
            <form>
                <label>login</label>
                <input v-model="login"/>
                <label>password</label>
                <input v-model="password"/>
                <button @click.prevent="signIn">Sign in</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SignUp',
        data() {
            return {
                login: '',
                password: '',
                username: '',
            }
        },
        props: {
            isSignUp: Boolean
        },
        methods: {
            signUp() {
                const {login, password, username} = this;
                this.$store.dispatch('signUp', {login, password, username})
                    .then(_ => this.$router.push('/main'));
            },
            signIn() {
                const {login, password} = this;
                this.$store.dispatch('signIn', {login, password})
                    .then(_ => this.$router.push('/main'));
            }
        }
    }
</script>
