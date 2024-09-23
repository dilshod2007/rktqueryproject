import { Table, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useUserQuery } from '../../../redux/api/usersApi';
import { useDeleteUserMutation } from "../../../redux/api/usersApi";
import { usePromoteUserMutation } from "../../../redux/api/usersApi";


const Users = () => {
  const [userData, setUserData] = useState([]);
  const { data: users } = useUserQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [promoteuser]=usePromoteUserMutation()

 
const handleDelete = (id) => {
  deleteUser(id); 
  notification.success({
    message: 'User Deleted Successfully',
  });
  setUserData(userData.filter((user) => user.id !== id));

}
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Image',
      dataIndex: 'photo_url',
      key: 'photo_url',
      render: (url) => (
        <img
          width={50}
          height={50}
          src={url ? url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"}
          alt="User"
        />
      ),
    },
    {
      title: 'Action',
      render: (user) => (
        <div className="flex gap-4">
          <button onClick={() => promoteuser({username:user.username})} className="text-white bg-blue-500 p-2 rounded-lg" type="button">
            Promote
          </button>
          <button
            className="text-white bg-red-500 p-2 rounded-lg"
            onClick={() => handleDelete(user._id)}
            type="button"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (users?.payload) {
      setUserData(users.payload);
    }
  }, [users]);

  return (
    <div className="ml-[200px]"> 
      <Table columns={columns} dataSource={userData} rowKey="_id" />
    </div>
  );
};

export default Users;
