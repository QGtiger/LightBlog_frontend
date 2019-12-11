import CommentsItem from './packages/comment-item/index.js';

import LBComments from './main';

const components = [
    CommentsItem,
    LBComments
]

const install = function(Vue) {
    components.map(component => {
        Vue.component(component.name, component)
    })
}

if(typeof window !== 'undefined' && window.Vue){
    console.log(window.Vue)
    install(window.Vue)
}

export default {
    version: '1.0.1',
    name: 'LBComments',
    install,
    CommentsItem,
    LBComments
}