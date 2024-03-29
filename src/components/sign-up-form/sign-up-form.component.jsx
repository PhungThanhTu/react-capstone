import { useState } from "react";
import { createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";
import FormInput from '../form-input/form-input.component'
import './sign-up-form.style.scss';
import Button from '../button/button.component';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () =>
{
    const [formFields, setFormFields] = useState(defaultFormFields);
    

    const {
        displayName, email, password, confirmPassword
    } = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword)
        {
            alert("passwords do not match");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            await createUserDocumentFromAuth(
                user,
                {
                    displayName
                }
            );
            
        }
        catch (err)
        {
            console.log("user creaton encountered an error");
            console.log(err);
            if(err.code === 'auth/email-already-in-use'){
                alert('cannot create user, email already in use');
            }
            else {
                console.log(err)
            }
        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({
            ...formFields,
            [name]: value
        });
    };

    return(<div className='sign-up-container'>
        <h2>Don't have an account</h2>
        <span>
            Sign Up with your email and password
        </span>
        <form 
            onSubmit={handleSubmit}>
            <FormInput 
                label="Display Name"
                name="displayName" 
                type="text" 
                required 
                onChange={handleChange}
                value={displayName}/>
            <FormInput
                label="Email"
                name="email" 
                type="email" 
                required 
                onChange={handleChange}
                value={email}
            />
            <FormInput 
                label="Password"
                name="password" 
                type="password" 
                required 
                onChange={handleChange}
                value={password}
            />
            <FormInput 
                label="Confirm password"
                name="confirmPassword" 
                type="password" 
                required 
                onChange={handleChange}
                value={confirmPassword}
            />
            <Button 
            buttonType='default'
            type="submit">Sign Up</Button>
        </form>
    </div>)
}

export default SignUpForm;