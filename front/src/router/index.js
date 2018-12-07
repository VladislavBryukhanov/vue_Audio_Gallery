import VueRouter from 'vue-router';
import sign from "../components/sign";
import publicNavbar from "../components/navbars/publicNavbar";
import privateNavbar from "../components/navbars/privateNavbar";
import profile from "../components/profile";
import home from "../components/home";
import store from '../store';
import editProfile from '../components/edit-profile';

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
                redirect: 'home'
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
                path: 'home',
                name: 'home',
                component: home
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
        console.log(store.state);
    }

    if (to.matched.some(record => record.meta.unauthorized)) {
        if(store.state.profile) {
            next({
                path: '/main'
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
