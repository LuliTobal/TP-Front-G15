function generateFooter() {
  const footer = document.getElementById('footer');

  const contactInfo = document.createElement('div');
  contactInfo.classList.add('footer-section', 'contact-info');
  contactInfo.innerHTML = `
    <p>CONTACTO</p>
    <p>123 456789</p>
    <p>Nombre de la calle xxx, ciudad, provincia</p>
    <p>nombreGym@ejemplo.com</p>
  `;

  const rightsInfo = document.createElement('div');
  rightsInfo.classList.add('footer-section', 'rights-info');
  rightsInfo.textContent = 'Todos los derechos reservados 2024 ©';

  const socialMedia = document.createElement('div');
  socialMedia.classList.add('footer-section', 'social-media');
  
  const facebookLink = document.createElement('a');
  facebookLink.href = '#';
  const facebookIcon = document.createElement('img');
  facebookIcon.src = 'img/facebook.svg'; 
  facebookIcon.alt = 'Facebook';
  facebookIcon.classList.add('social-icon');
  facebookLink.appendChild(facebookIcon);
  socialMedia.appendChild(facebookLink);

  const twitterLink = document.createElement('a');
  twitterLink.href = '#';
  const twitterIcon = document.createElement('img');
  twitterIcon.src = 'img/twitter.svg'; 
  twitterIcon.alt = 'Twitter';
  twitterIcon.classList.add('social-icon');
  twitterLink.appendChild(twitterIcon);
  socialMedia.appendChild(twitterLink);

  const instagramLink = document.createElement('a');
  instagramLink.href = '#';
  const instagramIcon = document.createElement('img');
  instagramIcon.src = 'img/instagram.svg'; 
  instagramIcon.alt = 'Instagram';
  instagramIcon.classList.add('social-icon');
  instagramLink.appendChild(instagramIcon);
  socialMedia.appendChild(instagramLink);

  const linkedInLink = document.createElement('a');
  linkedInLink.href = '#';
  const linkedInIcon = document.createElement('img');
  linkedInIcon.src = 'img/linkedin.svg'; 
  linkedInIcon.alt = 'LinkedIn';
  linkedInIcon.classList.add('social-icon');
  linkedInLink.appendChild(linkedInIcon);
  socialMedia.appendChild(linkedInLink);

  footer.appendChild(contactInfo);
  footer.appendChild(rightsInfo);
  footer.appendChild(socialMedia);
}


