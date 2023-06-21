import Image from 'next/image'
import Link from 'next/link'
// import styles from './page.module.css'

export default function Home() {
  return (
    <div>   
      <Link href={'/dashboard/signup'}>Signup</Link> <br />
      <Link href={'/dashboard/login'}>Login</Link>
    </div>
  )
}
