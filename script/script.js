class HeaderBar extends HTMLElement {
  connectedCallback() {
    // *********************************************
    // ALL ABOUT LANGUAGES AND TRANSLATIONS IS BELOW
    // *********************************************
    
      // Languages names and their related languages subfolders names have to be the same (except for the main one (first one in lgs)
      // const lgs = ['default_lg', 'sub_lg1'] 

      const lgs = ['fr', 'en'];

      // The position of each element in the pages array affects their displaying order inside the navigation menu
      // const pages = [
      //   ['page_attribute_value', 
      //      ['page_filename_fr.html', 'nav_page_name_fr'], ['page_filename_en.html', nav_page_name_en']
      // ]

      const pages = [
        ['home',
          ['index.html', 'Accueil'], ['index.html', 'Home page']
        ],
        ['about',
          ['a-propos.html', 'À propos'], ['who-am-i.html', 'Who am I?']
        ],
        ['recruitment',
          ['recrutement.html', 'Recrutement'], ['page3_en.html', 'Page 3 EN']
        ],
        ['consulting',
          ['conseil-et-mission-integree.html', 'Conseil & Mission intégrée'], ['page4_en.html', 'Page 4 EN']
        ],
        ['clients',
          ['nos-clients.html', 'Nos clients'], ['page5_en.html', 'Page 5 EN']
        ],
        ['terms',
          ['', ''], ['contact.html', 'Contact us']
        ]
      ];

    // *********************************************
    // ALL ABOUT LANGUAGES AND TRANSLATIONS IS ABOVE
    // *********************************************

    const lg = this.setLg(lgs);
    const page = this.getAttribute('page');

    // set header and nav structures
    const header = this.setStructure();
    const nav = this.setNav();

    // generate nav menu
    const menu = this.generateMenu(lg, page, lgs, pages);

    // set lg toggle links
    const lgToggleLinks = this.setLgToggle(lg, page, lgs, pages);

    // add menu to nav to header & lgToggle to header to body
    nav.appendChild(menu);

    // uncomment for lg toggle
    // header.querySelector("#header .right-items .lg-toggle").appendChild(lgToggleLinks);

    header.querySelector("#header").appendChild(nav);
    document.body.prepend(header);

    const menuToggles = document.querySelectorAll(".menu-toggle");

    menuToggles.forEach( e => {
      e.addEventListener('click', e => {
        if (e.target.tagName !== 'A') {
          this.menuToggle();
        }
      });
    });
  }

  setLg(lgs) {
    let lg = this.getAttribute('lg');

    // if lg is defined and exists in lgs, lg = lg else lg = default language = the first language in lgs
    if (lg && lgs.indexOf(lg) !== -1) {
      return lg;
    } else {
      return lgs[0];
    }
  }

  setStructure() {
    // create html elements
    const header = document.createElement('header');
    const headerM = document.createElement('div');
    const headerDiv = document.createElement('div');
    const leftItems = document.createElement('div')
    const brand = document.createElement('div');
    const rightItems = document.createElement('div');

    // uncomment for lg toggle
    // const lgToggle = document.createElement('div');

    const burger = document.createElement('div');

    // set ids and class
    // header.setAttribute('class', 'bg-grey bg-img');
    header.setAttribute('class', 'bg-grey');
    headerM.setAttribute('id', 'header-m');
    headerDiv.setAttribute('id', 'header');
    leftItems.setAttribute('class', 'left-items');
    brand.setAttribute('id', 'brand');
    rightItems.setAttribute('class', 'right-items');

    // uncomment for lg toggle
    // lgToggle.setAttribute('class', 'lg-toggle');

    burger.setAttribute('id', 'burger');
    burger.setAttribute('aria-label', 'open and close menu');
    burger.setAttribute('class', 'menu-toggle');

    // add content and images
    headerM.innerHTML = `
    <svg width="324" height="82" viewBox="0 0 643 163" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M581.104 0H642.68V163H506.543L581.104 0Z" fill="#FBFBFB"/>
      <path d="M31.9319 0H106.72L179.584 163H0L31.9319 0Z" fill="#FBFBFB"/>
    </svg>`;


    // TO DO : add image path for EN
    brand.innerHTML = 
    `<a href="index.html" aria-label="back home">
      <svg width="120" height="42" viewBox="0 0 300 106" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="GM Executive search logo">
        <path d="M40.6156 63.183H58.5665C58.0822 68.2441 55.6931 72.596 51.4313 76.2387C47.1696 79.8492 42.359 81.6544 37.0319 81.6544C30.7361 81.6544 24.9247 79.2367 19.5329 74.4335C13.7861 69.2435 10.9126 62.6673 10.9126 54.6404C10.9126 46.8715 13.4955 40.4243 18.6612 35.2665C23.8269 30.0119 30.2195 27.4008 37.839 27.4008C46.3302 27.4008 53.5299 31.3336 59.4382 39.167L67.1868 31.7527C62.6668 26.5949 58.0822 22.8877 53.4331 20.5667C48.5579 18.278 43.2953 17.1174 37.6776 17.1174C27.1847 17.1174 18.3061 20.7601 11.0095 28.0455C3.6483 35.3309 0 44.1959 0 54.6082C0 64.8271 3.58373 73.5631 10.7835 80.8807C17.9509 88.1339 26.6035 91.7766 36.6767 91.7766C47.0082 91.7766 55.4994 88.005 62.1825 80.4939C65.1205 77.1413 67.2191 73.5309 68.4783 69.6948C69.7374 65.5363 70.3831 60.7653 70.3831 55.3496V52.9642H40.6156V63.183ZM177.12 69.0178L152.389 13.1202L137.215 90.4227H148.45L156.199 46.9682L176.894 93.7108L198.203 47.0004L205.144 90.3904H216.283L202.723 13.1202L177.12 69.0178ZM298.095 53.7056C296.836 52.4484 295.286 51.8036 293.511 51.8036C291.735 51.8036 290.217 52.4484 288.926 53.7056C287.667 54.995 287.021 56.4779 287.021 58.2187C287.021 60.0884 287.635 61.6357 288.894 62.8607C290.153 64.1179 291.67 64.7304 293.511 64.7304C295.319 64.7304 296.836 64.1179 298.095 62.8607C299.354 61.6035 300 60.0561 300 58.2509C300 56.5101 299.354 54.9628 298.095 53.7056ZM103.638 105.155H105.865V0H103.638V105.155ZM249.214 105.155H251.442V0H249.214V105.155Z" fill="#252377"/>
      </svg>
    </a>`;

    burger.innerHTML = 
    `<svg width="34" height="22" viewBox="0 0 68 44" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="open and close menu">
      <g id="burger-icon" stroke="#252377" stroke-width="4">
        <line x1="67.8359" y1="41.2734" x2="-1.07328e-07" y2="41.2734"/>
        <line x1="67.8359" y1="21.6367" x2="-1.3638e-07" y2="21.6367"/>
        <line x1="67.8359" y1="2" x2="-1.3638e-07" y2="1.99999"/>
      </g>
      <g id="close-icon" fill="#252377" class="hidden">
        <rect x="25" y="40" width="56.2185" height="4.29476" transform="rotate(-45 25 40)"/>
        <rect x="65" y="43" width="56.2185" height="4.29476" transform="rotate(-135 65 43)"/>
      </g>
    </svg>`;

    // build structure
    header.appendChild(headerM);
    header.appendChild(headerDiv);
    headerDiv.appendChild(leftItems);
    leftItems.appendChild(brand);
    headerDiv.appendChild(rightItems);
    rightItems.appendChild(burger);

    // uncomment for lg toggle
    // rightItems.appendChild(lgToggle);

    return header;
  }

  setNav() {
    // create html elements
    const nav = document.createElement('nav');

    // set ids and class
    // nav.setAttribute('class', 'menu-toggle hidden');
    nav.setAttribute('class', 'hidden');


    const navWrapper = document.createElement('div');
    navWrapper.setAttribute('id', 'nav-wrapper');
    navWrapper.setAttribute('class', 'menu-toggle');
    nav.appendChild(navWrapper);

    return nav;
  }

  generateMenu(lg, page, lgs, pages) {
    // let path = this.setPath(lg, lgs);

    const navList = document.createElement('ul');
    navList.setAttribute('class', 'menu-toggle');

    pages.forEach( e => {
      const navElmt = document.createElement('li');
      const navLink = document.createElement('a');
      
      // navLink.setAttribute('href', `${path}${e[lgs.indexOf(lg) + 1][0]}`);
      navLink.setAttribute('href', e[lgs.indexOf(lg) + 1][0]);
      
      if (page === e[0]) {
        navLink.setAttribute('class', 'active'); 
      }

      navLink.textContent = e[lgs.indexOf(lg) + 1][1];
      navList.appendChild(navElmt).appendChild(navLink);
    });

    return navList;
  }

  setLgToggle(lg, page, lgs, pages) {
    const lgToggleElmt = document.createElement('div');
    let lgToggleLink;

    lgs.forEach( e => {
      if (e === lg) {
        lgToggleLink = document.createElement('span');
      } else {
        let path = this.setPath(e, lg, lgs);

        lgToggleLink = document.createElement('a');
        lgToggleLink.setAttribute('href', `${path}${pages.filter( e => e[0] === page )[0][lgs.indexOf(e) + 1][0]}`);
      }
      
      lgToggleLink.textContent = e.toUpperCase();
      lgToggleElmt.appendChild(lgToggleLink);

      if (lgs.length > 1 && (lgs.indexOf(e) < lgs.length - 1) ) {
        let lgToggleSep = document.createElement('span');
        lgToggleSep.textContent = ' | ';
        lgToggleElmt.appendChild(lgToggleSep);
      }
    });

    return lgToggleElmt;
  }

  setPath(e, lg, lgs) {
    if (lgs.indexOf(lg) === 0) {
      return `./${e}/`;
    } else if (lgs.indexOf(e) === 0) {
      return `../`;
    } else {
      return `../${e}/`;
    }
  }

  menuToggle() {
    const html = document.querySelector("html");
    const body = document.querySelector("body");
    const nav = document.querySelector("nav");

    const burgerIcon = document.querySelector("#burger-icon");
    const closeIcon = document.querySelector("#close-icon");

    // check for optims
    html.classList.toggle("overflow-y-hidden");
    body.classList.toggle("overflow-y-hidden");
    nav.classList.toggle("hidden");
    burgerIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
  }
}

customElements.define('header-bar', HeaderBar);

const header = document.querySelector('header');
const headerM = document.querySelector('#header-m');

function onWindowScroll(event) {
  var headerHeight = document.querySelector('header').offsetHeight;
  var whiteBgStart = document.querySelector('.white-bg-start').offsetTop;
  var whiteBgEnd = document.querySelector('.white-bg-end').offsetTop;

  // TO DO : manage class with toggles
  if (window.pageYOffset > whiteBgStart - headerHeight) {
    header.classList.add('bg-white');
    headerM.classList.add('hidden');
    header.classList.remove('bg-grey');

    if (window.pageYOffset > whiteBgEnd - headerHeight) {
      header.classList.add('bg-grey');
      header.classList.remove('bg-white');
    }
  }
  else {
    header.classList.add('bg-grey');
    headerM.classList.remove('hidden');
    header.classList.remove('bg-white');
  }
}

window.addEventListener('scroll', onWindowScroll)

function displayJobs(e, list) {
  document.querySelector(`#${list}`).classList.toggle('short-list');
  e.querySelector('#dots').classList.toggle('hidden');
  e.querySelector('#arrow').classList.toggle('hidden');
}