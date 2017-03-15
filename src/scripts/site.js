import TweenLite from 'gsap/TweenLite';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { scrollItems } from './data';

scrollItems.forEach(function (item) {
    document.querySelector(item.trigger).addEventListener('click', function () {
        event.preventDefault();
        TweenLite.to(window, 0.7, { scrollTo: item.target, ease: Power2.easeOut });
    })
});