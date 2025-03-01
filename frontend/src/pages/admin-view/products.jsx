import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import React, { Fragment, useEffect, useState } from 'react'
import ProductImageUpload from './image-upload'
import { useDispatch, useSelector } from 'react-redux'
import { addNewProduct, deleteProduct, editProduct, fetchProducts } from '@/store/admin/product-slice'
import { useToast } from '@/hooks/use-toast'
import AdminProductTile from '@/components/admin-view/product-tile'

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
    const [currentEditedId, setCurrentEditedId] = useState(null)

    const { productList } = useSelector(state => state.adminProducts)

    const dispatch = useDispatch();
    const { toast } = useToast()

    function onSubmit(event) {
        event.preventDefault()
        currentEditedId !== null ?
            dispatch(editProduct({ id: currentEditedId, formData: { ...formData } }))
                .then((data) => {
                    if (data?.payload?.success) {
                        dispatch(fetchProducts())
                        setFormData(initialFormData)
                        setOpenCreateProductDialog(false)
                        setCurrentEditedId(null)
                    }
                })
            :
            dispatch(addNewProduct({
                ...formData,
                image: uploadedImageUrl
            }))
                .then((data) => {
                    
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

    function handleDelete(getCurrentProductId) {
        
        dispatch(deleteProduct(getCurrentProductId))
            .then(data => {
                if (data?.payload.success) {
                    dispatch(fetchProducts())
                }
            })
    }

    function isFormValid() {
        return Object.keys(formData)
            .map(key => formData[key] !== '')
            .every((item) => item)
    }

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

 

    return (
        <Fragment>
            <div className='mb-5 w-full flex justify-end'>
                <Button onClick={() => setOpenCreateProductDialog(true)}>Add New Product</Button>
            </div>
            <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
                {
                    productList && productList.length > 0 ?
                        productList.map(productItem => <AdminProductTile
                            setCurrentEditedId={setCurrentEditedId}
                            setOpenCreateProductDialog={setOpenCreateProductDialog}
                            setFormData={setFormData}
                            product={productItem}
                            handleDelete={handleDelete}
                        />)
                        : null
                }
            </div>
            <Sheet open={openCreateProductDialog} onOpenChange={
                () => {
                    setOpenCreateProductDialog(false)
                    setCurrentEditedId(null)
                    setFormData(initialFormData)
                }
            }>
                <SheetContent side='right' className='overflow-auto'>

                    <SheetHeader>
                        <SheetTitle>
                            {
                                currentEditedId !== null ? "Edit the Product" : "Add New Product"
                            }
                        </SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl}
                        setUploadedImageUrl={setUploadedImageUrl}
                        setImageLoadingState={setImageLoadingState}
                        imageLoadingState={imageLoadingState}
                        isEditMode={currentEditedId !== null}
                    />
                    <div className='py-6'>
                        <CommonForm
                            onSubmit={onSubmit}
                            formControls={addProductFormElements}
                            formData={formData}
                            setFormData={setFormData}
                            buttonText={
                                currentEditedId !== null ? 'Edit' : "Add"
                            }
                            isBtnDisabled={!isFormValid()} />
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    )
}

export default AdminProducts