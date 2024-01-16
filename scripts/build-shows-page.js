import BandSiteApi, { apiKey, baseUrl } from "./band-site-api.js";
const bandSiteApiShows = new BandSiteApi(apiKey);

const showsSection = document.querySelector('.shows__content');

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options).replace(/\s/g, ' ');
};

const createShowElement = (show) => {
  const info = document.createElement('div');
  info.classList.add('schedule__info');

  show.forEach((showItem, index) => {
    const showUl = document.createElement('ul');
    showUl.classList.add('schedule__show');

    const createLi = (headerText, dataText) => {
      const li = document.createElement('li');
      li.classList.add('schedule__row', `schedule__${headerText.toLowerCase()}`);

      const headerMobile = document.createElement('div');
      headerMobile.classList.add('schedule__header', 'schedule__header-mobile', `schedule__${headerText.toLowerCase()}-header-mobile`);
      headerMobile.textContent = headerText;
      
      let headerTablet;
      if(index===0){
      headerTablet = document.createElement('div');
      headerTablet.classList.add('schedule__header', 'schedule__header-tablet');
      headerTablet.textContent = headerText;
      li.appendChild(headerTablet);
      }

      const data = document.createElement('div');
      data.classList.add('schedule__data', `schedule__${headerText.toLowerCase()}-detail`);
      data.textContent = dataText;

      li.appendChild(headerMobile);
      // li.appendChild(headerTablet);
      li.appendChild(data);

      return li;
    };

    showUl.appendChild(createLi('DATE', formatTimestamp(showItem.date)));
    showUl.appendChild(createLi('VENUE', showItem.place));
    showUl.appendChild(createLi('LOCATION', showItem.location));

    const btnLi = document.createElement('li');
    btnLi.classList.add('schedule__row', 'schedule__btn', 'schedule__btn-first-row');

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.textContent = 'Buy Tickets';

    btnLi.appendChild(button);

    showUl.appendChild(btnLi);
    info.appendChild(showUl);
    showUl.addEventListener('click', () => {
      // Remove 'schedule__show-active' class from all 'ul' elements
      const allShowElements = document.querySelectorAll('.schedule__show');
      allShowElements.forEach((element) => {
        element.classList.remove('schedule__show-active');
      });

      // Add 'schedule__show-active' class to the clicked 'ul' element
      showUl.classList.add('schedule__show-active');
    });
  });

  return info;
};

const renderShows = async () => {
  try {
    const showsData = await bandSiteApiShows.getShows();

    const showContainer = document.createElement('div');
    showContainer.classList.add('schedule');

    const infoWrapper = document.createElement('div');
    infoWrapper.classList.add('schedule__info-wrapper');

    const showElement = createShowElement(showsData);
    infoWrapper.appendChild(showElement);

    showContainer.appendChild(infoWrapper);
    showsSection.appendChild(showContainer);
  } catch (error) {
    console.error('Error fetching and rendering shows:', error.message);
  }
};

renderShows();