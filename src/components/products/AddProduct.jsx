import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as yup from "yup";
import convertToBase64 from '../../utils/converToBase64';
import axios from 'axios';
import "react-pure-modal/dist/react-pure-modal.min.css";
import PureModal from "react-pure-modal";

function AddProduct() {
    const [modal, setModal] = useState(false);
    const[images,setImages]=useState([])
    const[imageErr,setImageErr]=useState("")

    const getBase64Images = async files =>{
        try {
            const image64=[];
            for(let i=0; i<files.length;i++){
                const image= await convertToBase64(files[0]);
                image64.push(image)
            }
            setImages(image64)
        } catch (error){
            console.log(error)
        }
    };
    const formik = useFormik({
      initialValues: {
        title: "",
        brand: "",
        description: "",
        price: "",
        stock: "",
      },
      validationSchema: yup.object({
        title: yup
          .string()
          .min(3, "title should be atleast 3 characters")
          .required("please add a title"),
  
        brand: yup
          .string()
          .min(3, "brand should be atleast a characters")
          .required("please add a brand"),
  
        description: yup
          .string()
          .min(100, "add more about product")
          .required("please add descripton"),
  
        price: yup
          .number()
          .moreThan(0, "price cannot be less than 0")
          .required("please add a brand"),
        stock: yup
          .number()
          .moreThan(0, "stock cannot be lessthan 0")
          .required("please add stock of the product"),
      }),
      onSubmit: async (values) => {
        try {
            if(images.length < 4)
            {
                setImageErr("please add 4 or more images")
            }
            else{
                const {data}= await axios.post("http://localhost:3000/addproduct",{

                    ...values,
                    images:images,
                });
                console.log(data)

                if(data.success){
                    setModal(false);
                    // setModal([])
                    setImages([])
                }
                else{
                  alert(data.err_msg)
                }
            
            }
      }
      catch(error){
        alert(error.message)
        console.log(error)
      }
    },
    });
  
    
  return (
    <>
  <button
          className="fixed top-16 right-10 bg-white w-12 hover:bg-yellow-800"
          onClick={() => setModal(true)}
        >
          <i className="fa-solid fa-plus text-xl"></i>
        </button>
       
<PureModal
          header="Add product"
          isOpen={modal}
          onClose={() => {
            setModal(false);
            return true;
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="">product name</label>
              <input
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                className="border-none shadow shadow-black outline-none  rounded-md py-2"
              />
              <p className="text-xs text-red-600">{formik?.errors?.title}</p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="">product brand</label>
              <input
                type="text"
                name="brand"
                value={formik.values.brand}
                className="border-none shadow shadow-black outline-none  rounded-md py-2"
                onChange={formik.handleChange}
              />
              <p className="text-xs text-red-600">{formik?.errors?.brand}</p>
            </div>

            <div className="flex flex-col ">
              <label htmlFor="">description</label>
              <textarea
                type="textarea"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                className="border-none shadow shadow-black outline-none  rounded-md py-2"
              />
              <p className="text-xs text-red-600">
                {formik?.errors?.description}
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="">product price</label>
              <input
                type="number"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                className="border-none shadow shadow-black outline-none  rounded-md py-2"
              />
              <p className="text-xs text-red-600">{formik?.errors?.price}</p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Stock</label>
              <input
                type="number"
                name="stock"
                value={formik.values.stock}
                onChange={formik.handleChange}
                className="border-none shadow shadow-black outline-none  rounded-md py-2"
              />
              <p className="text-xs text-red-600">{formik?.errors?.stock}</p>
            </div>
            <div className='grid grid-cols-2'>
              {images.map((ele,i)=>(
                <img key={i}  className='border border-black' src={ele} alt="" />
              ))}
            </div>
                <p className='text-xs text-red-600'>
                    {images.length <4 ?"please add 4 more images":imageErr}
                </p>
                <input type="file" 
                multiple
                onChange={e => getBase64Images(Array.from(e.target.files))} />
            <div className="flex justify-between">
              <button
                className="me-3 bg-blue-500 px-3 py-1 rounded-lg text-white"
                onClick={formik.handleReset}
              >
                Discard
              </button>
              <button type="submit">Add</button>
            </div>
          </form>
        </PureModal>
    </>
  )
}

export default AddProduct