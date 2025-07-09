'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, clearUser } from '@/features/user/userSlice';
import type { RootState, AppDispatch } from '@/store/store';

function UserPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, data } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(fetchUser(1));

        return () => {
            dispatch(clearUser());
        };
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">User Profile</h1>
            {data && (
                <div>
                    <p><strong>Name:</strong> {data.name}</p>
                    <p><strong>Email:</strong> {data.email}</p>
                </div>
            )}
        </div>
    );
}

export default UserPage
