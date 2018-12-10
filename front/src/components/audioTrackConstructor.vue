<template>
    <div>
        <h3>Audio track constructor</h3>
        <h4 v-for="error in errors">
            {{error}}
        </h4>
        <form>
            <label>Track name</label>
            <input v-model.trim="track.name"/>
            <label>Author</label>
            <input v-model.trim="track.author"/>
            <label>Image title</label>
            <input type="file" @change="setImageTitle($event)"/>
            <label>Audio Track</label>
            <input type="file" @change="setAudioTrack($event)"/>
            <button @click.prevent="addTrack()">Save track</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'audioTrackConstructor',
        data() {
            return {
                track: {
                    name: '',
                    author: '',
                    imageTitle: null,
                    audioTrack: null
                },
                errors: []
            }
        },
        methods: {
            setImageTitle(e) {
                this.track.imageTitle = e.target.files[0];
            },
            setAudioTrack(e) {
                this.track.audioTrack = e.target.files[0];
            },
            addTrack() {
                this.errors = [];
                if (!this.track.name) {
                    this.errors.push('Name is required');
                }
                if (!this.track.author) {
                    this.errors.push('Author is required');
                }
                if (!this.track.audioTrack) {
                    this.errors.push('Audio file is required');
                }
                if (this.errors.length > 0) {
                    return;
                }

                const newTrack =  new FormData;
                newTrack.append('name', this.track.name);
                newTrack.append('author', this.track.author);
                newTrack.append('author', this.track.author);
                newTrack.append('audio', this.track.audioTrack);
                if (this.track.imageTitle) {
                    newTrack.append('titleImage', this.track.imageTitle);
                }
                this.$store.dispatch('addAudioTrack', newTrack);
            }
        }
    }
</script>