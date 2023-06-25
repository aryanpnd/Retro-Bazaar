import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import React, {useState } from 'react'
import { useNavigate } from 'react-router-dom'

import '../styles/login.css'

export default function Login() {

    const Navigate = useNavigate()

    const [toggleBtn, setToggleBtn] = useState(false)
    const [emailFieldColor, setEmailFieldColor] = useState('')

    const [inputData, setInputData] = useState({
        email:'',
        password:'',
    })

    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleDataChange = (e) => {
        if(e.target.name==='email'){
            const validEmail =  inputData.email==='' || isValidEmail(inputData.email)
            if(validEmail){
                setToggleBtn(false)
                setEmailFieldColor('')
            }else{
                setToggleBtn(true)
                setEmailFieldColor('red')
            }
            }
        setInputData(prevData =>{
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }


  return (
    <Flex id='signupContainer'
        pt={'3%'}
    >
        <Box
            className='container-margin'
            m={'auto'}
            w={'88%'}
            h={'90%'}
            border={'0.2rem solid white'}
            padding={'1rem 1.2rem 0 1.2rem'}
            mb={'1rem'}
            // borderRadius={'6px'}
        >
            <Box
                color={'#FFFFFF'}
                fontSize={'2rem'}
                fontWeight={'bold'}
                textAlign={'center'}
                mt={'0.5rem'}
            >
                Login to Your Account
            </Box>

            <Box
                color={'#5c5d64'}
                fontSize={'1.2rem'}
                textAlign={'center'}
                display={'flex'}
                justifyContent={'center'}
            >
                <Text w={'50%'}>Login to continue your purchase or sell your product.</Text>
            </Box>

            <Flex
                mt={['2rem','5rem','10%']}
                mb={['10%']}
                gap={['0','8%']}
                justifyContent={'center'}
                flexWrap={'wrap'}
            >
                <Flex
                    flexDir={'column'}
                >
                    <Text className='signin-page-input-text'>Enter Email:</Text>
                    <Input autoFocus={true} borderColor={emailFieldColor} onChange={handleDataChange} type='email' name='email' backgroundColor={'#222222'}  focusBorderColor='none' className='signin-page-input-field' placeholder='samito@gmail.com'/>
                    
                    <Text className='signin-page-input-text'>Enter Password:</Text>
                    <Input onChange={handleDataChange} type='password' name='password' backgroundColor={'#222222'}  focusBorderColor='none' className='signin-page-input-field' placeholder='Password'/>
                    
                    <Text className='forgotPassword'
                        color={'white'}
                        fontSize={'1rem'}
                        textDecor={'underline'}
                        mb={['1.2rem']}
                    >
                        Forgot Password?
                    </Text>
                </Flex>

                <Flex 
                    mt={'auto'}
                    mb={'auto'}
                    color={'white'}
                    fontSize={'1.5rem'}
                    display={['none','none','block']}
                    justifyContent={'center'}
                >
                    {'->'}
                </Flex>

                <Flex
                    flexDir={['column-reverse','column-reverse','column']}
                    justifyContent={'center'}
                    gap={'3rem'}
                    
                >
                    <Button className="border-gradient border-gradient-1" _hover={'none'}
                        onClick={()=>Navigate('/signup')}
                        fontSize={['0.8rem','1rem']}
                    >Don't have an account? Signup insted</Button>

                    <Button className="border-gradient border-gradient-2" _hover={'none'}
                    >Login using Google</Button>

                    <Button className='signin-btn' _hover={'none'}
                        mb={[0,0,'2rem']}
                        isDisabled={toggleBtn}
                    >Login</Button>
                </Flex>
            </Flex>
            
            
        </Box>
    </Flex>
  )
}
