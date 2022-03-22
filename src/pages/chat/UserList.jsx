import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersService, startChatService } from "../../services/chat.services"

function UserList() {
  const [users, setUsers] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await getUsersService()
      setUsers(response.data);
    } catch (err) {
      navigate("/error");
    }
  };

  const handleClick = async (user) => {
    console.log(`Trying to start a chat with ${user.name}`)
    //todo Here we will try to go to chat or create one if it doesn't exist
    try {
      const response = await startChatService(user._id)
      navigate(`/chat/${response.data._id}`);
    } catch(err) {
      navigate("/error");
    }
  }

  if (!users) {
    return <h3>...Loading</h3>
  }

  return (
    <div>
      <h1>Users</h1>
      <hr />

      {users.map((eachUser) => {
          return (
            <div key={eachUser._id}>
              <p><b>Name:</b> {eachUser.name}</p>
              <button onClick={() => handleClick(eachUser)}>Chat with {eachUser.name}</button>
              <hr />
            </div>
          );
        })
      }
    </div>
  );
}

export default UserList;
