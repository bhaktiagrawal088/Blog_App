import React , {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Logo , Button, Input} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const [error , setError] = useState("")

    const login = async(data) => {
        setError(" ")
        try {
            const session = await authService.login(data)
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData))
                navigate('/')
            }
        }
        catch(err) {
            setError(err.message)
        }
    }

    // const passwordValidation = {
    //     required: "Password is required",
    //     minLength: {
    //       value: 8,
    //       message: "Password must be at least 8 characters long"
    //     },
    //     maxLength: {
    //       value: 265,
    //       message: "Password must be less than 265 characters long"
    //     },
    //     validate: {
    //       notCommon: value => !isCommonPassword(value) || "Password is too common"
    //     }
    //   };
    
    //   const isCommonPassword = (password) => {
    //     const commonPasswords = ['123456', 'password', '12345678', 'qwerty', 'abc123'];
    //     return commonPasswords.includes(password);
    //   };

  return (
    <>
    <div className='flex items-center justify-center w-full'> 
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className='mb-2 flex justify-center '>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width = '100%' />
                </span>
            </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                Don&apos;t have  any account?&nbsp;
                <Link to='/signup' className='font-medium text-primary transition-all duration-200 hover:underline'>
                    Sign Up
                </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                    
                        <Input
                            label = 'Email : '
                            type = 'email'
                            placeholder= 'Enter your email'
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPattern : (value) => /^\w+([.-]? \w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.
                                    test(value) || 'Email address must be a valid addresses',

                                }
                            })}
                        />

                        <Input
                            label = 'Password : '
                            type = 'password'
                            placeholder= 'Enter your password'
                            {...register('password', {
                                required: true,
                
                                })}
                        />

                        <Button
                        type = 'submit'
                        className = 'w-full'
                        >Sign in</Button>
                    </div>


                </form>
        </div>
      
    </div>
    </>
  )
  }

export default Login
