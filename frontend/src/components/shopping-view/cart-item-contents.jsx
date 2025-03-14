import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItem, updateCartQuantity } from '@/store/shop/cart-slice'
import { useToast } from '@/hooks/use-toast'

const UserCartItemsContent = ({ cartItem }) => {

    const { user } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const { toast } = useToast();
    function handleCartItemDelete(getCartItem) {
        dispatch(deleteCartItem({ userId: user?.id, productId: getCartItem?.productId }))
            .then(data => {
                if (data?.payload?.success) {
                    toast({
                        title: "Cart Item deleted successfully"
                    })
                }
            })
    }

    function handleUpdateQuantity(getCartItem, typeOfAction) {
        dispatch(updateCartQuantity(
            {
                userId: user?.id,
                productId: getCartItem?.productId,
                quantity: typeOfAction === 'plus' ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1
            }

        )).then(data => {
            if (data?.payload?.success) {
                toast({
                    title: "Cart Item Updated successfully"
                })
            }
        })
    }

    return (
        <div className='flex items-center space-x-4'>
            <img className='w-20 h-20 rounded object-cover'
                src={cartItem?.image}
                alt={cartItem?.title}
            />
            <div className='flex-1'>
                <h3 className='font-extrabold'>{cartItem?.title}</h3>
                <div className='flex items-center mt-1 gap-2'>
                    <Button
                        className="h-8 w-8 rounded-full"
                        variant="outline"
                        size="icon"
                        disabled={cartItem?.quantity === 1}
                        onClick={() => handleUpdateQuantity(cartItem, 'minus')}
                    >
                        <Minus className='w-4 h-4' />
                        <span className='sr-only'>Decrease</span>
                    </Button>
                    <span className='font-semibold'>{cartItem?.quantity}</span>
                    <Button
                        className="h-8 w-8 rounded-full"
                        variant="outline"
                        size="icon"
                        onClick={() => handleUpdateQuantity(cartItem, 'plus')}
                    >
                        <Plus className='w-4 h-4' />
                        <span className='sr-only'>Increase</span>
                    </Button>
                </div>
            </div>
            <div className='flex flex-col items-end'>
                <p className='font-semibold'>
                    ${((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quantity).toFixed(2)}
                </p>
                <Trash onClick={() => handleCartItemDelete(cartItem)} className='cursor-pointer mt-1' size={20} />
            </div>
        </div>
    )
}

export default UserCartItemsContent