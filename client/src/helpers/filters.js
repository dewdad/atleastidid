import Vue from 'vue'
Vue.filter('dateCreated', (dateStr) => {
    let d = new Date(dateStr);
    let date = d.toLocaleDateString();
    let time = d.toLocaleTimeString();
    return `${date} | ${time}`;
})
