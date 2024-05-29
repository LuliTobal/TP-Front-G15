function generateHeader(opcion) {
  if(opcion === 1){
    const header = document.getElementById('header');
    
    const logoImg = document.createElement('img');
    logoImg.src = 'img/fitness.png';
    logoImg.alt = 'Logo de Gym'; 
    logoImg.classList.add('logo');

    const menuHamburguesa = document.createElement('button');
    menuHamburguesa.innerText = '☰';
    menuHamburguesa.classList.add('menuHamburguesa');

    const nav = document.createElement('nav');
    nav.classList.add('menu');

    const ul = document.createElement('ul');
    const items = ['Sobre nosotros', 'Planes', 'Tienda'];

    items.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('menu-item');
      const a = document.createElement('a');
      a.href = "#";
      a.innerText = item;
      li.appendChild(a);
      ul.appendChild(li);
    });

    const loginItem = document.createElement('li');
    loginItem.classList.add('menu-item', 'login-button');

    const loginButton = document.createElement('button');
    loginButton.classList.add('boton1');
    loginButton.innerText = 'Ingresar/Registrarse';

    loginItem.appendChild(loginButton);
    ul.appendChild(loginItem);

    nav.appendChild(ul);

    header.appendChild(logoImg);
    header.appendChild(menuHamburguesa);
    header.appendChild(nav);

    menuHamburguesa.addEventListener('click', () => {
      nav.classList.toggle('is-active');
    });
  }
  if(opcion === 2){
    const header = document.getElementById('header');
    
    const logoImg = document.createElement('img');
    logoImg.src = 'img/fitness.png';
    logoImg.alt = 'Logo de Gym'; 
    logoImg.classList.add('logo');

    const menuHamburguesa = document.createElement('button');
    menuHamburguesa.innerText = '☰';
    menuHamburguesa.classList.add('menuHamburguesa');

    const nav = document.createElement('nav');
    nav.classList.add('menu');

    const ul = document.createElement('ul');
    const items = ['Sobre nosotros', 'Planes', 'Tienda'];

    items.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('menu-item');
      const a = document.createElement('a');
      a.href = "#";
      a.innerText = item;
      li.appendChild(a);
      ul.appendChild(li);
    });

    const loginItem = document.createElement('li');
    loginItem.classList.add('menu-item', 'login-button');

    const loginButton = document.createElement('button');
    loginButton.classList.add('boton2');
    loginButton.innerText = 'Ingresar/Registrarse';

    loginItem.appendChild(loginButton);
    ul.appendChild(loginItem);

    nav.appendChild(ul);

    header.appendChild(logoImg);
    header.appendChild(menuHamburguesa);
    header.appendChild(nav);

    menuHamburguesa.addEventListener('click', () => {
      nav.classList.toggle('is-active');
    });
  }
  if(opcion === 3){
    const header = document.getElementById('header');
    
    const logoImg = document.createElement('img');
    logoImg.src = 'img/logoYyGC.svg';
    logoImg.alt = 'Logo de Gym'; 
    logoImg.classList.add('logo');

    const menuHamburguesa = document.createElement('button');
    menuHamburguesa.innerText = '☰';
    menuHamburguesa.classList.add('menuHamburguesa');

    const nav = document.createElement('nav');
    nav.classList.add('menu');

    const ul = document.createElement('ul');
    const items = ['Plan', 'Clases disponibles', 'Ejercicios', 'Tienda'];

    items.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('menu-item');
      const a = document.createElement('a');
      a.href = "#";
      a.innerText = item;
      li.appendChild(a);
      ul.appendChild(li);
    });

    const logoutItem = document.createElement('li');
    logoutItem.classList.add('menu-item', 'logout-icon');

    const logoutLink = document.createElement('a');
    logoutLink.href = "#"; 

    const logoutIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); // Crear elemento SVG
    logoutIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    logoutIcon.setAttribute('width', '24');
    logoutIcon.setAttribute('height', '24');
    logoutIcon.setAttribute('viewBox', '0 0 24 24');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M3,5 C3,3.9000001 3.9000001,3 5,3 C5,3 7.66666667,3 13,3 L13,5 L5,5 L5,19 L13,19 L13,21 C7.66666667,21 5,21 5,21 C3.9000001,21 3,20.1000004 3,19 C3,9.6236114 3,5 3,5 Z M17.1757866,11 L14.6402527,8.46446609 L16.0544662,7.05025253 L21.0042137,12 L16.0544662,16.9497475 L14.6402527,15.5355339 L17.1757866,13 L10.5900002,13 L10.5900002,11 L17.1757866,11 Z');
    path.setAttribute('fill', 'white');
    logoutIcon.appendChild(path);

    logoutLink.appendChild(logoutIcon);
    logoutItem.appendChild(logoutLink);
    ul.appendChild(logoutItem);
    nav.appendChild(ul);

    header.appendChild(logoImg);
    header.appendChild(menuHamburguesa);
    header.appendChild(nav);

    menuHamburguesa.addEventListener('click', () => {
    nav.classList.toggle('is-active');
  });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const logoutItem = document.querySelector('.logout-icon');
  if (logoutItem) {
    logoutItem.addEventListener('mouseover', () => {
      const logoutIcon = logoutItem.querySelector('svg path');
      logoutIcon.style.fill = '#FAFF00'; 
    });

    logoutItem.addEventListener('mouseout', () => {
      const logoutIcon = logoutItem.querySelector('svg path');
      logoutIcon.style.fill = 'white'; 
    });
  }
});

