export const COLORS = {
  light: {
    background: '#F4F6FA',
    card: '#FFFFFF',
    text: '#1A2332',
    muted: '#6B7C8D',
    primary: '#1A365D',
    accent: '#0E7C7B',
    danger: '#C41E3A',
    border: '#D7DEE8',
    input: '#FFFFFF',
    chip: '#E8EEF5',
    header: '#FFFFFF',
    tab: '#FFFFFF',
  },
  dark: {
    background: '#121820',
    card: '#1C2430',
    text: '#F3F6FA',
    muted: '#9AA8B5',
    primary: '#7EB6FF',
    accent: '#4ECDC4',
    danger: '#FF6B7A',
    border: '#2C3848',
    input: '#161D27',
    chip: '#243041',
    header: '#1C2430',
    tab: '#1C2430',
  },
};

export function getColors(scheme) {
  return COLORS[scheme === 'dark' ? 'dark' : 'light'];
}
