import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../module/admin/home/views/Dashboard.vue'
import Auth from '../module/auth/views/Auth.vue'
import Login from '../module/auth/component/Login.vue'
import Register from '../module/auth/component/Register.vue'
import User from '../module/admin/users/views/User.vue'
import Section from '../module/admin/section/views/Section.vue'
import Component from '../module/admin/component/views/Component.vue'
import Meta from '../module/admin/meta/views/Meta.vue'
import PageNotFound from '../components/PageNotFound.vue'
import ClientDashboard from '../module/client/dashboard/views/Client-Dashboard.vue'
import TemplateBuild from '../module/client/template/views/Template-build.vue';
import TemplateCreate from '../module/client/template/views/Template-create.vue';
import ClientView from '../module/client/dashboard/views/Client-view.vue';
import RulesView from '../module/admin/rules/views/Rules-view.vue';
import RulesData from '../module/admin/rules/views/Rules.data.vue';
import CreateRulesView from '../module/admin/rules/views/Create.view.vue';
import DetailRules from '../module/admin/rules/views/Detail.rules.vue';
import UpdateRules from '../module/admin/rules/views/Update.rule.vue';
// import App from '../App.vue'
import store from '../store';

const routes = [
    {
        path: '/pagenotfound',
        name: 'pagenotfound',
        component: PageNotFound,
    },

    {
        path: '/',
        name: '/',
        component: Dashboard ,
        meta: { 
            requiresAuth: true,
            role: ['admin','developer'],
            redirect: '/client',
            breadCrumb: [
                {
                  text: 'Home'
                }
            ]
        },
        
    },
    {
        path: '/client',
        name: 'client',
        component: ClientView,
        meta: { 
            requiresAuth: true,
            role: ['user'],
            
            breadCrumb: [
                {
                  text: 'Home'
                }
            ]
        },
        children: [
            {
                path: '',
                name: 'home',
                component: ClientDashboard,
                meta: { 
                    breadCrumb: [
                        {
                          text: 'Home'
                        }
                    ]
                },
            },
            {
                path: 'create',
                name: 'template',
                component: TemplateCreate,
                meta: { 
                    breadCrumb: [
                        {
                          text: 'Home',
                          active: false,
                        },
                        {
                          text: 'Create Template',
                          active: true
                        }
                    ]
                },
            },
            {
                path: 'build/:id',
                name: 'build',
                component: TemplateBuild,
                meta: { 
                    breadCrumb: [
                        {
                          text: 'Home',
                          active: false,
                          to: '/client'
                        },
                        {
                          text: 'Build',
                          active: true
                        }
                    ]
                },
            },
        ]
    },
    {
        path: '/user',
        name: 'user',
        component: User,
        meta: { 
            requiresAuth: true,
            role: ['admin','developer'],
            redirect: '/client',
            breadCrumb: [
                {
                  text: 'User',
                  active: true
                }
            ]
        },
        children: {
            
        }
    },
    {
        path: '/rules',
        name: 'rules',
        component: RulesView,
        meta: { 
            requiresAuth: true,
            role: ['admin','developer'],
            redirect: '/client',
            breadCrumb: [
                {
                  text: 'Rules',
                  active: true
                }
            ]
        },
        children: [
            {
                path: '',
                name: 'rules',
                component: RulesData,
                meta: { 
                    requiresAuth: true,
                    role: ['admin','developer'],
                    breadCrumb: [
                        {
                          text: 'Rules'
                        }
                    ]
                },
            },
            {
                path: "/rules/create",
                name: 'create-rules',
                component: CreateRulesView,
                meta: { 
                    requiresAuth: true,
                    role: ['admin','developer'],
                    breadCrumb: [
                        {
                          text: 'Rules',
                          active: false,
                          to: "/rules"
                        },
                        {
                            text: 'Create-rules',
                            active: true,
                        }
                    ]
                },
            },
            {
                path: "/rules/detail/:id",
                name: 'detail-rules',
                component: DetailRules,
                meta: { 
                    requiresAuth: true,
                    role: ['admin','developer'],
                    breadCrumb: [
                        {
                          text: 'Rules',
                          active: false,
                          to: "/rules"
                        },
                        {
                            text: 'Detail-rules',
                            active: true,
                        }
                    ]
                },
            },
            {
                path: "/rules/:id",
                name: 'edit-rules',
                component: UpdateRules,
                meta: { 
                    requiresAuth: true,
                    role: ['admin','developer'],
                    breadCrumb: [
                        {
                          text: 'Rules',
                          active: false,
                          to: "/rules"
                        },
                        {
                            text: 'Edit',
                            active: true,
                        }
                    ]
                },
            },
        ]
    },
    {
        path: '/section',
        name: 'section',
        component: Section,
        meta: { 
            requiresAuth: true,
            role: ['admin','developer'],
            redirect: '/client',
            breadCrumb: [
                {
                  text: 'Section',
                  active: true
                }
            ]
        },
    },
    {
        path: '/component',
        name: 'component',
        component: Component,
        meta: { 
            requiresAuth: true,
            role: ['admin','developer'],
            redirect: '/client',
            breadCrumb: [
                {
                  text: 'Component',
                  active: true
                }
            ]
        },
    },
    {
        path: '/meta',
        name: 'meta',
        component: Meta,
        meta: { requiresAuth: true },
    },
    
    {
        path: '/auth',
        name: 'auth',
        component: Auth,
        meta: { requiresAuth: false },
        children: [
            {
                path: 'signin',
                name: 'signin',
                component: Login,
            },
            {
                path: 'signup',
                name: 'signup',
                component: Register,
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  
router.beforeEach((to, from, next) => {
    if(to.matched.some((record) => record.path)){
        if (to.matched.some((record) => record.meta.requiresAuth)) {
            
            if (store.getters.isAuthenticated == false) {
                next("auth/signin");
            }
            
        }
        
        to.matched.forEach(element => {
            if(element.meta){
                if(element.meta.role){
                    
                    if(store.state.authServices.user.rules){
                        if(element.meta.role.includes(store.state.authServices.user.rules.name) == false){
                            if(element.meta.redirect){
                                next(element.meta.redirect);
                            }
                        }
                    }

                    
                    
                }
            }
        });        

        next();
    }else{
        next("/pagenotfound");
    }
});

export default router