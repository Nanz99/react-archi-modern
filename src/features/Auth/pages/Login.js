import React from 'react'
import { Row, Col, Button, Typography } from 'antd'
import firebase, { auth} from '../../../firebase/config'
import { addDocument } from './../../firebase/services'
const { Title } = Typography

const googleProvider = new firebase.auth.GoogleAuthProvider()
const githubProvider = new firebase.auth.GithubAuthProvider()

export default function Login() {
   const handleFbLogin = () => {
      auth.signInWithPopup(fbProvider)
   }
   const handleGoogleLogin = async () => {
      const { additionalUserInfo, user } = await auth.signInWithPopup(googleProvider)
      console.log({user})
      if (additionalUserInfo?.isNewUser) {
         addDocument('users', {
           displayName: user.displayName,
           email: user.email,
           photoURL: user.photoURL,
           uid: user.uid,
           providerId: additionalUserInfo.providerId,
           
         });
       }
   }
   const handleGithubLogin = async () => {
      const data = await auth.signInWithPopup(githubProvider)
      console.log({ data })
   }

   return (
      <div>
         <Row justify='center' style={{ height: 800 }}>
            <Col span={8}>
               <Title style={{ textAlign: 'center' }} level={3}>
                  Chat App
               </Title>
               <Button
                  onClick={handleGoogleLogin}
                  style={{ width: '100%', marginBottom: 5 }}>
                  Login With Google
               </Button>
               <Button
                  onClick={handleGithubLogin}
                  style={{ width: '100%', marginBottom: 5 }}>
                  Login With Github
               </Button>
               <Button
                  onClick={handleFbLogin}
                  style={{ width: '100%', marginBottom: 5 }}>
                  Login With Facebook
               </Button>
            </Col>
         </Row>
      </div>
   )
}
