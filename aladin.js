function get_aladin_url(city_id, date, time) {
    return 'http://www.shmu.sk/data/datanwp/v2/meteogram/al-meteogram_' + city_id + '-' + date + '-' + time + '-nwp-.png';
}

function get_last_aladins(city_id) {
    var d = new Date()
    var today_str = "" +  d.getFullYear() + ("0"+(d.getMonth()+1)).slice(-2) + ("0" + d.getDate()).slice(-2);

    d.setDate(d.getDate() - 1)
    var yesterday_str = "" +  d.getFullYear() + ("0"+(d.getMonth()+1)).slice(-2) + ("0" + d.getDate()).slice(-2);
    
    return [
        {src: get_aladin_url(city_id, today_str, '1800')},
        {src: get_aladin_url(city_id, today_str, '1200')},
        {src: get_aladin_url(city_id, today_str, '0600')},
        {src: get_aladin_url(city_id, today_str, '0000')},

        {src: get_aladin_url(city_id, yesterday_str, '1800')},
        {src: get_aladin_url(city_id, yesterday_str, '1200')},
        {src: get_aladin_url(city_id, yesterday_str, '0600')},
        {src: get_aladin_url(city_id, yesterday_str, '0000')}
    ]
}

new Vue({
    el: '#app',
    data: {
        selected_city: '32737',
        aladin_img_srcs: [],
        options: [
            { text: 'Bratislava', value: '32737' },
            { text: 'Trnava', value: '31360' },
            { text: 'Cadca', value: '31438' }
        ]
    },
    created: function() {
        this.update_aladin()
    },
    methods: {  
        update_aladin: function() {
            this.aladin_img_srcs =  get_last_aladins(this.selected_city)
            console.log('srcs: ', this.aladin_img_srcs)
        }
    }
})