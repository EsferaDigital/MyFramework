;

const phone = document.getElementById('headPhone');
const phoneSpan = document.getElementById('phoneSpan');

phone.addEventListener('click', () => {
  mailSpan.classList.replace('zoom-in', 'zoom-out');
  if(phoneSpan.className == 'zoom-in'){
    phoneSpan.classList.replace('zoom-in', 'zoom-out');
  }else if(phoneSpan.className == 'zoom-out'){
  phoneSpan.classList.replace('zoom-out', 'zoom-in');
  }else{
    phoneSpan.classList.add('zoom-in');
  }
});

const mail = document.getElementById('headMail');
const mailSpan = document.getElementById('mailSpan');

mail.addEventListener('click', () => {
  phoneSpan.classList.replace('zoom-in', 'zoom-out');
  if(mailSpan.className == 'zoom-in'){
    mailSpan.classList.replace('zoom-in', 'zoom-out');
  }else if(mailSpan.className == 'zoom-out'){
    mailSpan.classList.replace('zoom-out', 'zoom-in');
  }else{
    mailSpan.classList.add('zoom-in');
  }
});
