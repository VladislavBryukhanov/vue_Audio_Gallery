import VueRouter from 'vue-router';
import sign from "../components/sign";
import publicNavbar from "../components/navbars/publicNavbar";
import privateNavbar from "../components/navbars/privateNavbar";
import profile from "../components/profile";
import home from "../components/home";

const routes = [
    {
        path: '/',
        component: publicNavbar,
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

export default router;
