import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { string  } from 'yup';

import { Header } from '../components';


const pwSchema = string().required().min(8)
        .matches(/[A-Z]+/) // incl upper
        .matches(/[a-z]+/) // incl lower
        // .matches(new RegExp("[\^\$\*\.\[\]{}()?\-\"!@#%&\/\\,><':;|_~`+=]+")) // incl special char
        .matches(/\d+/); // incl number


function ResetPassword() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const user = null;

    const [newPassword, setNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const handleInputChange = async (e) => {
        setNewPassword(e.target.value);

        try {
            await pwSchema.validate(e.target.value);
            setPasswordError(false);
        } catch {}
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await pwSchema.validate(newPassword);
        } catch(e) {
            if (e.message.includes('password')) {
                setPasswordError(true);
                return;
            }
        }

        const res = await fetch(
            `http://${process.env.REACT_APP_HH_API_URL}/users/${user.id}/reset`,
            {
                method: "POST",
                body: newPassword,
            },
        );
        if (res.ok) {
            // pop modal for 
        } else {
            // display error
        }
    }

    return (
        <>
            <Header />
            <Form onSubmit={handleFormSubmit} style={{ margin: '20px 10%' }}>
                <Form.Group className="mb-3">
                    <Form.Label>new password*</Form.Label>
                    <Form.Control
                        onChange={handleInputChange}
                        type="password"
                        id="password"
                        name="password"
                        value={newPassword}
                        placeholder="better be a good one"
                    />
                    {passwordError && (
                        <Form.Text className="text-muted">
                            {"Password must be 8 chars long with: one upper case, one lowercase, one digit, and one special character (^$*.[]{}()?-\"!@#%&/\\,><':;|_~`+=)"}
                        </Form.Text>
                    )}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default ResetPassword;
