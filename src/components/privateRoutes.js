import { Outlet, Navigate } from 'react-router-dom'
import React from "react";
import { getUserRole, getUserId } from '../utils/utils';

const ManagerRoute = () => {
    const userId = getUserId();
    const userRole = getUserRole();
    return (
        userId && (userRole === 'RESTAURANT_MANAGER') ? <Outlet /> : <Navigate to='/login' />
    )
}

const StaffRoute = () => {
    const userId = getUserId();
    const userRole = getUserRole()
    return (
        userId && (userRole === "RESTAURANT_STAFF" || userRole === 'RESTAURANT_MANAGER') ? <Outlet /> : <Navigate to='/login' />
    )
}

const WaiterRoute = () => {
    const userId = getUserId();
    const userRole = getUserRole()
    return (
        userId && (userRole === 'RESTAURANT_WAITER' || userRole === 'RESTAURANT_MANAGER') ? <Outlet /> : <Navigate to='/login' />
    )
}

export { ManagerRoute, StaffRoute, WaiterRoute }

