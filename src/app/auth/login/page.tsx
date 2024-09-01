// import Image from "next/image";
import Navbar from '@/components/Layout/Navbar/Navbar';
import LoginForm from './Login';

export default function Page() {

    // Create a single supabase client for interacting with your database
    // const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_SECRET as string)
    return (
      <main className='h-full flex justify-center items-center'>
        <LoginForm />
      </main>
    );
  }
  