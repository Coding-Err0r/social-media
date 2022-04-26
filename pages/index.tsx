import type { NextPage } from 'next'
import {useSession , UserButton ,useUser} from '@clerk/nextjs'
import Layout from '../components/layout';


const Home: NextPage = () => {
  const session = useSession();
  const { user }:any = useUser();
  // console.log(user);

  return (
    <Layout/>
    
  )
}

export default Home
