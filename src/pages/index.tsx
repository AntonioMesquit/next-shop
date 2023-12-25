import { HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";

import camisa1 from '../assets/camisetas/1.png'
import camisa2 from '../assets/camisetas/2.png'
import camisa3 from '../assets/camisetas/3.png'

export default function Home() {
  return (
   <HomeContainer>
    <Product>
      <Image src={ camisa1 } width={520} height={480}/>
    </Product>

   </HomeContainer>
  )
}
