import { stripe } from "@/lib/stripe";
import { ImageContainer, SucessContainer } from "@/styles/pages/sucess";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
interface SucessProps { 
  name : string,
  product : {
    name: string,
    imageUrl:string,

  }
}
export default function Sucess({name, product} : SucessProps) {
    return (
     <SucessContainer>
      <h1>Compra efetuada!</h1>

      <ImageContainer>
        <Image src={product.imageUrl} width={120} height={110}  alt=""/>
      </ImageContainer>
      <p>
        Uhuul <strong>{name}</strong>, sua <strong>{product.name}</strong> ja esta a caminho da sua casa.
      </p>
     <Link href="/">
     Voltar ao catalogo
     </Link>
     </SucessContainer>
    )
  }
  
  export const getServerSideProps: GetServerSideProps = async ({query, params}) =>{
    
    if(!query.session_id){
      return{
       redirect: {
        destination: '/',
        permanent: false,
       }
      }
    }
const sessionId = String(query.session_id);

const session = await stripe.checkout.sessions.retrieve(sessionId, {
  expand:['line_items' , 'line_items.data.price.product']
})
const name = session.customer_details?.name
const product = session.line_items.data[0].price.product as Stripe.Product


return {
  props: {
    name : name,
    product : {
      name: product.name,
      imageUrl: product.images[0],

    }
  }
}


  }