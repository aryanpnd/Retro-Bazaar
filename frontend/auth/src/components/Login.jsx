import { AbsoluteCenter, Box, Button, Divider, Flex, Input, InputGroup, InputRightElement, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logoTransparent from '../assets/images/logoTransparent.png'
import googleLogo from '../assets/images/googleLogo.svg'
import blobBall1 from '../assets/images/blobBall1.svg'
import blobBall2 from '../assets/images/blobBall2.svg'
import '../styles/login.css'
import { color } from 'framer-motion'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { hostUrl } from '../App'

export default function Login() {

    const Navigate = useNavigate()
    const toast = useToast()

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const [toggleBtn, setToggleBtn] = useState(false)
    const [emailFieldColor, setEmailFieldColor] = useState('')
    const [inputError, setInputError] = useState('')
    const [loading, setLoading] = useState(false)

    const [inputData, setInputData] = useState({
        email: '',
        password: '',
    })

    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleDataChange = (e) => {        
        setInputData(prevData => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }
    useEffect(() => {
        const validEmail = inputData.email === '' || isValidEmail(inputData.email)
        if (validEmail) {
            setToggleBtn(false)
            setEmailFieldColor('')
            setInputError('')
        } else {
            setToggleBtn(true)
            setEmailFieldColor('red')
            setInputError('Please enter a valid email')
        }
      }, [inputData])


      const handleSubmit = () => {
        setLoading(true)
        try {
            axios.post(`${hostUrl}/authapi/local/login`, inputData).then((res) => {
                setLoading(false)
                console.log(res)
                toast({
                    title: res.data.message,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                    variant: 'solid',
                    containerStyle: { fontSize: '14px', },
                })
                window.location.href = '/'
            }).catch((err) => {
                console.log(err)
                toast({
                    title: err.response.data.message,
                    description:'Try Again',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'top-right',
                    variant: 'solid',
                    containerStyle: { fontSize: '15px', },
                })
                setLoading(false)
            })
        } catch (error) {
            toast({
                title: 'Wrong details, Try again',
                description:'Try Again',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top-right',
                variant: 'solid',
                containerStyle: { fontSize: '15px', },
            })
            setLoading(false)
        }

    }


    return (

        <Flex
        className='login'
            justifyContent={'center'}
            alignItems={'center'}
            w={'100%'}
            h={'100%'}
            overflowX={'hidden'}
            color={'white'}
        >
            <Box position={'absolute'} w={['25%', '20%', '20%', '15%', '10%']} top={'1rem'} left={'1rem'}>
                <img draggable={false} src={logoTransparent} alt="" />
            </Box>

            <Box position={'absolute'} display={['none', 'none', 'none', 'block', 'block']} w={'25%'} top={'-10rem'} right={'-10rem'}>
                <img draggable={false} src={blobBall1} alt="" />
            </Box>
            <Box position={'absolute'} display={['none', 'none', 'none', 'block', 'block']} w={'25%'} bottom={'-10rem'} left={'-10rem'}>
                <img draggable={false} src={blobBall2} alt="" />
            </Box>

            <Flex flexDir={'column'} justifyContent={'space-between'} w={['90%', '90%', '40%', '30%', '30%']} h={'90%'}>

                <Flex flexDir={'column'} justifyContent={'space-evenly'} gap={'1rem'} h={'70%'}>

                    <Box h={['30%', '30%', '30%', '45%', '45%']}>
                        <Text
                        
                            bgGradient='linear(to-l, #7928CA, #FF0080)'
                            bgClip='text'
                            fontSize='350%'
                            fontWeight='extrabold' textAlign={'center'}
                        >
                            Welcome back!
                        </Text>
                        <Text textAlign={'center'} fontSize='5xl' fontWeight='bold'>
                            Sign in
                        </Text>
                    </Box>


                    <Flex flexDir={'column'} justifyContent={'space-evenly'} gap={'1rem'} h={'50%'}>

                        <InputGroup h={'22%'}>
                            <Input h={'100%'}
                                borderColor={emailFieldColor}
                                focusBorderColor={emailFieldColor ? "none" : 'pink.500'}
                                _hover={"none"}
                                borderRadius={'14px'} onChange={handleDataChange} type='email' name='email' placeholder='Email' _placeholder={{ fontWeight: 'bold', color: '#f5f5f5db' }} />
                            <InputRightElement h={'100%'} w={'12%'}>
                                {emailFieldColor ? <CloseIcon color='red.500' /> : <CheckIcon color='green.500' />}
                            </InputRightElement>
                        </InputGroup>


                        <InputGroup size='md' h={'22%'}>
                            <Input h={''} borderColor={''} onChange={handleDataChange}
                                type={show ? 'text' : 'password'}
                                name='password' placeholder='Password' borderRadius={'14px'} focusBorderColor='pink.500' _placeholder={{ fontWeight: 'bold', color: '#f5f5f5db' }} />
                            <InputRightElement width='25%' height='100%'>
                                <Button className='btn' borderRadius='10px' color={show ? 'teal.400' : 'pink.400'} h='70%' size='lg' variant='ghost' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>


                        <Button color={'whiteAlpha.700'} className='btn' mt={'1.5rem'} isDisabled={toggleBtn} borderRadius={'14px'} h={'24%'}
                            fontSize={'1.6rem'}
                            fontWeight={'extrabold'}
                            bgGradient={'linear(to-l, #7928CA, #FF0080)'}
                            _hover={{ background: "linear-gradient(to left, #7928cab5, #ff00806b)" }}
                            _active={{ background: "linear-gradient(to left, #7928ca69, #ff008057)", transform: ' scale(0.8)' }}
                            transition={'background-color 0.5s, transform 0.2s;'}
                            onClick={handleSubmit}
                            isLoading={loading}
                        >
                            <Text color={'whitesmoke'}>{toggleBtn ? inputError : 'Sign in'}</Text>

                        </Button>
                    </Flex>
                </Flex>


                <Flex flexDir={'column'} justifyContent={'space-between'} gap={'1rem'} h={'30%'}  >
                    <Box position='relative' padding='5' h={'5%'} >
                        <Divider />
                        <AbsoluteCenter bg='none' px='2'>
                            <Text color={'white'} fontSize={20}>or</Text>
                        </AbsoluteCenter>
                    </Box>

                    <Flex flexDir={'column'} justifyContent={'space-evenly'} gap={'1rem'} h={'85%'}>

                        <Button className='btn' borderRadius={'14px'} h={'40%'} variant='ghost' 
                        bg={{ base: 'white',sm:'white', md: 'white', lg: 'black',xl:'black','2xl':'black' }}
                        color={{ base: 'black',sm:'black', md: 'black', lg: 'white',xl:'white','2xl':'white' }}
                        fontSize={'1.3rem'} fontWeight={'semibold'} _hover={{ background: 'whitesmoke',color:'black'}} _active={{ transform: ' scale(0.8)' }}
                            onClick={() => window.location.href = '/authapi/google'}
                            rightIcon={
                                <img draggable={false} style={{ width: '2rem' }} src={googleLogo} alt="" />
                            }>
                            Continue with Google
                        </Button>

                        <Button className='btn' color={'whiteAlpha.700'} borderRadius={'14px'} h={'40%'} variant='ghost' onClick={() => Navigate('/auth/signup')} _hover={{ background: 'transparent', color: '' }} _active={{ transform: ' scale(0.8)' }} fontSize={'1.1rem'}> Don't have an account?
                            <Text
                                ml={'1rem'}
                                bgGradient='linear-gradient(to left, #2866ca, #00ff89)'
                                bgClip='text'
                                fontSize={'1.5rem'}
                                textAlign={'center'}
                            >
                                Signup insted
                            </Text>
                        </Button>

                    </Flex>
                </Flex>


            </Flex>

        </Flex>

    )
}
