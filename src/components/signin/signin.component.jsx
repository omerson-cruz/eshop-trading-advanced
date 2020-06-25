import React from 'react'

import './signin.styles.scss'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { signInWithGoogle } from '../../firebase/firebase.utils'


class SignIn extends React.Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

        this.setState({ email: '', password: ''})

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