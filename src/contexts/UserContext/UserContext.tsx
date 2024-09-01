'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    
    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createClient();
            const resp = await supabase.auth.getUser();

            if (resp.data.user) {
                setUser(resp.data.user);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    const router = useRouter()
    
    const signOut = async () => {
        const { error } = await createClient().auth.signOut()
        if(error){
            toast.error('Sign out error')
            return
        }

        context?.setUser(null)
        router.replace('/auth/login')
    }

    const signIn = async ({
        email = '',
        password = ''
    }) => {
        if(!email || !password){
            toast.error('Sign in error')
            return
        }

        const { data, error } = await createClient().auth.signInWithPassword({ email, password })
        if(error){
            toast.error('Sign in error')
            return
        }

        context?.setUser(data.user)
        router.replace('/')
    }

    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    
    return {
        ...context,
        signIn,
        signOut
    };
};
