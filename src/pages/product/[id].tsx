import { stripe } from '@/lib/stripe';
import { ImageContainer, ProductContanier, ProductDetails } from '@/styles/pages/product';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import {useRouter} from 'next/router'
import Stripe from 'stripe';

interface ProductProps { 
  product: {
    id: string,
    name: string,
    imageUrl: string,
    price: number,
    description: string,

  }
}

export default function Product({ product} : ProductProps) {
  const { isFallback} = useRouter();

  if(isFallback){
    return <p>loading...</p>
  }
    return (
     <ProductContanier>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt='' />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button>Comprar agora</button>
      </ProductDetails>
     </ProductContanier>
    )
  }
  

  export const getStaticPaths: GetStaticPaths = async () => {
    return {
      paths: [
          { params : {id : 'prod_PFbbnzQrTmnBas'}}
        ],
        fallback: 'blocking',
      }
    
  }
  
  export const getStaticProps: GetStaticProps = async({params}) => {
    const productId = String(params.id)
    const product = await stripe.products.retrieve(productId, {
      expand: ['default_price']
    })
    console.log('Product:', product);
    const price = product.default_price as Stripe.Price
    return {
      props: {
        product: {
          id: product.id,
          name: product.name,
          imageUrl: product.images[0],
          description: product.description,
          price: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(price.unit_amount / 100),
          
        },
      },
      revalidate: 60 * 60 * 1,
    }
  }