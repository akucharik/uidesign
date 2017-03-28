import TweenLite       from 'gsap/TweenLite';
import ScrollToPlugin  from 'gsap/ScrollToPlugin';
import { scrollItems } from './data';
import { initialize as initAnalytics } from './googleAnalytics';

document.getElementById('copyrightYear').textContent = new Date().getFullYear();

scrollItems.forEach((item) => {
    document.querySelector(item.trigger).addEventListener('click', () => {
        event.preventDefault();
        TweenLite.to(window, 0.7, { scrollTo: item.target, ease: Power2.easeOut });
    })
});

initAnalytics(window, 'UA-96370360-1');