var common = {

    index: function(req, res) {
        req.session.redirect = '/';

        var userObj = null;

        if (req.isAuthenticated()) {
            userObj = {
                name: req.user.name,
                avatar: req.user.avatar
            };
        }

        res.render('index', {
            activeClass: 'home',
            data: {
                resource: ''
            },
            user: userObj
        });
    }

};

module.exports = common;
