import VueRouter from 'vue-router';
import sign from "../components/sign";
import publicNavbar from "../components/navbars/publicNavbar";
import privateNavbar from "../components/navbars/privateNavbar";
import profile from "../components/profile";
import store from '../store';
import editProfile from '../components/editProfile';
import audioList from '../components/audioList';
import audioTrackConstructor from "../components/audioTrackConstructor";

const routes = [
    {
        path: '/',
        component: publicNavbar,
        meta: {
            unauthorized: true
        },
        children: [
            {
                path: '',
                name: 'signIn',
                component: sign
            },
            {
                path: 'signUp',
                name: 'signUp',
                component: sign,
                props: {
                    isSignUp: true
                }
            }
        ]
    },
    {
        path: '/main',
        component: privateNavbar,
        meta: {
            authorized: true
        },
        children: [
            {
                path: '',
                redirect: `profile`
            },
            {
                path: 'profile',
                name: 'profile',
                component: profile
            },
            {
                path: 'editProfile',
                name: 'editProfile',
                component: editProfile
            },
            {
                path: 'audioList/:id',
                name: 'audioList',
                component: audioList
            },
            {
                path: 'audioTrackConstructor/:id?',
                name: 'audioTrackConstructor',
                component: audioTrackConstructor
            }
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach(async (to, from, next) => {
    if(!store.state.profile && localStorage.getItem('authorization')) {
        await store.dispatch('getProfile');
    }

    if (to.matched.some(record => record.meta.unauthorized)) {
        if(store.state.profile) {
            next({
                path: `/main`
            });
        } else {
            next();
        }
    }

    if (to.matched.some(record => record.meta.authorized)) {
        if(!store.state.profile) {
            next({
                path: '/'
            });
        } else {
            next();
        }
    }
});

export default router;
