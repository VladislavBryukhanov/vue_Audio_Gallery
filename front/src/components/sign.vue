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
                // const {login, password, username} = this;
                // this.$http.post('/getReq', {login, password, username})
                //     .then(res => {
                //         console.log(res);
                //     })
                this.$router.push('/main');
            },
            signIn() {
                this.$router.push('/main');
            }
        }
    }
</script>