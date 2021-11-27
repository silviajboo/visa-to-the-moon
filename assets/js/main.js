import '../scss/styles.scss';
import touchable from './utilities/touchable';

const isTouchable = touchable();
document.documentElement.classList.add(isTouchable ? 'touch' : 'non-touch');


