import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='w-screen h-[70vh] flex flex-col gap-4 justify-center items-center'>
      <h1 className='text-4xl'>404, Not Found!</h1>
      <p className='text-3xl'>Could not find requested page</p>
      <Link href="/" className='text-3xl text-blue-400 hover:text-blue-500'>Return Home</Link>
    </div>
  )
}