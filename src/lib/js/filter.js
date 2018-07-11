/**
 * Author: movooc
 */
import Vue from 'vue';


export const StrFilter = function() {
    Vue.filter('lastPathName', (data) => {
        return data.split('/').pop();
    })
};
