'use client'
// src/components/Layout/Navbar/Navbar.tsx
import { useUser } from '@/contexts/UserContext/UserContext';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
    const { user, signOut } = useUser();
    const pathname = usePathname()

    const renderUser = () => {
        if(!user){
            return <></>
        }

        return (
            <div>
                <span className='pr-3'>{user.email}</span>
                <button onClick={signOut}>Sign Out</button>
            </div>
        )
    }

    if(pathname.startsWith('/auth/login')){
        return <></>
    }

    return (
        <div className="mb-7">
            <div className="w-full max-w-screen-md mx-auto py-8 flex justify-between">
                <div>Navbar</div>
                {renderUser()}
            </div>
        </div>
    );
};

export default Navbar;
