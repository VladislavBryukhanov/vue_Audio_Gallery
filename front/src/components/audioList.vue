<template>
    <div>
        <!--<div v-for-->
        <h3>Audio List</h3>
        <div v-if="audioTracks">
            <div v-for="track in audioTracks.data">
                <div class="audioTitleBlock">
                    <img class="titleImage"
                         :src="track.titleImage | imagePath" height="100px"/>
                    <h3>{{track.name}}</h3>
                    <h4>{{track.author}}</h4>
                </div>
                <img :src="track.audioPath | imagePath" height="100px"/>
                <hr>
            </div>
        </div>
        <router-link :to="{name: 'audioTrackConstructor'}">Add new track</router-link>
    </div>
</template>

<script>
    export default {
        name: 'audioList',
        data() {
            return {
                page: 0,
                limit: 3
            }
        },
        mounted() {
            if (!this.audioTracks || this.audioTracks.data.length === 0) {
                this.$store.dispatch(
                    'getAudioTracks',
                    {
                        id: this.$route.params.id,
                        offset: this.limit * this.page,
                        limit: this.limit
                    }
                );
                this.page++;
            }
        },
        computed: {
            audioTracks() {
                return this.$store.state.audioTracks;
            }
        }
    }
</script>