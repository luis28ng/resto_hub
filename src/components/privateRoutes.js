import { Outlet, Navigate } from 'react-router-dom'
import React from "react";
import { getUserRole, getUserId } from '../utils/utils';

const ManagerRoute = () => {
    const userId = getUserId();
    const roleId = getUserRole();
    return (
        userId && (roleId === 'RESTAURANT_MANAGER') ? <Outlet /> : <Navigate to='/login' />
    )
}

const StaffRoute = () => {
    const userId = getUserId();
    const roleId = getUserRole()
    return (
        userId && (roleId === 'RESTAURANT_STAFF') ? <Outlet /> : <Navigate to='/login' />
    )
}

const WaiterRoute = () => {
    const userId = getUserId();
    const roleId = getUserRole()
    return (
        userId && (roleId === 'RESTAURANT_WAITER') ? <Outlet /> : <Navigate to='/login' />
    )
}

export { ManagerRoute, StaffRoute, WaiterRoute }


