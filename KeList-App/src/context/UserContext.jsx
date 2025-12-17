import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import * as listApi from '../api/listApi';
import * as userApi from '../api/userApi';

const UserContext = createContext(null);
export const useUserContext = () => useContext(UserContext);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [lists, setLists] = useState([]);
    const navigate = useNavigate();
    
    async function signUp(user) {
        const res = await userApi.createUser(user);
        console.log(res.user)
    }

    async function logIn(User) {
        try {
            const data = await userApi.loginUser(User);
            setUser({ 
                id: data.id, 
                name: data.name, 
                email: data.email, 
                phone_num: data.phone_num 
            });
            localStorage.setItem('token', data.tk);
            navigate('/home');
            console.log(data);
            console.log(user)
        } catch (err) {
            console.error(err.message);
        }
    }

    async function loadLists() {
        if (!user) return;
        const data = await listApi.fetchLists();
        setLists(data);
    }   

    async function addList(userId, newList) {
        try {
            const res = await listApi.createList(userId, newList);
            console.log(res);
            loadLists();
        } catch (err) {
            console.error(err.message);
        }
    }

    async function addItemToList(listId, rawEntry) {
        const res = await listApi.addItem(listId, rawEntry);

        setLists(prev =>
            prev.map(list =>
            list.id === listId
                ? { ...list, items: [...list.items, res.item] }
                : list
            )
        );
    }

    async function removeItemFromList(listId, itemId) {
        await listApi.removeItem(listId, itemId);

        setLists(prev =>
            prev.map(list =>
            list.id === listId
                ? {
                    ...list,
                    items: list.items.filter(i => i.id !== itemId),
                }
                : list
            )
        );
    }

    const value = {
        user,
        signUp,
        logIn,
        lists,
        addList,
        loadLists,
        addItemToList,
        removeItemFromList,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
