import prisma from '@/libs/db';
import type { Metadata } from 'next';
import Edit from '../Edit';

export const metadata: Metadata = {
  title: 'Register | Auth',
  description: 'Register | Auth'
}

interface Params {
  params: { id: string };
}

export default async function UserPage({ params: { id } }: Params) {
  // return (
  //   <section className="h-[calc(100vh-7rem)] flex flex-col items-center justify-center">
  //     <UserForm />
  //   </section>
  // );
  try {
    const user = await prisma.user.findUnique({
      where:{
          id: id
      }
  })

  if(!user){
      return <div>Id Usuario no encontrado</div>
  }

  return(
      <div>
          <Edit {...user} />
      </div>
  )
  } catch (error) {
    console.log("Error", error);
    return <div>Error fetching product</div>
  }
}