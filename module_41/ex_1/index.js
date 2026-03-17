const iconButtonElement = document.getElementById('toggle-icon-button');
const icon01Element = document.getElementById('icon-01');
const icon02Element = document.getElementById('icon-02');

let isIcon1 = true;

iconButtonElement.addEventListener('click', function () {
  isIcon1 = !isIcon1;
  icon01Element.classList.toggle('icon-button__icon_visible', isIcon1);
  icon02Element.classList.toggle('icon-button__icon_visible', !isIcon1);
});

