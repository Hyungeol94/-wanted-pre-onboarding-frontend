// 회원가입 페이지
import React, { useState } from 'react';
import { Paper } from '@mui/material';
import {useNavigate} from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [isValidPassword, setIsValidPassword] = useState(false)
    const navigate = useNavigate();

    const checkEmail = (email) => {
        if (email.includes('@')){
            console.log('valid')
            return true
            
        }
        console.log('notValid')
        return false
    }

    const checkPassword = (password) => {
        if (8 <= password.length){
            console.log('valid')
            return true
        }
        console.log('notValid')
        return false
    }


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setIsValidEmail(checkEmail(e.target.value))
        console.log('changed')
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setIsValidPassword(checkPassword(e.target.value))
        console.log('changed')
    }

    const handleSignup = (e) => {
        navigate('/signin')
    }

    return (
        <>
            <Paper>
                <div>회원가입하기</div>
                <div>
                    <span>이메일을 입력해 주세요</span>
                    <input data-testid="email-input" onChange = {handleEmailChange} />
                </div>
                <div>
                    <span>비밀번호를 입력해 주세요</span>
                    <input data-testid="password-input" onChange = {handlePasswordChange}/>
                </div>
                <button data-testid="signup-button" 
                        disabled ={!(isValidPassword & isValidEmail)}
                        onClick = {handleSignup}     
                        >회원가입</button>
            </Paper>        
        </>
    )
}

export default SignUp