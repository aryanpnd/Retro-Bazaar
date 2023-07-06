import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, border, useToast } from "@chakra-ui/react"
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logoTransparent from '../assets/images/logoTransparent.png'
import { ArrowForwardIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'
import '../styles/signup.css'
import { hostUrl } from '../App';
import axios, * as others from 'axios';


export default function Signup() {

    const Navigate = useNavigate()
    const toast = useToast()

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const [show2, setShow2] = useState(false)
    const handleClick2 = () => setShow2(!show2)


    const [toggleBtn, setToggleBtn] = useState(true)
    const [passFieldColor, setPassFieldColor] = useState(undefined);
    const [emailFieldColor, setEmailFieldColor] = useState(undefined);
    const [inputError, setInputError] = useState('')
    const [loading, setLoading] = useState(false)

    const [inputData, setInputData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleDataChange = (e) => {
        setInputData(prevData => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }

    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const validateInputData = () => {
        const pass = inputData.password;
        const confpass = inputData.confirmPassword;

        const passMatched = pass === confpass;
        const validEmail = inputData.email === ' ' || isValidEmail(inputData.email);

        if (validEmail) {
            setEmailFieldColor('');
            setInputError('')
        } else {
            setInputError('Please enter a valid email')
            setEmailFieldColor('red');
        }

        if (passMatched) {
            setPassFieldColor('');
            setInputError('')
        } else {
            setInputError('Please match the both passowords')
            setPassFieldColor('red');

        }
        if (validEmail && passMatched) {
            setToggleBtn(false);
        } else {
            setToggleBtn(true);
        }
    }

    useEffect(() => {

        validateInputData()
    }, [inputData]);
    useEffect(() => {

        validateInputData()
    }, []);


    useEffect(() => {
        const validEmail = inputData.email === '' || isValidEmail(inputData.email);

        if (validEmail) {
            setEmailFieldColor('');
        } else {
            setInputError('Please enter a valid email')
        }

    }, [inputData.email])


    const handleSubmit = () => {
        setLoading(true)
        axios.post(`${hostUrl}/authapi/local/signup`, inputData).then((res) => {
            setLoading(false)
            toast({
                title: 'Success',
                description: res.data + ' ' + 'Please login',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
                variant: 'solid',
                containerStyle: { fontSize: '14px', },
            })
            Navigate('/auth')
        }).catch((err) => {
            toast({
                title: err.response.data.error,
                description: err.response.data.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top-right',
                variant: 'solid',
                containerStyle: { fontSize: '14px', },
            })
            setLoading(false)
        })

    }


    return (
        <Flex
            justifyContent={'center'}
            alignItems={'center'}
            w={'100%'}
            h={'100%'}
            overflowX={'hidden'}
            color={'white'} >


            {/* Logo image */}
            <Box position={'absolute'} w={['25%', '20%', '20%', '15%', '10%']} top={'1rem'} left={'1rem'}>
                <img draggable={false} src={logoTransparent} alt="" />
            </Box>


            {/* fields,button and heading MAIN Container */}
            <Flex flexDir={'column'} justifyContent={'space-between'} w={['90%', '90%', '40%', '30%', '30%']} h={'85%'}>


                {/* Heading,inputs,and button container */}
                <Flex flexDir={'column'} justifyContent={'space-evenly'} gap={'1rem'} h={'90%'}>

                    {/* Heading  */}
                    <Box h={['20%', '20%', '20%', '30%', '30%']}>
                        <Text
                            bgGradient='linear-gradient(to left, #2866ca, #00ff89)'
                            bgClip='text'
                            fontSize={['250%', '300%', '300%', '350%', '350%']}
                            fontWeight='extrabold' textAlign={'center'}
                        >
                            Welcome Stranger!
                        </Text>
                        <Text textAlign={'center'} fontSize='5xl' fontWeight='bold'>
                            Create an account
                        </Text>
                    </Box>



                    <Flex flexDir={'column'} justifyContent={'space-evenly'} gap={'1rem'} h={['55%', '55%', '55%', '70%', '70%']}>


                        {/* Name input */}
                        <Input h={'22%'} borderRadius={'14px'} onChange={handleDataChange} type='text' name='name' placeholder='Name' focusBorderColor='pink.500' _placeholder={{ fontWeight: 'bold', color: '#f5f5f5db' }} />


                        {/* Email input */}
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



                        {/* password */}
                        <InputGroup size='md' h={'22%'}>
                            {/* password input field */}
                            <Input
                                h={''}
                                onChange={handleDataChange}
                                type={show ? 'text' : 'password'}
                                name='password'
                                focusBorderColor='pink.500'
                                placeholder='Password' borderRadius={'14px'}
                                _placeholder={{ fontWeight: 'bold', color: '#f5f5f5db' }} />

                            {/* password input field icon button */}
                            <InputRightElement width='25%' height='100%'>
                                <Button className='btn' borderRadius='10px' color={show ? 'teal.400' : 'pink.400'} h='70%' size='lg' variant='ghost' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>

                        </InputGroup>




                        {/* Confirm password */}
                        <InputGroup size='md' h={'22%'}>

                            {/* password input field */}
                            <Input
                                h={''}
                                borderColor={passFieldColor}
                                focusBorderColor={passFieldColor ? "none" : 'pink.500'}
                                _hover={"none"}
                                onChange={handleDataChange}
                                type={show2 ? 'text' : 'password'}
                                name='confirmPassword'
                                placeholder='Confirm password'
                                borderRadius={'14px'}
                                _placeholder={{ fontWeight: 'bold', color: '#f5f5f5db' }} />

                            {/*Confirm password input field icon button */}
                            <InputRightElement width='15%' height='100%'>
                                {passFieldColor ?
                                    <CloseIcon color='red.500' />
                                    : <CheckIcon color='green.500' />}

                            </InputRightElement>

                        </InputGroup>



                        {/* Submit buttom */}
                        <Button
                            color={'#266cc799'}
                            className='btn'
                            mt={'1.5rem'}
                            isDisabled={toggleBtn}
                            borderRadius={'14px'}
                            h={'24%'}
                            fontSize={'1.6rem'}
                            
                            fontWeight={'extrabold'}
                            variant='ghost'
                            bg={'black'}
                            _hover={{
                                background: 'linear-gradient(to left, #7928ca75, #ff008069)',
                                color: 'white',
                                transform: 'translateY(-3px)'
                            }}
                            _active={{ transform: 'scale(0.9)' }}
                            rightIcon={toggleBtn ? '' : <ArrowForwardIcon color={'white'} />}
                            isLoading={loading}
                            onClick={handleSubmit}
                        >
                            <Text color={'whitesmoke'}>{toggleBtn ? inputError : 'Sign up'}</Text>
                        </Button>
                    </Flex>
                </Flex>


                {/* Signin page button container */}
                <Flex flexDir={'column'} justifyContent={'space-between'} gap={'1rem'} h={'5%'}  >
                    <Button className='btn' color={'whiteAlpha.700'} borderRadius={'14px'} h={'100%'} variant='ghost' onClick={() => Navigate('/auth/')} _hover={{ background: 'transparent', color: '' }} _active={{ transform: ' scale(0.8)' }} fontSize={'1.1rem'}> Already have an account?
                        <Text
                            ml={'1rem'}
                            bgGradient='linear(to-l, #7928CA, #FF0080)'
                            bgClip='text'
                            fontSize={'1.5rem'}
                            textAlign={'center'}
                        >
                            Sign in
                        </Text>
                    </Button>

                </Flex>


            </Flex>
        </Flex>
    )
}
