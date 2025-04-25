import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, fetchAllAddresses } from "@/store/shop/address-slice";
import AddressCard from "./address-card";

const initialAddressFormData = {
    address: "",
    city: "",
    phone: "",
    pincode: "",
    notes: "",
};

const Address = () => {
    const [formData, setFormData] = useState(initialAddressFormData);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { addressList } = useSelector((state) => state.shopAddress)

    function handleManageAddress(event) {
        event.preventDefault();

        if (!user?.id) {
            console.error("User ID is missing!");
            return;
        }

        dispatch(
            addNewAddress({
                ...formData,
                userId: user.id,
            })
        )
            .then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllAddresses(user?.id))
                    setFormData(initialAddressFormData)
                }
            })
    }

    function handleDeleteAddress() {

    }

    function isFormValid() {
        return Object.values(formData).every((value) => value.trim() !== "");
    }

    useEffect(() => {
        dispatch(fetchAllAddresses(user?.id))
    }, [dispatch])

    console.log(addressList)

    return (
        <Card>
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {
                    addressList && addressList.length > 0 ?
                        addressList.map(singleAddressItem => <AddressCard addressInfo={singleAddressItem} />) : null
                }

            </div>
            <CardHeader>
                <CardTitle>Add New Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <CommonForm
                    formControls={addressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={"Add"}
                    onSubmit={handleManageAddress}
                    isBtnDisabled={!isFormValid()}
                />
            </CardContent>
        </Card>
    );
};

export default Address;
