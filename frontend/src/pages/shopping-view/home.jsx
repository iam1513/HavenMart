import React, { useEffect, useState } from 'react';
import bannerOne from '../../assets/cycle.png';
import bannerTwo from '../../assets/elmo.jpg';
import { Button } from '@/components/ui/button';
import { Airplay, BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightningIcon, Codepen, Images, Shirt, ShirtIcon, ShoppingBasket, UmbrellaIcon, WashingMachine, WatchIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice';
import ShoppingProductTile from '@/components/shopping-view/product-tile';
import { useNavigate } from 'react-router-dom';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { useToast } from '@/hooks/use-toast';
import ProductDetailsDialog from './product-details';

const categoriesWithIcon = [
    {
        id: "men",
        label: "Men",
        icon: ShirtIcon
    },
    {
        id: "women",
        label: "Women",
        icon: CloudLightningIcon
    },
    {
        id: "kids",
        label: "Kids",
        icon: BabyIcon
    },
    {
        id: "accessories",
        label: "Accessories",
        icon: WatchIcon
    },
    {
        id: "footwear",
        label: "Footwear",
        icon: UmbrellaIcon
    },
]

const brandsWithIcon = [
    {
        id: "nike",
        label: "Nike",
        icon: Shirt
    },
    {
        id: "adidas",
        label: "Adidas",
        icon: WashingMachine
    },
    {
        id: "puma",
        label: "Puma",
        icon: ShoppingBasket
    },
    {
        id: "zara",
        label: "Zara",
        icon: Airplay
    },
    {
        id: "h&m",
        label: "H&M",
        icon: Images
    },
]
const ShoppingHome = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [sort, setSort] = useState('price-lowtohigh'); // Define sort state
    const [filters, setFilters] = useState({}); // Define filters state

    const { productList, productDetails } = useSelector(state => state.shopProducts);
    const { user } = useSelector((state) => state.auth);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const dispatch = useDispatch();
    const { toast } = useToast();
    const navigate = useNavigate();

    const slides = [bannerOne, bannerTwo];

    useEffect(() => {
        if (filters !== null && sort !== null) {
            dispatch(
                fetchFilteredProducts({ filterParams: filters, sortParams: sort })
            );
        }
    }, [dispatch, sort, filters]);

    function handleNavigateToListingPage(getCurrentItem, section) {
        sessionStorage.removeItem("filters");
        const currentFilter = {
            [section.charAt(0).toUpperCase() + section.slice(1)]: [getCurrentItem.id]
        };
        console.log("Before setting:", sessionStorage.getItem("filters"));
        sessionStorage.setItem("filters", JSON.stringify(currentFilter));
        console.log("After setting:", sessionStorage.getItem("filters"));
        navigate(`/shop/listing`);
    }

    function handleGetProductDetails(getCurrentProductDetails) {
        console.log(getCurrentProductDetails);
        dispatch(fetchProductDetails(getCurrentProductDetails))
            .then(() => {
                setOpenDetailsDialog(true); // Open the dialog after fetching details
            });
    }

    function handleAddToCart(getCurrentProductId) {
        dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 }))
            .then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchCartItems(user?.id));
                    toast({
                        title: "Product is added to the cart."
                    });
                }
            });
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        dispatch(fetchFilteredProducts({
            filterParams: {},
            sortParams: 'price-lowtohigh'
        }));
    }, [dispatch]);

    return (
        <div className='flex flex-col min-h-screen'>
            {/* Hero Section */}
            <div className='relative w-full h-[600px] overflow-hidden'>
                {slides.map((slide, index) => (
                    <img
                        src={slide}
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        alt={`Banner ${index + 1}`}
                    />
                ))}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentSlide(prevSlide => (prevSlide - 1 + slides.length) % slides.length)}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
                >
                    <ChevronLeftIcon className='w-4 h-4' />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length)}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
                >
                    <ChevronRightIcon className='w-4 h-4' />
                </Button>
            </div>

            {/* Categories Section */}
            <section className='py-12 bg-gray-50'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center mb-8'>Shop by category</h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                        {categoriesWithIcon.map(categoryItem => (
                            <Card
                                onClick={() => handleNavigateToListingPage(categoryItem, 'category')}
                                key={categoryItem.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    {React.createElement(categoryItem.icon, { className: 'w-12 h-12 mb-4 text-primary' })}
                                    <span className='font-bold'>{categoryItem.label}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brands Section */}
            <section className='py-12 bg-gray-50'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center mb-8'>Shop by brands</h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                        {brandsWithIcon.map(brandItem => (
                            <Card
                                onClick={() => handleNavigateToListingPage(brandItem, 'brand')}
                                key={brandItem.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    {React.createElement(brandItem.icon, { className: 'w-12 h-12 mb-4 text-primary' })}
                                    <span className='font-bold'>{brandItem.label}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className='py-12'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center mb-8'>
                        Feature Products
                    </h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {
                            productList && productList.length > 0 ? productList.map(productItem =>
                                <ShoppingProductTile
                                    handleGetProductDetails={handleGetProductDetails}
                                    product={productItem}
                                    handleAddToCart={handleAddToCart}
                                />
                            ) : null
                        }
                    </div>
                </div>
            </section>

            {/* Product Details Dialog */}
            <ProductDetailsDialog
                open={openDetailsDialog}
                setOpen={setOpenDetailsDialog}
                productDetails={productDetails} />
        </div>
    );
};

export default ShoppingHome;