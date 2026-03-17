const sizesButtonElement = document.getElementById('sizes-button');

sizesButtonElement.addEventListener('click', function () {
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  alert(
    'Экран (screen): ' +
      screenWidth +
      ' x ' +
      screenHeight +
      '\n' +
      'Окно браузера (viewport): ' +
      viewportWidth +
      ' x ' +
      viewportHeight
  );
});

