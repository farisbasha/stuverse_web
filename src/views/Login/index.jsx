import { Button, Input } from '@nextui-org/react'
import stuverseLogo from "../../assets/stuverse.png"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import {useDispatch, useSelector} from "react-redux"
import { loginWithEmailPassword } from '../../redux/slices/authSlice'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'


const schema = yup
  .object({
    email: yup.string().email("Bro email is not valid").required("Bro email is required"),
    password: yup.string().required()
  })
  .required()

const Login = () => {
  const dispatch =  useDispatch()
  const navigate = useNavigate()

  const authState = useSelector(state => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
     try {
      await dispatch(loginWithEmailPassword(data)).unwrap()
      toast.success("Login successfully")
      navigate("/")
     } catch (error) {  
        toast.error(error.toString())
     }
  }



  return (
    <div className='flex flex-col items-center justify-center gap-4 pt-[20vh] px-4'>
        <img src={stuverseLogo} alt="" className='w-40'/>

        <h1 className='text-3xl font-bold '>Welcome to Stuverse</h1>

        <form id="login-form"  className="flex flex-col gap-2 w-full" onSubmit={handleSubmit(onSubmit)} >
          <Input isRequired size='md' variant="bordered" label="Email" placeholder='Enter your email' {...register("email")} isInvalid={errors.email ? true:false} errorMessage={errors.email?.message} />
          <Input isRequired size='md' variant="bordered" label="Password" placeholder='Enter your password' {...register("password")} isInvalid={errors.password ? true:false}  errorMessage={errors.password?.message}/>
        </form>

        <Button isLoading={authState.status === "loading"}  type='submit' form='login-form'  color="primary" size="md" className='w-full mt-2' >Login</Button>
       
    </div>
  )
}

export default Login
