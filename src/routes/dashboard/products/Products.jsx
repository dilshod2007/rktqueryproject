import React, { useState, useEffect } from 'react';
import { useGetProductsQuery } from "../../../redux/api/productsApi";
import { Table, Button, Space, message } from 'antd';
import { useDeleteUserMutation } from "../../../redux/api/usersApi";
import { Link } from 'react-router-dom';

const Products = () => {
  const { data: products } = useGetProductsQuery();
  const [productData, setProductData] = useState([]);
  const [deleteProduct] = useDeleteUserMutation();

  useEffect(() => {
    if (products?.payload) {
      setProductData(products.payload);
    }
  }, [products]);

  const handleDelete = (id) => {
    deleteProduct(id);
    message.success('Product deleted successfully');
    setProductData(productData.filter((product) => product._id !== id));
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'product_images',
      key: 'product_images',
      render: (images) => (
        <img
          width={70}
          height={70}
          src={images[1] || "https://via.placeholder.com/70"}
          alt="Product"
          className="rounded-lg shadow-md"
        />
      ),
    },
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      key: 'product_name',
      render: (name) => <span className="font-semibold">{name}</span>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (desc) => (
        <span className="text-gray-600">{desc.length > 50 ? `${desc.substring(0, 50)}...` : desc}</span>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'sale_price',
      key: 'sale_price',
      render: (price) => <span className="text-green-500 font-bold">${price}</span>,
    },
    {
      title: 'Actions',
      render: (product) => (
        <Space size="middle">
          <Link to="/dashboard/create">
            <Button type="primary" className="bg-blue-500 hover:bg-blue-600">
              Create
            </Button>
          </Link>
          <Button
            type="danger"
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={() => handleDelete(product._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
<div className='p-4 bg-gray-200 h-screen w-full'>
<div className="p-6 bg-white rounded-lg shadow-md ml-[100px] mt-[100px]">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <Table
        columns={columns}
        dataSource={productData}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        className="rounded-lg overflow-hidden"
      />
    </div>
</div>
  </>
  );
};

export default Products;
