// Set the routes for the different pages
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

    // Go to login page if not logged in
    var jwt = localStorage.getItem('jwt');
    if (jwt == null && location == '/') {
        location = '/login';
    };
    const route = urlRoutes[location];
    const html = route.template;

    // View the right element according to the location
    document.getElementById('main').innerHTML = html;
};
// Call the urlLocationHolder function when the page loads to make sure the right element is shown
window.route = urlRoute;
urlLocationHolder();