export const stringToSlug = (str: string): string => {
  str = str.replace(/^\s+|\s+$/g, '');
  str = str.toLowerCase();

  const from = 'śńżźóćłęąàáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'snzzocleaaaaaeeeeiiiioooouuuunc------';
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  return str
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};
