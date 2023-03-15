import React from "react";

export default function Users(props) {
  const handleEdit = (user) => {
    props.editUser(user);
  }
  return(
    <div>
      <h2 className="text-center mt-6 text-xl mt-4 mb-2">List of Users</h2>
      <table className="w-full text-center">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.users.length > 0 ? (
            props.users.map((user) => (
              <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>
                    <button 
                    className="border px-1 mr-2"
                    onClick={() => {
                      handleEdit(user);
                    }}
                    >
                      Edit
                    </button>
                    <button 
                    className="border px-1 mr-2"
                    onClick={() => {
                      props.deleteUser(user.id)
                    }}
                    >
                      Delete
                    </button>
                  </td>
              </tr>
            ))
          ) : (
                        <tr>
                        <td colSpan="3">No User Available!</td>
                      </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}