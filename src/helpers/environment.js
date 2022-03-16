let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:4000';
        break;

        case 'git.heroku.com/allenbra17-w4d-client.git':
            APIURL = 'https://allenbra17-w4d-client.herokuapp.com/'
}

export default APIURL