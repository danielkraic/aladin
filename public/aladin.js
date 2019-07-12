function get_image(meteogram_type, city_id, date, time) {
    return {
        src: `http://www.shmu.sk/data/datanwp/v2/${meteogram_type}_${city_id}-${date}-${time}-nwp-.png`
    };
}

function get_images_for_day(city_id, meteogram_type, date) {
    return ['1800', '1200', '0600', '0000'].map(function (time) {
        return get_image(meteogram_type, city_id, date, time);
    });
}

function get_images(city_id, meteogram_type) {
    var d = new Date();
    var today = "" + d.getFullYear() + ("0" + (d.getMonth() + 1)).slice(-2) + ("0" + d.getDate()).slice(-2);

    d.setDate(d.getDate() - 1);
    var yesterday = "" + d.getFullYear() + ("0" + (d.getMonth() + 1)).slice(-2) + ("0" + d.getDate()).slice(-2);

    images_today = get_images_for_day(city_id, meteogram_type, today);
    images_yesterday = get_images_for_day(city_id, meteogram_type, yesterday);

    return images_today.concat(images_yesterday);
}

new Vue({
    el: '#app',
    data: {
        selected_type: 'meteogram/al-meteogram',
        selected_city: '31360',
        available_cities: [
            { id: '32737', name: 'Bratislava' },
            { id: '31360', name: 'Trnava' },
            { id: '31438', name: 'Cadca' },
            { id: '32477', name: 'Zemberovce' }
        ]
    },
    computed: {
        imgs: function () {
            return get_images(this.selected_city, this.selected_type);
        }
    }
});
