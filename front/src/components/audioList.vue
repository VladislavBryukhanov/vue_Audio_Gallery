<template>
    <div>
        <!--<div v-for-->
        <h3>Audio List</h3>
        <router-link :to="{name: 'audioTrackConstructor'}">Add new track</router-link>
        <div v-if="audioTracks">
            <div class="audioTrack" v-for="track in audioTracks.data">
                <div class="audioTitleBlock">
                    <img class="titleImage"
                         :src="track.titleImage | imagePath"/>
                    <h3>{{track.name}}</h3>
                    <h4>{{track.author}}</h4>
                </div>
                <div class="audioFile">
                    <img :src="track.audioPath | imagePath"/>
                </div>
                <!--<hr>-->
            </div>
            <button @click="nextPage" v-show="audioTracks.data.length < audioTracks.count">Next page</button>
        </div>
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
                this.nextPage();
            }
        },
        computed: {
            audioTracks() {
                return this.$store.state.audioTracks;
            }
        },
        methods: {
            nextPage() {
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
        }
    }
</script>