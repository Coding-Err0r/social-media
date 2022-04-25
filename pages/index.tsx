import type { NextPage } from 'next'
import {useSession , UserButton ,useUser} from '@clerk/nextjs'
import Navbar from '../components/pageComponents/navbar'

const Home: NextPage = () => {
  const session = useSession();
  const { user }:any = useUser();
  console.log(user);

  return (
    <div>
      <Navbar/>
    </div>
    
  )
}

export default Home
