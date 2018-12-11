<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: 'audioList',
        data() {
            return {
                scroll: {
                    scrollPosition: 0,
                    scrollHeight: 0,
                    screenHeight: 0,
                },
                bottom: false
            }
        },
        mounted() {
            window.onscroll = () => {
                this.bottom = this.isBottom();
            }
        },
        methods: {
            isBottom() {
                this.scroll.scrollPosition = window.scrollY;
                this.scroll.scrollHeight = document.documentElement.scrollHeight;
                this.scroll.screenHeight = document.documentElement.clientHeight;
                return this.scroll.scrollPosition + this.scroll.screenHeight >= this.scroll.scrollHeight;
                // return  this.scroll.scrollHeight - (this.scroll.scrollPosition + this.scroll.screenHeight) <= this.scroll.screenHeight;
            }
        },
        watch: {
            bottom(bottom) {
                if(bottom && this.audioTracks.data.length < this.audioTracks.count) {
                    this.nextPage();
                }
            }
        }
    }
</script>