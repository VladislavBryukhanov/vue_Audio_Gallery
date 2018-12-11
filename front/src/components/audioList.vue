<template>
    <div v-infinite-scroll="nextPage">
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
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'audioList',
        data() {
            return {
                page: 0,
                limit: 3,
                // scroll: {
                //     scrollPosition: 0,
                //     scrollHeight: 0,
                //     screenHeight: 0,
                // },
                // bottom: false
            }
        },
        computed: {
            audioTracks() {
                return this.$store.state.audioTracks;
            }
        },
        mounted() {
            if (!this.audioTracks || this.audioTracks.data.length === 0) {
                this.nextPage();
            }
            // window.onscroll = () => {
            //     this.bottom = this.isBottom();
            // }
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
            },
            // isBottom() {
            //     this.scroll.scrollPosition = window.scrollY;
            //     this.scroll.scrollHeight = document.documentElement.scrollHeight;
            //     this.scroll.screenHeight = document.documentElement.clientHeight;
            //     return this.scroll.scrollPosition + this.scroll.screenHeight >= this.scroll.scrollHeight;
            //     // return  this.scroll.scrollHeight - (this.scroll.scrollPosition + this.scroll.screenHeight) <= this.scroll.screenHeight;
            // }
        },
        // watch: {
        //     bottom(bottom) {
        //         if(bottom && this.audioTracks.data.length < this.audioTracks.count) {
        //             this.nextPage();
        //         }
        //     }
        // }
    }
</script>