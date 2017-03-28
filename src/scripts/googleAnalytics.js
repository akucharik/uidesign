import { Location } from './utils';

/**
* Initializes Google Analytics.
*
* @param {Object} window - The window object.
* @param {string} id - The tracking ID.
*/
export const initialize = (window, id) => {
    let useAnalytics = true;
    const params = Location.parseURLQueryString(window.location.search);

    params.forEach((item) => {
        if (item.key === 'analytics' && item.value === 'false') {
            useAnalytics = false;
        }
    });

    if (Location.isLocalhost(window.location.hostname)) {
        useAnalytics = false;
    }
    
    window.params = params;
    window.useAnalytics = useAnalytics;
    
    if (useAnalytics) {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', id, 'auto');
        ga('send', 'pageview');
    }
}