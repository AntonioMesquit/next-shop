import { HomeContainer, Product } from "@/styles/pages/home";
import {useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Image from "next/image";
import { stripe } from "@/lib/stripe";
import { GetServerSideProps, GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";

interface HomeProps {
  products: {
    id: string,
    name: string,
    imageUrl: string,
    price: string,
  }[]
}
export default function Home({products} : HomeProps) {

  
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
   <HomeContainer ref={sliderRef} className="keen-slider">
   
   {products.map(products => {
        return (
          <Link key={products.id} href={`/product/${products.id}`}>
            <Product className="keen-slider__slide">
              <Image src={products.imageUrl} width={520} height={480} alt="Camisa 1" />

              <footer>
                <strong>{products.name}</strong>
                <span>{products.price}</span>
              </footer>
            </Product>
          </Link>
        )
      })}
    
    

   </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })
   const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR' , {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
      description: product.description

      
    }
   })
  return{
    props: {
      products,
    },
    revalidate: 60*60*2 , // 2 horas
  }
}