import $ from 'jquery';

export default class PostService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    getAll() {
        let url = this.baseUrl + '/posts';

        return new Promise((resolve, reject) => {
            $.ajax({
                method: 'GET',
                url: url,
                dataType: 'json'
            }).done(resolve).fail(reject);
        });
    }

    getById(id) {
        let url = this.baseUrl + '/posts/' + id;

        return new Promise((resolve, reject) => {
            $.ajax({
                method: 'GET',
                url: url,
                dataType: 'json'
            }).done(resolve).fail(reject);
        });
    }
}