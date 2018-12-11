export default {
    install(Vue, options) {
        Vue.directive('infinite-scroll', {
            inserted(el, binding, vnode) {
                console.log(arguments);
                console.log(el);
                console.log(binding);
                // do something based on the updated value
                // this will also be called for the initial value
                binding.def.params.nextPage = binding.value;
                window.onscroll = () => {
                    binding.def.params.bottom = !binding.def.params.bottom;
                }
            },
            params: {
                scroll: {
                    scrollPosition: 0,
                    scrollHeight: 0,
                    screenHeight: 0,
                },
                bottom: false,
                nextPage: null,
                isBottom() {
                    this.scroll.scrollPosition = window.scrollY;
                    this.scroll.scrollHeight = document.documentElement.scrollHeight;
                    this.scroll.screenHeight = document.documentElement.clientHeight;
                    return this.scroll.scrollPosition + this.scroll.screenHeight >= this.scroll.scrollHeight;
                    // return  this.scroll.scrollHeight - (this.scroll.scrollPosition + this.scroll.screenHeight) <= this.scroll.screenHeight;
                }
            },
            paramWatchers: {
                bottom: (bottom) => {
                    console.log(Vue.store.state.audioTracks.data.length);
                    console.log(Vue.store.state.audioTracks.count);
                    if(bottom && Vue.store.state.audioTracks.data.length < Vue.store.state.audioTracks.count) {
                        console.log(this);
                    }
                }
            }
        })
    }
}