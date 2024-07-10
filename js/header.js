function generateHeader(opcion) {
  if(opcion === 1){
    const header = document.getElementById('header');
    
    const logoImg = document.createElement('img');
    logoImg.src = '../img/logoYyGC.svg';
    logoImg.alt = 'Logo de Gym'; 
    logoImg.classList.add('logo');

    const menuHamburguesa = document.createElement('button');
    menuHamburguesa.innerText = '☰';
    menuHamburguesa.classList.add('menuHamburguesa');

    const nav = document.createElement('nav');
    nav.classList.add('menu');

    const ul = document.createElement('ul');
    const items = [['Sobre nosotros', '#prueba'], ['Planes', '#divsub'], ['Contáctanos', '#contacto-section'], ['Tienda', '#']];

    items.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('menu-item');
      const a = document.createElement('a');
      a.href = item[1];
      a.innerText = item[0];
      li.appendChild(a);
      ul.appendChild(li);
    });

    const loginItem = document.createElement('li');
    loginItem.classList.add('menu-item', 'login-button');

    const loginButton = document.createElement('button');
    loginButton.classList.add('boton1');
    loginButton.innerText = 'Ingresar';

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
    
    let usuarioJSON = localStorage.getItem('usuario');
    let usuario = JSON.parse(usuarioJSON);

    const logoImg = document.createElement('img');
    logoImg.src = '../img/logoYyGC.svg';
    logoImg.alt = 'Logo de Gym'; 
    logoImg.classList.add('logo');

    const menuHamburguesa = document.createElement('button');
    menuHamburguesa.innerText = '☰';
    menuHamburguesa.classList.add('menuHamburguesa');

    const nav = document.createElement('nav');
    nav.classList.add('menu');

    const ul = document.createElement('ul');
    const items = [['Sobre nosotros', '#prueba'], ['Planes', '#divsub'], ['Contáctanos', '#contacto-section'], ['Ejercicios', '../html/ejercicios.html'], ['Tienda', '../html/tienda.html']];

    items.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('menu-item');
      const a = document.createElement('a');
      a.href = item[1];
      a.innerText = item[0];
      li.appendChild(a);
      ul.appendChild(li);
    });

    const logoutLink = document.createElement('a');
    logoutLink.innerText = 'Cerrar Sesión';
    logoutLink.href = "#";
    logoutLink.classList.add('logout-link');

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

    logoutLink.addEventListener('mouseover', () => {
      path.style.fill = '#FAFF00'; 
    });

    logoutLink.addEventListener('mouseout', () => {
      path.style.fill = 'white'; 
    });
  
    const profileItem = document.createElement('li');
    profileItem.classList.add('menu-item', 'profile-item');

    const profileImg = document.createElement('img');
    profileImg.alt = 'Foto de Perfil';
    profileImg.classList.add('profile-img');

    profileImg.src = usuario && usuario.image ? usuario.image : '../img/account_circle.png';

    profileItem.appendChild(profileImg);

    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown-content');

    let options;
    if (usuario && usuario.role === 'ADMIN') {
      options = [
        { text: 'Mi Perfil', href: '../html/userEdit.html' },
        { text: 'Panel de Administración', href: '../html/admin.html' }
      ];  
    } else {
      options = [
        { text: 'Mi Perfil', href: '../html/userEdit.html' }
      ]; 
    }

    options.forEach(option => {
      const a = document.createElement('a');
      a.href = option.href;
      a.innerText = option.text;
      dropdown.appendChild(a);
    });

    dropdown.appendChild(logoutLink);

    profileItem.appendChild(dropdown);
    ul.appendChild(profileItem);

    profileImg.addEventListener('click', () => {
      dropdown.classList.toggle('show');
    });

    document.addEventListener('click', (event) => {
      if (!profileItem.contains(event.target)) {
        dropdown.classList.remove('show');
      }
    });

    nav.appendChild(ul);

    header.appendChild(logoImg);
    header.appendChild(menuHamburguesa);
    header.appendChild(nav);

    menuHamburguesa.addEventListener('click', () => {
      nav.classList.toggle('is-active');
    });

    logoutLink.addEventListener('click', () => {
      localStorage.removeItem('usuario');
      localStorage.setItem('logueado', false); 
      window.location.href = '../index.html'; 
    });
  }
  if(opcion === 3){
    const header = document.getElementById('header');
    
    let usuarioJSON = localStorage.getItem('usuario');
    let usuario = JSON.parse(usuarioJSON);

    const logoImg = document.createElement('img');
    logoImg.src = '../img/logoYyGC.svg';
    logoImg.alt = 'Logo de Gym'; 
    logoImg.classList.add('logo');

    const menuHamburguesa = document.createElement('button');
    menuHamburguesa.innerText = '☰';
    menuHamburguesa.classList.add('menuHamburguesa');

    const nav = document.createElement('nav');
    nav.classList.add('menu');

    const ul = document.createElement('ul');
    const items = [['Inicio', '../index.html'], ['Ejercicios', '../html/ejercicios.html'], ['Tienda', '../html/tienda.html']];

    items.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('menu-item');
      const a = document.createElement('a');
      a.href = item[1];
      a.innerText = item[0];
      li.appendChild(a);
      ul.appendChild(li);
    });

    const logoutLink = document.createElement('a');
    logoutLink.innerText = 'Cerrar Sesión';
    logoutLink.href = "#"; 
    logoutLink.classList.add('logout-link');

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

    logoutLink.addEventListener('mouseover', () => {
      path.style.fill = '#FAFF00'; 
    });

    logoutLink.addEventListener('mouseout', () => {
      path.style.fill = 'white'; 
    });
  
    const profileItem = document.createElement('li');
    profileItem.classList.add('menu-item', 'profile-item');

    const profileImg = document.createElement('img');
    profileImg.alt = 'Foto de Perfil';
    profileImg.classList.add('profile-img');

    profileImg.src = usuario && usuario.image ? usuario.image : '../img/account_circle.png';

    profileItem.appendChild(profileImg);

    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown-content');

    let options;
    if (usuario && usuario.role === 'ADMIN') {
      options = [
        { text: 'Mi Perfil', href: '../html/userEdit.html' },
        { text: 'Panel de Administración', href: '../html/admin.html' }
      ];  
    } else {
      options = [
        { text: 'Mi Perfil', href: '../html/userEdit.html' }
      ]; 
    }
    
    options.forEach(option => {
      const a = document.createElement('a');
      a.href = option.href;
      a.innerText = option.text;
      dropdown.appendChild(a);
    });

    dropdown.appendChild(logoutLink);

    profileItem.appendChild(dropdown);
    ul.appendChild(profileItem);

    profileImg.addEventListener('click', () => {
      dropdown.classList.toggle('show');
    });

    document.addEventListener('click', (event) => {
      if (!profileItem.contains(event.target)) {
        dropdown.classList.remove('show');
      }
    });

    nav.appendChild(ul);

    header.appendChild(logoImg);
    header.appendChild(menuHamburguesa);
    header.appendChild(nav);

    menuHamburguesa.addEventListener('click', () => {
    nav.classList.toggle('is-active');
    });

    logoutLink.addEventListener('click', () => {
      localStorage.removeItem('usuario');
      localStorage.setItem('logueado', false); 
      window.location.href = '../index.html'; 
    });
  }
}

function updateHeaderImage(user) {
  // Aquí seleccionas el elemento img del header
  const profileImg = document.querySelector('.profile-img'); // Puedes usar una clase para seleccionar el elemento

  if (profileImg) {
    // Verifica que el usuario tenga una imagen definida
    if (user && user.image) {
      profileImg.src = user.image; // Actualiza el src de la imagen con la nueva URL
    } else {
      profileImg.src = '../img/account_circle.png'; // O utiliza una imagen por defecto si no hay imagen definida
    }
  } else {
    console.error('No se pudo encontrar el elemento .profile-img en el header.');
  }
}

