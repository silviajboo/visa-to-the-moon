import '../scss/styles.scss';
import slider from './components/slider';
import DOMEvents from './utilities/DOMEvents';
import touchable from './utilities/touchable';

const isTouchable = touchable();
document.documentElement.classList.add(isTouchable ? 'touch' : 'non-touch');

DOMEvents.onDocumentReady(() => {
    slider.init();
});
