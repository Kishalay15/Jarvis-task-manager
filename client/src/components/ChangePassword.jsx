import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import Loader from "./Loader"
import ModalWrapper from "./ModalWrapper"
import TextBox from "./TextBox"
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";

const ChangePassword = ({ open, setOpen }) => {
    const {
        register,
        handleSubmit,
        formState: { erros },
    } = useForm()

    const [changeUserPassword, {isLoading}] = useChangePasswordMutation()

    const handleOnSubmit = async (data) => {
        if (data.password !== data.cpass) {
            toast.warning("Passwords don't match")
            return
        }
        try {
            const result = await changeUserPassword(data).unwrap()
            toast.success("New user added")

            setTimeout(() => {
                setOpen(false)
            }, 1500)
        } catch (error) {
            console.log(error)
            toast.error(error?.data?.message || error?.error)
        }
    }

    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <Dialog.Title>
                        <div className="mt-2 flex flex-col gap-6">
                            <TextBox
                                place
                            />
                        </div>
                    </Dialog.Title>
                </form>
            </ModalWrapper>
        </>
    )
}
