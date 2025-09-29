const onPreventClick = (event, cb, { isAllow }) => {
  let element = event.target;

  while (element) {
    const preventClasses = ['--no-click', 'MuiButton-root', 'MuiButtonBase-root', 'MuiTypography-root'];

    if (element.classList && preventClasses.some(cls => element.classList.contains(cls))) {
      event.preventDefault();

      return;
    }

    element = element.parentElement;
  }

  if (isAllow) cb();
};

export default onPreventClick;
