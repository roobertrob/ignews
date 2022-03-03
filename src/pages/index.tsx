import Head from 'next/head'
import { SubscribeButton } from '../components/subcribeButton'
import styles from './home.module.scss'
import { GetServerSideProps, GetStaticProps } from 'next'
import { stripe } from '../services/stripe'

interface HomeProps{
  product:{
    priceId: string;
    amount: number;
  }
}
export default function Home({product}:HomeProps) {
  return (

    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>Get access to all the publications <br />
            <span>for {product.amount}/mo</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>

        </section>
        <img src="images/avatar.svg" alt="girl" />
      </main>
    </>
  )

}
export const getStaticProps: GetStaticProps = async () => {

  const price = await stripe.prices.retrieve('price_1KVc4sC6V0jJZ9mL3ZXl6j3H');

  const product = {  
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100),
  };

  return {
    props:{
      product,
    },
    revalidate:60*60*24, //24hours 
  }

}