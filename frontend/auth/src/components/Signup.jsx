import React, {useEffect, useState } from 'react'
import { Box, Button, Flex, Input, Text} from "@chakra-ui/react"

import '../styles/signup.css'
import {useNavigate } from 'react-router-dom'

export default function Signup() {

    const Navigate = useNavigate()

    const [toggleBtn, setToggleBtn] = useState(true)
    const [passFieldColor, setPassFieldColor] = useState('')
    const [emailFieldColor, setEmailFieldColor] = useState('')
    const [phoneFieldColor, setPhoneFieldColor] = useState('')

    const [inputData, setInputData] = useState({
        fname:'',
        lname:'',
        email:'',
        phone:'',
        pass:'',
        confpass:''
    })

    const handleDataChange = (e) => {
        setInputData(prevData =>{
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
        const pass = inputData.pass
        const confpass = inputData.confpass
        const phone = inputData.phone

        const passMatched = pass===confpass
        const validEmail =  inputData.email==='' || isValidEmail(inputData.email)
        const validPhone = phone ==='' || phone.length === 10

        if(validEmail){
            setToggleBtn(false)
            setEmailFieldColor('')
        }else{
            setToggleBtn(true)
            setEmailFieldColor('red')
        }

        if(passMatched){
            setToggleBtn(false)
            setPassFieldColor('')
        }else{
            setToggleBtn(true)
            setPassFieldColor('red')
        }

        if(validPhone){
            setToggleBtn(false)
            setPhoneFieldColor('')
        }else{
            setToggleBtn(true)
            setPhoneFieldColor('red')
        }
    }, [inputData])
    
    

  return (
    <Flex id='signupContainer'
        pt={'3%'}
    >
        <Box
            m={'auto'}
            w={'88%'}
            h={'90%'}
            border={'0.2rem solid white'}
            padding={'2rem 1.2rem'}
            mb={'1rem'}
            borderRadius={'6px'}
        >
            <Box
                color={'#FFFFFF'}
                fontSize={'2rem'}
                fontWeight={'bold'}
                textAlign={'center'}
                mt={'0.5rem'}
            >
                Signup To Get Exciting Deals
            </Box>

            <Box
                color={'#5c5d64'}
                fontSize={'1.2rem'}
                textAlign={'center'}
                display={'flex'}
                justifyContent={'center'}
            >
                <Text w={'50%'}>Need to buy or sell? Signup now for all the benefits.</Text>
            </Box>

            <Flex
                mt={['2rem','5rem']}
                gap={['0','8%']}
                justifyContent={'center'}
                flexWrap={'wrap'}
            >
                
                <Flex
                    flexDir={'column'}
                >
                    <Text className='signup-page-input-text'>First Name:</Text>
                    <Input autoFocus={true} name='fname' backgroundColor={'#222222'}  focusBorderColor='none' className='signup-page-input-field' placeholder='Sam'
                        onChange={handleDataChange}
                    />

                    <Text className='signup-page-input-text'>Last Name:</Text>
                    <Input name='lname' backgroundColor={'#222222'} focusBorderColor='none' className='signup-page-input-field' placeholder='Marcus'
                        onChange={handleDataChange}
                    />

                    <Text className='signup-page-input-text'>Email Id:</Text>
                    <Input name='email' backgroundColor={'#222222'} focusBorderColor='none' className='signup-page-input-field' placeholder='samito@gmail.com'
                        borderColor={emailFieldColor}
                        onChange={handleDataChange}
                    />
                    
                    {/* <Button isDisabled={toggleBtn} className='signup-for-free' _hover={'none'}>Signup for Free -{'>'}</Button> */}
                </Flex>
              

                
                <Flex
                    flexDir={'column'}
                >
                    <Text className='signup-page-input-text'>Phone Number:</Text>
                    <Input name='phone' backgroundColor={'#222222'} focusBorderColor='none' type='number' className='signup-page-input-field' placeholder='1234567890'
                        onChange={handleDataChange}
                        borderColor={phoneFieldColor}
                    />
                    
                    <Text className='signup-page-input-text'>Password:</Text>
                    <Input name='pass' backgroundColor={'#222222'} focusBorderColor='none' type='password' className='signup-page-input-field' placeholder='Password'
                        onChange={handleDataChange}
                    />

                    <Text className='signup-page-input-text'>Confirm Passowrd:</Text>
                    <Input name='confpass' backgroundColor={'#222222'} focusBorderColor='none' type='password' className='signup-page-input-field' placeholder='Confirm Passowrd'
                        borderColor={passFieldColor}
                        onChange={handleDataChange}
                    />

                </Flex>
            

                <Flex
                    // bg={'gray'}
                    color={'#FFFFFF'}
                    fontSize={'1.8rem'}
                    textAlign={'center'}
                    justifyContent={'center'}
                    margin={'auto 0'}
                    mb={['7%']}
                    mt={[0,0,'7%']}
                    flexBasis={['100%','100%','100%','100%','auto']}
                >
                    /
                </Flex>
                    
                <Flex
                    flexDir={'column'}
                    justifyContent={'center'}
                    gap={'3rem'}
                    
                >
                    <Button className="border-gradient border-gradient-1" _hover={'none'}
                    >Signup using Google</Button>

                    <Button className="border-gradient border-gradient-2" _hover={'none'}
                        onClick={()=>Navigate('/login')}
                    >Already have an account? Login</Button>
                </Flex>
                
            </Flex>
            <Flex>

                <Button m={'auto'} mt={'3rem'} isDisabled={toggleBtn} className='signup-for-free' _hover={'none'}>Signup for Free -{'>'}</Button>
            </Flex>
        </Box>
    </Flex>
  )
}
