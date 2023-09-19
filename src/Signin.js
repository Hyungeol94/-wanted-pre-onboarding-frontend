// 로그인 페이지
import React, { useState } from 'react';
import { Paper } from '@mui/material';
import {useNavigate} from 'react-router-dom';

const SignIn = () => {
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

    const handleSignIn = async () => {
        try {
          // 로그인 API 호출 및 응답 받기
          const response = await fetch('https://www.pre-onboarding-selection-task.shop/auth/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password }),
          });
    
          if (response.ok) {
            // 로그인이 성공한 경우
            const data = await response.json();
            // JWT를 로컬 스토리지에 저장
            localStorage.setItem('jwt', data.body);
            // 로그인 성공 시
            navigate('/todo');
          } else {
            // 로그인이 실패한 경우
            console.error('로그인 실패');
            const responseBody = await response.text();
            console.error('Response Body:', responseBody);
          }
        } catch (error) {
          console.error('오류 발생:', error);
        }
      };
    

    return (
        <>
            <Paper>
                <div>로그인하기</div>
                <div>
                    <span>이메일을 입력해 주세요</span>
                    <input data-testid="email-input" onChange = {handleEmailChange} />
                </div>
                <div>
                    <span>비밀번호를 입력해 주세요</span>
                    <input data-testid="password-input" onChange = {handlePasswordChange}/>
                </div>
                <button data-testid="signin-button" 
                        disabled ={!(isValidPassword & isValidEmail)}
                        onClick = {handleSignIn}     
                        >로그인</button>
            </Paper>        
        </>
    )
}

export default SignIn