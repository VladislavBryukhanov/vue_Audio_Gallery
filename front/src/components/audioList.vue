<template>
    <div>
        <!--<div v-for-->
        <h3>Audio List</h3>
        <div v-for="track in audioTracks">
            <span>{{track.name}}</span>
            <span>{{track.author}}</span>
            <img :src="track.titleImage" width="100px"/>
            <img :src="track.audioPath" width="100px"/>
            <hr>
        </div>
        <router-link :to="{name: 'audioTrackConstructor'}">Add new track</router-link>
    </div>
</template>

<script>
    export default {
        name: 'audioList',
        mounted() {
            this.$store.dispatch('getAudioTracks', this.$route.params.id);
        },
        computed: {
            audioTracks() {
                return this.$store.state.audioTracks;
            }
        }
    }
</script>