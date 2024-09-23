import { useGetProductsQuery } from '../../redux/api/productsApi';
import { Button, Card, Spin } from 'antd';
import { Container } from '../../utils';
import { Link } from 'react-router-dom';
import { Carousel, Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { HeartOutlined, HeartFilled } from '@ant-design/icons'; 
import { addLike, removeLike } from '../../redux/slices/likeSlice';
import { useGetLikedProductsMutation, useUnLikeProductMutation } from "../../redux/api/likedApi";
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import iphone from "../../imgs/iphone.mp4"

const { Meta } = Card;

const Products = () => {
    const { data, isLoading } = useGetProductsQuery();
    const dispatch = useDispatch();
    const likedProducts = useSelector((state) => state.like.likes); 
    const [getLikedProducts] = useGetLikedProductsMutation(); 
    const [unLikeProduct] = useUnLikeProductMutation(); 

    const handleLikeToggle = async (productId) => {
        if (likedProducts.includes(productId)) {
            await unLikeProduct(productId);
            dispatch(removeLike(productId));
            toast.info("Product unliked!");  
        } else {
            await getLikedProducts(productId);
            dispatch(addLike(productId));
            toast.success("Product liked!"); 
        }
    };

    return (
        <div>
            <ToastContainer /> 

            <div className='relative  bg-gray-800 text-white h-screen mb-16 '>
                <div className='absolute inset-0 overflow-hidden  '>
                    <video src={iphone} autoPlay muted loop className='w-full h-full object-cover'></video>
                    <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-90'></div>
                </div>
                <div className='relative flex flex-col items-center justify-center h-full text-center px-6'>
                    <h1 className='text-8xl font-extrabold mb-8 leading-tight'>
                        iPhone 14 Pro
                    </h1>
                    <p className='text-4xl mb-10 leading-relaxed max-w-5xl'>
                        Experience the future of smartphones. Designed with perfection.
                    </p>
                    <Button className='mt-6 px-12 py-6 text-2xl font-bold' type='primary' size='large'>
                        Shop Now
                    </Button>
                </div>
                <marquee className='bg-gray-900 text-white h-[100px] flex items-center p-4' direction="left" scrollamount="10">
                    <div className='flex items-center space-x-8 gap-[100px]'>
                        {data && data.payload.slice(0, 5).map((product, index) => (
                            <div key={index} className='flex items-center space-x-4'>
                                <img 
                                    src={product.product_images[0]} 
                                    alt={product.product_name} 
                                    className='h-12 w-auto object-cover' 
                                />
                                <span>🔥 {product.product_name} - ${product.sale_price} 🔥</span>
                                <img 
                                    src={product.product_images[1]} 
                                    alt={product.product_name} 
                                    className='h-12 w-auto object-cover' 
                                />
                                <span>🚚 Free Shipping on Orders Over $50! 🚚</span>
                            </div>
                        ))}
                        <span>🎉 New Arrivals Just In! Check Them Out! 🎉</span>
                    </div>
                </marquee>
            </div>

            <Container>
                <h2 className='text-3xl font-bold text-center mb-8 mt-[150px]'>Our Products</h2>
                {isLoading ? ( 
                    <div className='flex justify-center items-center h-96'>
                        <Spin size='large' />
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {
                            data && data.payload &&
                            data.payload.map(product => 
                                <Card
                                    key={product._id}
                                    hoverable
                                    className='relative transition-transform duration-300 hover:scale-105 bg-gray-900'
                                    cover={
                                        <>
                                            <Carousel autoplay arrows>
                                                {product.product_images.map((image, index) => (
                                                    <div key={index} className='flex justify-center'>
                                                        <img src={image} alt={product.product_name} className='object-cover w-full h-80 rounded-lg' />
                                                    </div>
                                                ))}
                                            </Carousel>
                                            <div className='absolute top-2 right-2 z-10 text-white text-2xl cursor-pointer'> 
                                                <Button
                                                    className='text-white ml-[250px]'
                                                    type="text" 
                                                    icon={likedProducts.includes(product._id) ? <HeartFilled className='text-red-500' /> : <HeartOutlined className='text-white ' />} 
                                                    onClick={() => handleLikeToggle(product._id)} 
                                                />
                                            </div>
                                        </>
                                    }
                                >
                                    <Meta
                                        title={
                                            <span className='text-white'>{product.product_name}</span>
                                        }
                                        description={
                                            <div>
                                                <span className='text-lg text-white'>${product.sale_price}</span>
                                                <div className='text-sm text-gray-100'>
                                                    <p className='mb-2'>{product.description}</p>
                                                    <div className='flex items-center'>
                                                        <Rate className='border-1 border-white' disabled defaultValue={2} />
                                                        <span className='ml-2'>{product.reviews_count} reviews</span>
                                                    </div>
                                                    {product.discount && 
                                                        <div className='mt-2 text-red-500'>
                                                            <strong>Discount: {product.discount}% OFF</strong>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        } 
                                    />
                                    <Link to={`/products/${product._id}`}><Button className='w-full mt-4' type='primary'>View Details</Button></Link>
                                </Card>
                            )
                        }
                    </div>
                )}
            </Container>

            <div className='bg-gray-800 text-white py-6 text-center mt-16'>
                <p>&copy; 2024 Your Company. All rights reserved.</p>
                <p>
                    <Link to='/contact' className='text-blue-400 hover:underline'>Contact Us</Link> | 
                    <Link to='/privacy' className='text-blue-400 hover:underline'> Privacy Policy</Link>
                </p>
            </div>
        </div>
    );
}

export default Products;
