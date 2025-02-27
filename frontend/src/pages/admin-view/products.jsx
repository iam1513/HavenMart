import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import React, { Fragment, useEffect, useState } from 'react'
import ProductImageUpload from './image-upload'
import { useDispatch, useSelector } from 'react-redux'
import { addNewProduct, fetchProducts } from '@/store/admin/product-slice'
import { useToast } from '@/hooks/use-toast'

const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
}

const AdminProducts = () => {

    const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false)
    const [formData, setFormData] = useState(initialFormData)
    const [imageFile, setImageFile] = useState(null)
    const [uploadedImageUrl, setUploadedImageUrl] = useState('')
    const [imageLoadingState, setImageLoadingState] = useState(false)

    const { productList } = useSelector(state => state.adminProducts)

    const dispatch = useDispatch();
    const { toast } = useToast()

    function onSubmit(event) {
        event.preventDefault()
        dispatch(addNewProduct({
            ...formData,
            image: uploadedImageUrl
        })).then((data) => {
            console.log(data)
            if (data?.payload?.success) {
                dispatch(fetchProducts)
                setOpenCreateProductDialog(false)
                setImageFile(null)
                setFormData(initialFormData)
                toast({
                    title: "Product added successfully"
                })
            }
        })
    }

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    console.log(productList, "productList")

    return (
        <Fragment>
            <div className='mb-5 w-full flex justify-end'>
                <Button onClick={() => setOpenCreateProductDialog(true)}>Add New Product</Button>
            </div>
            <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>

            </div>
            <Sheet open={openCreateProductDialog} onOpenChange={
                () => { setOpenCreateProductDialog(false) }
            }>
                <SheetContent side='right' className='overflow-auto'>

                    <SheetHeader>
                        <SheetTitle>Add New Product</SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl}
                        setUploadedImageUrl={setUploadedImageUrl}
                        setImageLoadingState={setImageLoadingState}
                        imageLoadingState={imageLoadingState}
                    />
                    <div className='py-6'>
                        <CommonForm onSubmit={onSubmit} formControls={addProductFormElements} formData={formData} setFormData={setFormData} buttonText="Add" />
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    )
}

export default AdminProducts