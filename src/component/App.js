import AddUser from "./AddUser";
import Users from "./Users";
import { useState, useEffect } from "react";
export default function App() {
    const [users, setUsers] = useState([]);

    const [userToEdit, setUsersToEdit] = useState(null);

    const [editing, setEditing] = useState(false);

    const getUsers = JSON.parse(localStorage.getItem('userdata'));
    useEffect(() => {
        if (!getUsers) setUsers([]);
        else setUsers(getUsers);
    }, []);

    const addUser = (user) => {
        user.id = users.length + 1;
        setUsers([...users, user]);
        localStorage.setItem('userData', JSON.stringify([...users, user]))
    };

    const deleteUser = (id) => {
        const filteredUsers = users.filter((user) => user.id !== id);
        setUsers(filteredUsers);
        localStorage.setItem('userData', JSON.stringify(filteredUsers));
    }

    const toggleEditButton = () => {
        setEditing(!editing);
    }

    const editUser = (user) => {
        setEditing(true);
        setUsersToEdit(user)
    }

    const updateUser = (updatedUser) => {
        const filteredUsers = users.map((user) => {
            if (user.id === userToEdit.id) {
                updatedUser.id = userToEdit.id;
                return updatedUser;
            } else {
                return user;
            }
        })
        setUsers(filteredUsers);
        localStorage.setItem('userData', JSON.stringify(filteredUsers));
    }

    return (
        <div className="w-96 mx-auto">
            <h1 className="text-center text-3xl mt-2">Crud using Hooks</h1>
            <AddUser
                addUser={addUser}
                editing={editing}
                toggleEditButton={toggleEditButton}
                userToEdit={userToEdit}
                updateUser={updateUser}
            />
            <Users
                users={users}
                deleteUser={deleteUser}
                editUser={editUser}
                toggleEditButton={toggleEditButton}
            />
        </div>
    )
}