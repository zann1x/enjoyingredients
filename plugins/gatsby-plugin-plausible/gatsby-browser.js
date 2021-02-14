exports.onRouteUpdate = () => {
    if (process.env.NODE_ENV === 'development') {
        return null;
    }

    if (typeof window.plausible !== 'object') {
        return null;
    }

    window.plausible('page was viewed');
};
