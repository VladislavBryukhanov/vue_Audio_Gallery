<template>
    <div>
        <form>
            <label>Username</label>
            <input v-model="user.username"/>
            <label>Login</label>
            <input v-model="user.login"/>
            <label>Password</label>
            <input v-model="user.password"/>
            <label>Bio</label>
            <textarea v-model="user.bio"/>
            <button @click.prevent="editProfile">Save changes</button>
        </form>
        <button @click="cancel">Cancel</button>
    </div>
</template>

<script>
    export default {
        name: 'edit-profile',
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
                const editedUser = new FormData();
                for (let fieldName in this.user) {
                    if (this.user[fieldName]) {
                        if (fieldName === 'avatars' && this.user[fieldName].length > 0) {
                            this.user[fieldName].forEach(avatar => {
                                editedUser.append('avatars', avatar);
                            })
                        } else {
                            editedUser.append(fieldName, this.user[fieldName]);
                        }
                    }
                }
                this.$store.dispatch('editProfile', editedUser);
            },
            cancel() {
                this.$router.go(-1);
            }
        }
    }
</script>