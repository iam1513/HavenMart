
export const registerFormControls = [
    {
        name: 'userName',
        label: 'User Name',
        placeholde: "Enter your user name",
        componentType: "input",
        type: "text"
    },
    {
        name: 'email',
        label: 'Email',
        placeholde: "Enter your email",
        componentType: "input",
        type: "text"
    }
    ,
    {
        name: 'password',
        label: 'Password',
        placeholde: "Enter your password",
        componentType: "input",
        type: "password"
    }
]

export const loginFormControls = [
    {
        name: 'email',
        label: 'Email',
        placeholde: "Enter your email",
        componentType: "input",
        type: "text"
    }
    ,
    {
        name: 'password',
        label: 'Password',
        placeholde: "Enter your password",
        componentType: "input",
        type: "password"
    }
]

export const addProductFormElements = [
    {
        label: "Title",
        name: "title",
        componentType: "input",
        type: "text",
        placeholder: "Enter Product Title"
    },
    {
        label: "Description",
        name: "description",
        componentType: "textarea",
        placeholder: "Enter Product Description"
    },
    {
        label: "Category",
        name: "category",
        componentType: "select",
        options: [
            {
                id: "men", label: "Men"
            },
            {
                id: "women", label: "Women"
            },
            {
                id: "kids", label: "Kids"
            },
            {
                id: "accessories", label: "Accessories"
            },
            {
                id: "footwear", label: "Footwear"
            }
        ]
    },
    {
        label: "Brand",
        name: "brand",
        componentType: "select",
        options: [
            {
                id: "nike", label: "Nike"
            },
            {
                id: "adidas", label: "Adidas"
            },
            {
                id: "puma", label: "Puma"
            },
            {
                id: "reebok", label: "Reebok"
            },
            {
                id: "levi", label: "Levi S"
            }
        ]
    },
    {
        label: "Price",
        name: "price",
        componentType: "input",
        type: "number",
        placeholder: "Enter Product Price"
    },
    {
        label: "Sale Price",
        name: "salePrice",
        componentType: "input",
        type: "number",
        placeholder: "Enter Product Sale Price"
    },
    {
        label: "Total Stock",
        name: "totalStock",
        componentType: "input",
        type: "number",
        placeholder: "Enter Total Stock"
    }
]