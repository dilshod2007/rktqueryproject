import { Table, notification, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useUserQuery, useDeleteUserMutation, usePromoteUserMutation } from '../../../redux/api/usersApi';

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: users, isFetching } = useUserQuery();
  const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();
  const [promoteUser, { isLoading: promoting }] = usePromoteUserMutation();

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      notification.success({
        message: 'User Deleted Successfully',
      });
      setUserData(userData.filter((user) => user._id !== id));
    } catch (error) {
      notification.error({
        message: 'Failed to Delete User',
        description: error.message,
      });
    }
  };

  const handlePromote = async (username) => {
    try {
      await promoteUser({ username }).unwrap();
      notification.success({
        message: 'User Promoted Successfully',
      });
    } catch (error) {
      notification.error({
        message: 'Failed to Promote User',
        description: error.message,
      });
    }
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <span className="font-semibold ">{text}</span>,
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
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
          className="rounded-full border border-gray-300"
        />
      ),
    },
    {
      title: 'Action',
      render: (user) => (
        <div className="flex gap-4 items-center ">
          <button
            onClick={() => handlePromote(user.username)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 "
            type="button"
            disabled={promoting}
          >
            {promoting ? 'Promoting...' : 'Promote'}
          </button>
          <button
            onClick={() => handleDelete(user._id)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            type="button"
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (users?.payload) {
      setUserData(users.payload);
    }
    setLoading(isFetching);
  }, [users, isFetching]);

  if (loading) {
    return <Spin size="large" className="flex justify-center items-center h-screen" />;
  }

  return (
    <div className='p-4 bg-gray-200 w-full h-screen  '>
      <div className="p-6 bg-white rounded-lg shadow-md ml-[100px] mt-[100px]">
        <Table
          columns={columns}
          dataSource={userData}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          className="rounded-lg overflow-hidden   " 
        />
      </div>
    </div>
  );
};

export default Users;
