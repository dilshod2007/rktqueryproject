import React, { useState, useEffect } from 'react';
import { useGetProductsQuery } from "../../../redux/api/productsApi";
import { Table, Button, Space, message } from 'antd';
import { useDeleteUserMutation} from "../../../redux/api/usersApi"
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
          width={50}
          height={50}
          src={images[1]}
          alt="Product"
        />
      ),
    },
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'sale_price',
      key: 'sale_price',
      render: (price) => `$${price}`,
    },
    {
      title: 'Actions',
      render: (user) => (
        <Space size="middle">
         <Link to="/dashboard/create"> 
         <Button type="primary" >
            Create
          </Button>
         </Link>
          <Button type="danger" className='bg-red-500 text-white' onClick={() => handleDelete(user._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="ml-[10px] mt-[100px]">
      <Table columns={columns} dataSource={productData} rowKey="_id" />
    </div>
  );
};

export default Products;
