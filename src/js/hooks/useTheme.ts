import { reactive } from "vue";

const themes = reactive<string[]>([]);

function switchTheme(_theme: string) {
  if (themes.includes(_theme)) {
    document.documentElement.setAttribute("data-theme", _theme);
  } else {
    console.warn(`Theme ${_theme} not found in global config`);
  }
}

export function useTheme(_themes?: string[]) {
  if (
    _themes &&
    Array.isArray(_themes) &&
    _themes.length > 0 &&
    themes.length == 0
  ) {
    themes.splice(0, themes.length, ..._themes);
  }

  return { themes: themes, switchTheme };
}
