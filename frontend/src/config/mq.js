import Vue from "vue"
import VueMq from "vue-mq"


Vue.use(VueMq, {
    breackpoints: {
        xs: 576,
        ms: 768,
        md: 960,
        lg: 1140,
        xl: Infinity
    }
})