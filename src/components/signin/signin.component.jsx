import React from 'react'

import './signin.styles.scss'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { auth, signInWithGoogle } from '../../firebase/firebase.utils'


class SignIn extends React.Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        // get the current value of the email and password input tags
        const {email, password} = this.state

        try {
            await auth.signInWithEmailAndPassword(email, password)


            // IF all that Sign IN succeeds then we need to clear the input values
            this.setState({ email: '', password: ''})
        } catch (error) {
            console.log("err: ", error)
        }
    }


    handleChange = (e) => {
        const { value, name } = e.target

        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        name='email'
                        onChange={this.handleChange}
                        value={this.state.email}
                        label="email"
                        required
                    />
                    {/* <label>Email</label> */}
                    <FormInput
                        type="password"
                        name='password'
                        value={this.state.password}
                        required
                        onChange={this.handleChange}
                        label="password"
                     />
                    {/* <label>Password</label> */}

                    <div className='buttons'>
                        <CustomButton type="submit">SIGN IN</CustomButton>
                        {/* added Google SIgn in  */}
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            SIGN IN WITH GOOGLE
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn


// const userReducer = (state, action) => {
//     switch(action.type) {
//         case 'SET_CURRENT_USER':
//             return state.currentUser = action.payload
//         default:
//             return state
//     }
// }