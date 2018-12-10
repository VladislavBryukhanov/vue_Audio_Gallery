<template>
    <div>
        <!--<div v-for-->
        <h3>Audio List</h3>
        <div v-for="track in audioTracks">
            <div class="audioTitleBlock">
                <img class="titleImage"
                     :src="track.titleImage | imagePath" height="100px"/>
                <h3>{{track.name}}</h3>
                <h4>{{track.author}}</h4>
            </div>
            <img :src="track.audioPath | imagePath" height="100px"/>
            <hr>
        </div>
        <router-link :to="{name: 'audioTrackConstructor'}">Add new track</router-link>
    </div>
</template>

<script>
    export default {
        name: 'audioList',
        mounted() {
            if (this.audioTracks.length === 0) {
                this.$store.dispatch('getAudioTracks', this.$route.params.id);
            }
        },
        computed: {
            audioTracks() {
                return this.$store.state.audioTracks;
            }
        }
    }
</script>