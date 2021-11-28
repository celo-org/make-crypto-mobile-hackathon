(async function () {
  if (typeof localStorage === undefined) {
    return;
  }

  const settingsKey = 'plock/settings';
  const settings = JSON.parse(localStorage.getItem(settingsKey) || '{}');
  if (settings.darkMode === true) {
    document.documentElement.classList.add('dark');
    return;
  }

  if (settings.darkMode === false) {
    document.documentElement.classList.remove('dark');
    return;
  }

  const preference = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (preference) {
    document.documentElement.classList.add('dark');
    localStorage.setItem(
      settingsKey,
      JSON.stringify({
        ...settings,
        darkMode: true,
      })
    );
  }
})();
