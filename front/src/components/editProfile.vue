<template>
    <div>
        <form>
            <label>Username</label>
            <input v-model.trim="user.username"/>
            <label>Login</label>
            <input v-model.trim="user.login"/>
            <label>Password</label>
            <input v-model.trim="user.password"/>
            <label>Bio</label>
            <textarea v-model="user.bio"></textarea>
            <button @click.prevent="editProfile">Save changes</button>
        </form>
        <button @click="cancel">Cancel</button>
    </div>
</template>

<script>
    export default {
        name: 'editProfile',
        data() {
            return {
                user: {
                    username: this.$store.state.profile.username,
                    login: this.$store.state.profile.login,
                    bio: this.$store.state.profile.bio,
                    password: ''
                }
            }
        },
        methods: {
            editProfile() {
                let isEmpty = true;
                const editedUser = new FormData();
                for (let fieldName in this.user) {
                    if (this.user[fieldName] && this.user[fieldName] !== this.$store.state.profile[fieldName]) {
                        if (fieldName === 'avatars' && this.user[fieldName].length > 0) {
                            this.user[fieldName].forEach(avatar => {
                                editedUser.append('avatars', avatar);
                            })
                        } else {
                            isEmpty = false;
                            editedUser.append(fieldName, this.user[fieldName]);
                        }
                    }
                }
                if (!isEmpty) {
                    this.$store.dispatch('editProfile', editedUser);
                    this.$router.go(-1);
                }
            },
            cancel() {
                this.$router.go(-1);
            }
        }
    }
</script>