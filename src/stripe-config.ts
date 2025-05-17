export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
}

export const products: StripeProduct[] = [
  {
    id: 'prod_SGxAtW3iYXO0zs',
    priceId: 'price_1RMPGDIxirYV9nFaFGltNFbH',
    name: 'Win a R1.1 Million Dream Home',
    description: 'First prize winner! Choose your dream home at any location valued at R1.1 million. This is your chance to own your perfect home in your preferred area.',
    mode: 'payment'
  },
  {
    id: 'prod_SGxBgPvOK7JzXR',
    priceId: 'price_1RMPHYIxirYV9nFaP9PrsLe0',
    name: 'Win a R600,000 Home Build',
    description: 'Second prize winner! We will build your dream home valued at R600,000. Perfect opportunity to get your ideal home built to your specifications.',
    mode: 'payment'
  },
  {
    id: 'prod_SGxCvV1wVMGZ0a',
    priceId: 'price_1RMPIKIxirYV9nFaI4PRrN6d',
    name: 'Win R350,000 Building Materials',
    description: 'Third prize winner! Get complete building materials for your dream home valued at R350,000. Everything you need to start building your future.',
    mode: 'payment'
  }
];