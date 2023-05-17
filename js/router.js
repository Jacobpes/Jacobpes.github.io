const urlRoutes = {
    '/': {
        template: "<dashboard-page></dashboard-page>"
    },
    '/login': {
        template: "<login-page></login-page>"
    },
};

// urlRoute is called when the url changes
const urlRoute = (path) => {
    urlLocationHolder()
};

// urlLocationHolder is called when the url changes
const urlLocationHolder = async () => {
    var location = window.location.pathname;

    var jwt = localStorage.getItem('jwt');

    if (jwt == null && location == '/') {
        location = '/login';
    };

    const route = urlRoutes[location];
    const htmml = route.template;
    document.getElementById('main').innerHTML = htmml;
};

window.route = urlRoute;
urlLocationHolder();