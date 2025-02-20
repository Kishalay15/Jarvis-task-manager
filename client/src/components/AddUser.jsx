import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import TextBox from "./TextBox";
import Loader from "./Loader";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
import { useUpdateUserMutation } from "../redux/slices/api/userApiSlice";
import { setCredentials } from "../redux/slices/authSlice";

const AddUser = ({ open, setOpen, userData }) => {
    let defaultValues = userData ?? {};
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues });

    const [addNewUser, { isLoading }] = useRegisterMutation()

    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()

    const handleOnSubmit = async (data) => {
        try {
            if (userData) {
                const result = await updateUser(data).unwrap()

                toast.success(result?.message)
            } else {
                const result = await addNewUser({ ...data, password: data.email }).unwrap()

                toast.success("New user added successfully")

                if (userData?._id === user?._id) {
                    dispatch(setCredentials({ ...result.user }))
                }

                console.log(result)
            }

            setTimeout(() => {
                setOpen(false)
            }, 1500)
        } catch (error) {
            toast.error("Something went wrong")
        }
    };

    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
                    <Dialog.Title
                        as='h2'
                        className='text-base font-bold leading-6 text-gray-900 mb-4'
                    >
                        {userData ? "UPDATE PROFILE" : "ADD NEW USER"}
                    </Dialog.Title>
                    <div className='mt-2 flex flex-col gap-6'>
                        <TextBox
                            placeholder='Full name'
                            type='text'
                            name='name'
                            label='Full Name'
                            className='w-full rounded'
                            register={register("name", {
                                required: "Full name is required!",
                            })}
                            error={errors.name ? errors.name.message : ""}
                        />
                        <TextBox
                            placeholder='Title'
                            type='text'
                            name='title'
                            label='Title'
                            className='w-full rounded'
                            register={register("title", {
                                required: "Title is required!",
                            })}
                            error={errors.title ? errors.title.message : ""}
                        />
                        <TextBox
                            placeholder='Email Address'
                            type='email'
                            name='email'
                            label='Email Address'
                            className='w-full rounded'
                            register={register("email", {
                                required: "Email Address is required!",
                            })}
                            error={errors.email ? errors.email.message : ""}
                        />

                        <TextBox
                            placeholder='Role'
                            type='text'
                            name='role'
                            label='Role'
                            className='w-full rounded'
                            register={register("role", {
                                required: "User role is required!",
                            })}
                            error={errors.role ? errors.role.message : ""}
                        />
                    </div>

                    {isLoading || isUpdating ? (
                        <div className='py-5'>
                            <Loader />
                        </div>
                    ) : (
                        <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
                            <button
                                type='submit'
                                className="py-2 outline-none bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
                            >
                                <span>Submit</span>
                            </button>

                            <button
                                type="button"
                                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto py-2 outline-none"
                                onClick={() => setOpen(false)}
                            >
                                <span>Cancel</span>
                            </button>
                        </div>
                    )}
                </form>
            </ModalWrapper>
        </>
    );
};

export default AddUser;
