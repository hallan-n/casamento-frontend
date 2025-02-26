import React from 'react';
import Header from '../components/Header';
import InvitationList from '../components/InvitationList';

export default function AdminPanel() {
    return (
        <div>
            <Header />
            <InvitationList />
            <div className='h-screen w-full '>

            </div>
        </div>
    );
}