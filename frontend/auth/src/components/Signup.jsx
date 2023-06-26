import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, Flex, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react"
import logoTransparent from '../assets/images/logoTransparent.png'
import { ArrowForwardIcon } from '@chakra-ui/icons'

import '../styles/signup.css'
import { useNavigate } from 'react-router-dom'

export default function Signup() {

    const Navigate = useNavigate()

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const [show2, setShow2] = useState(false)
    const handleClick2 = () => setShow2(!show2)


    const [toggleBtn, setToggleBtn] = useState(true)
    const [passFieldColor, setPassFieldColor] = useState(undefined);
    const [emailFieldColor, setEmailFieldColor] = useState(undefined);

    const [inputData, setInputData] = useState({
        name: '',
        email: '',
        phone: '',
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

    useEffect(() => {

        const pass = inputData.password;
        const confpass = inputData.confirmPassword;

        const passMatched = pass === confpass;
        const validEmail = inputData.email === '' || isValidEmail(inputData.email);

        if (validEmail) {
            setToggleBtn(false);
            setEmailFieldColor('');
        } else {
            setToggleBtn(true);
            setEmailFieldColor('red');
        }

        if (passMatched) {
            setToggleBtn(false);
            setPassFieldColor('');
        } else {
            setToggleBtn(true);
            setPassFieldColor('red');
        }
    }, [inputData, passFieldColor, emailFieldColor]);




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
                <img src={logoTransparent} alt="" />
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



                    {/* Name input */}
                    <Flex flexDir={'column'} justifyContent={'space-evenly'} gap={'1rem'} h={['55%', '55%', '55%', '70%', '70%']}>


                        <Input h={'22%'} borderRadius={'14px'} onChange={handleDataChange} type='text' name='name' placeholder='Name' focusBorderColor='pink.500' _placeholder={{ fontWeight: 'bold', color: '#f5f5f5db' }} />


                        {/* Email input */}
                        <Input h={'22%'} borderColor={emailFieldColor} borderRadius={'14px'} onChange={handleDataChange} type='email' name='email' placeholder='Email' focusBorderColor='pink.500' _placeholder={{ fontWeight: 'bold', color: '#f5f5f5db' }} />



                        {/* password */}
                        <InputGroup size='md' h={'22%'}>
                            {/* password input field */}
                            <Input
                                h={''}
                                borderColor={''}
                                onChange={handleDataChange}
                                type={show ? 'text' : 'password'}
                                placeholder='Password' borderRadius={'14px'} focusBorderColor='pink.500'
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
                                onChange={handleDataChange}
                                type={show2 ? 'text' : 'password'}
                                name='password'
                                placeholder='Confirm password'
                                borderRadius={'14px'}
                                focusBorderColor='pink.500'
                                _placeholder={{ fontWeight: 'bold', color: '#f5f5f5db' }} />

                            {/*Confirm password input field icon button */}
                            <InputRightElement width='25%' height='100%'>
                                <Button className='btn' borderRadius='10px' color={show2 ? 'teal.400' : 'pink.400'} h='70%' size='lg' variant='ghost' onClick={handleClick2}>
                                    {show2 ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>

                        </InputGroup>



                        {/* Submit buttom */}
                        <Button
                            color={'whiteAlpha.700'}
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
                                background: 'gray.800',
                                color: 'black',
                                transform: 'translateY(-3px)'
                            }}
                            _active={{ transform: 'scale(0.9)' }}
                            rightIcon={<ArrowForwardIcon color={'white'} />}
                        >
                            <Text color={'whitesmoke'}>Sign up</Text>
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
