import { useState } from "react";
import { 
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import FormInput from '../form-input/form-input.component'
import './sign-in-form.style.scss';
import Button from '../button/button.component';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () =>
{
    const signInWithGoogle = async () => {
        try {
            const { user } = await signInWithGooglePopup();
            const userDocRef = await createUserDocumentFromAuth(user);
            console.log(userDocRef);
        }
        catch (err)
        {}
    }



    const [formFields, setFormFields] = useState(defaultFormFields);
    const {
         email, password
    } = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
        }
        catch (err)
        {
           console.log(err);
           switch(err.code)
           {
                case 'auth/wrong-password':
                    alert("Incorrect password for email");
                    break;
                case 'auth/user-not-found':
                    alert("no user ");
                    break;
                default:
                    console.log(err);
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
        <h2>Have an account</h2>
        <span>
            Sign In with your email and password
        </span>
        <form 
            onSubmit={handleSubmit}>
            
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
            <div className="buttons-container">
                <Button 
                buttonType='default'
                type="submit">Sign In</Button>
                <Button 
                onClick={signInWithGoogle}
                buttonType='google'
                type='button'>Google Sign In</Button>
            </div>
        </form>
    </div>)
}

export default SignInForm;