import serverRequest from "../utilities/serverRequest";

function slider() {
    function init() {
        getData();
    }

    const getData = () => {
        const objData = {
            url: 'http://localhost:8080/data/slider.json',
            method: serverRequest.METHODS.get,
            fn: data => loadDataToSlider(data),
            responseType: 'json'
        }

        return serverRequest.asyncServerRequest(objData);
    }

    const loadDataToSlider = (data) => {
        if (data) {
            const sliderComponent = document.querySelector('.js-slider');

            for(let i = 0; i < data.dataImages.length; i++) {
                const newSliderComponent = sliderComponent.cloneNode(true);
                setNewSlider(newSliderComponent, data.dataImages[i], i);
                setListeners(newSliderComponent, i);
            }

            sliderComponent.remove();
            document.querySelector('.js-slider').classList.toggle('u-hide--s768');
        }
    }

    function setNewSlider (sliderComponent, data, id) {
        sliderComponent.dataset.id = id;
        sliderComponent.querySelector('.js-logo').src = data.logo;
        sliderComponent.querySelector('.js-icon').src = data.iconTrip;
        const urlImage = `url(${data.imageRocket})`;
        sliderComponent.querySelector('.js-image').style.backgroundImage = urlImage;
        sliderComponent.querySelector('.js-title').innerText = data.title;
        sliderComponent.querySelector('.js-subtitle').innerText = data.subtitle;
        sliderComponent.querySelector('.js-hash').innerText = data.hash;
        sliderComponent.querySelector('.js-prev').innerText = data.linkprev;
        sliderComponent.querySelector('.js-next').innerText = data.linknext;

        document.querySelector('.js-container').appendChild(sliderComponent);
    }

    function setListeners(slideItem, idSlide) {
        const prevButton = slideItem.querySelector('.js-prev');
        if (prevButton) {
            prevButton.addEventListener('click', () => loadSlide(slideItem, idSlide - 1), false);
        }

        const nextButton = slideItem.querySelector('.js-next');
        if (nextButton) {
            nextButton.addEventListener('click', () => loadSlide(slideItem, idSlide + 1), false);
        }

        const startYourTripButton = slideItem.querySelector('.js-start-yout-trip');
        if (startYourTripButton) {
            startYourTripButton.addEventListener('click', 
                () => { 
                    window.open('http://www.google.com/search?q=trip+to+the+moon','_blank')
                },
                false);
        }
    }

    function loadSlide(currentSlide, idSlide) {
        let slideToLoad;
        const sliderLength = document.querySelectorAll('.js-slider').length;

        if (idSlide > sliderLength - 1) {
            slideToLoad = document.querySelector(`.js-slider[data-id="0"]`);
        }
        else if(idSlide < 0) {
            slideToLoad = document.querySelector(`.js-slider[data-id="${sliderLength - 1}"]`);
        }
        else {
            slideToLoad = document.querySelector(`.js-slider[data-id="${idSlide}"]`);
        }

        currentSlide.classList.toggle('u-hide--s768');
        slideToLoad.classList.toggle('u-hide--s768');
    }

    return {
        init
    }
}

export default slider();