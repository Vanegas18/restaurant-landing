export type Category = 'hamburguesas' | 'perros' | 'acompanantes' | 'bebidas' | 'combos'

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'hamburguesas', label: 'Hamburguesas' },
  { id: 'combos', label: 'Combos' },
  { id: 'perros', label: 'Perros' },
  { id: 'acompanantes', label: 'Para acompañar' },
  { id: 'bebidas', label: 'Bebidas' },
]

export type PhotoKey = 'la-70-doble' | 'clasica' | 'pollo-crocante' | 'papas' | 'perro'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number // COP
  category: Category
  photo?: PhotoKey
  tag?: string
}

export const MENU: MenuItem[] = [
  {
    id: 'la-70',
    name: 'La 70 Doble',
    description: 'Doble carne de 150 g al carbón, doble cheddar, cebolla caramelizada y salsa de la casa en pan brioche.',
    price: 28900,
    category: 'hamburguesas',
    photo: 'la-70-doble',
    tag: 'La de la casa',
  },
  {
    id: 'clasica',
    name: 'Clásica al carbón',
    description: 'Carne de 150 g, queso amarillo, lechuga, tomate, cebolla morada y pepinillos.',
    price: 19900,
    category: 'hamburguesas',
    photo: 'clasica',
  },
  {
    id: 'pollo',
    name: 'Pollo crocante',
    description: 'Pechuga apanada, pepinillos, alioli de ajo asado y pan tostado con ajonjolí.',
    price: 22900,
    category: 'hamburguesas',
    photo: 'pollo-crocante',
  },
  {
    id: 'paisa',
    name: 'La Paisa',
    description: 'Carne de 150 g, chicharrón crocante, maduro, hogao y queso costeño.',
    price: 26900,
    category: 'hamburguesas',
  },
  {
    id: 'combo-70',
    name: 'Combo La 70',
    description: 'La 70 Doble + papas rústicas + gaseosa 400 ml. Ahorra $3.000 frente a pedirlos por separado.',
    price: 39900,
    category: 'combos',
  },
  {
    id: 'combo-clasica',
    name: 'Combo Clásica',
    description: 'Clásica al carbón + papas rústicas + gaseosa 400 ml. Ahorra $2.000.',
    price: 31900,
    category: 'combos',
  },
  {
    id: 'perro',
    name: 'Perro de la parrilla',
    description: 'Salchicha americana asada, tomate, jalapeño, mostaza, lechuga y pan artesanal.',
    price: 16900,
    category: 'perros',
    photo: 'perro',
  },
  {
    id: 'perro-tocineta',
    name: 'Perro con tocineta',
    description: 'El de la parrilla con tocineta, queso fundido y papita ripio.',
    price: 19900,
    category: 'perros',
  },
  {
    id: 'papas',
    name: 'Papas rústicas',
    description: 'Con cáscara, sal de la casa y salsa de ajo.',
    price: 9500,
    category: 'acompanantes',
    photo: 'papas',
  },
  {
    id: 'papas-queso',
    name: 'Papas con queso y tocineta',
    description: 'Papas rústicas bañadas en cheddar y tocineta crocante.',
    price: 14900,
    category: 'acompanantes',
  },
  {
    id: 'aros',
    name: 'Aros de cebolla',
    description: 'Apanados en cerveza, con salsa BBQ.',
    price: 10900,
    category: 'acompanantes',
  },
  { id: 'gaseosa', name: 'Gaseosa 400 ml', description: 'Cola, naranja o limón.', price: 4500, category: 'bebidas' },
  { id: 'limonada', name: 'Limonada de coco', description: 'Natural, preparada al momento.', price: 8900, category: 'bebidas' },
  { id: 'jugo', name: 'Jugo natural en agua', description: 'Mora, mango o maracuyá.', price: 6900, category: 'bebidas' },
]

export const DELIVERY_ZONES = [
  { id: 'recoger', label: 'Recojo en el local', fee: 0 },
  { id: 'laureles', label: 'Laureles', fee: 4000 },
  { id: 'estadio', label: 'Estadio', fee: 4000 },
  { id: 'conquistadores', label: 'Conquistadores', fee: 4000 },
  { id: 'floresta', label: 'La Floresta', fee: 5000 },
  { id: 'florida', label: 'Florida Nueva', fee: 5000 },
  { id: 'belen', label: 'Belén', fee: 6000 },
  { id: 'robledo', label: 'Robledo', fee: 7000 },
] as const

export const PAYMENT_METHODS = ['Efectivo', 'Transferencia', 'Datáfono al recibir'] as const

const cop = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
export const formatCOP = (n: number) => cop.format(n)
// Formato de comanda: sin símbolo, como imprime una caja registradora
export const formatTicket = (n: number) => n.toLocaleString('es-CO')
