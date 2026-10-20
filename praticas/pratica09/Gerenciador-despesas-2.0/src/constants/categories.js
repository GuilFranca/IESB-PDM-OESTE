export const CATEGORIES = [
  { id: 'alimentacao', label: 'Alimentacao' },
  { id: 'transporte', label: 'Transporte' },
  { id: 'estudos', label: 'Estudos' },
  { id: 'lazer', label: 'Lazer' },
  { id: 'moradia', label: 'Moradia' },
  { id: 'outros', label: 'Outros' },
];

export function getCategoryLabel(id) {
  return CATEGORIES.find((item) => item.id === id)?.label ?? id;
}
