import React, { useState, useEffect, useRef } from "react"


export default function AddUser(props) {
    const initialFormState = { name: '', username: ''};
    const [user, setUser] = useState(initialFormState);

    const handleChange = (event) => {
        let {name, value} = event.target;
        setUser({ ...user, [name] : value})
    }

    const prevPropsRef = useRef();
    useEffect(() => {
        prevPropsRef.current = props;
    })

    const prevProps = prevPropsRef.current;

    useEffect(() => {
        if(props.userToEdit && prevProps.userToEdit !== props.userToEdit) {
            let {name, username} = props.userToEdit;
            setUser({name, username})
        }
    }, [prevProps, props.userToEdit])

    const onSubmit = (event) => {
        event.preventDefault();
        if(!user.name || !user.username) return;
        if(!props.editing) {
            props.addUser(user);
        } else {
            props.toggleEditButton();
            props.updateUser(user);
        }
        setUser(initialFormState);
    }

  

    return(
        <form 
        onSubmit={onSubmit}
        >
            <input
            className="w-full border border-black p-1 mt-2"
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            value={user.username}
            />
            <input
            className="w-full border border-black p-1 mt-2"
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleChange}
            value={user.name}
            />
            <input 
            className="border border-black px-4 mt-2 mr-2"
            type="submit"
            value={props.editing ? 'Update' : 'Add'}
            />
                            
            {props.editing ? (
                <input 
                type='reset'
                value='Cancel'
                className="border border-black px-4 mt-2"
                onClick={() => {
                    props.toggleEditButton();
                    setUser(initialFormState)
                }}
                />
            ) : (
                ''
            )}
        </form>
    )

}