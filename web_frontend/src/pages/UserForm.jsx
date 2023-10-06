import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { object, string  } from 'yup';

import { Header } from '../components';


const userSchema = object({
    username: string().required(),
    password: string().required().min(8)
        .matches(/[A-Z]+/) // incl upper
        .matches(/[a-z]+/) // incl lower
        // .matches(new RegExp("[\^\$\*\.\[\]{}()?\-\"!@#%&\/\\,><':;|_~`+=]+")) // incl special char
        .matches(/\d+/), // incl number
    email: string().email().required(),
    imageUrl: string().optional(),
    tagline: string().optional(),
    city: string().optional(),
});


function UserForm() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const user = null;

    // set user into formData to start for edit forms
    const [formData, setFormData] = useState({});
    const [toggleKey, setToggleKey] = useState('Sign Up');
    const [passwordError, setPasswordError] = useState(false);

    const handleInputChange = async (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.name === 'imageUrl' ? e.target.files[0] : e.target.value,
        });

        if (e.target.name === 'password') {
            try {
                await userSchema.validate(formData);
                setPasswordError(false);
            } catch {}
        }
    }

    const handleFormToggle = (e) => {
        setToggleKey(e.target.text);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await userSchema.validate(formData);
        } catch(e) {
            console.log(formData)
            console.log(e)
            if (e.message.includes('password')) {
                setPasswordError(true);
                return;
            }
        }

        const FORMatted = new FormData();
        for (let key in formData) {
            if (key === 'imageUrl') {
                FORMatted.append('file', formData[key]);
            } else {
                FORMatted.append(key, formData[key]);
            }
        }

        if (user) {
            // patch request
            navigate(`/users/${userId}`);
        } else if (toggleKey === 'Sign Up') {
            const res = await fetch(`http://${process.env.REACT_APP_HH_API_URL}/users/signUp`, {
                method: "POST",
                body: FORMatted,
            });
            if (res.ok) {
                // pop modal for "check your email"
            } else {
                // display error
            }
        } else {
            // Sign In post req
            navigate('/home');
        }
    }

    return (
        <>
            <Header />
            {!user && (
                <Nav justify variant="tabs" activeKey={toggleKey}>
                    <Nav.Item>
                      <Nav.Link onClick={handleFormToggle} eventKey="Sign Up">Sign Up</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link onClick={handleFormToggle} eventKey="Sign In">Sign In</Nav.Link>
                    </Nav.Item>
                </Nav>
            )}
            <Form onSubmit={handleFormSubmit} style={{ margin: '20px 10%' }}>
                <Form.Group className="mb-3">
                    <Form.Label>email*</Form.Label>
                    <Form.Control
                        onChange={handleInputChange}
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email || ''}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>password*</Form.Label>
                    <Form.Control
                        onChange={handleInputChange}
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password || ''}
                        placeholder="better be a good one"
                    />
                    {passwordError && (
                        <Form.Text className="text-muted">
                            {"Password must be 8 chars long with: one upper case, one lowercase, one digit, and one special character (^$*.[]{}()?-\"!@#%&/\\,><':;|_~`+=)"}
                        </Form.Text>
                    )}
                </Form.Group>
                {(toggleKey === 'Sign Up' || user) && (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>username*</Form.Label>
                            <Form.Control
                                onChange={handleInputChange}
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username || ''}
                                placeholder="your display name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <label htmlFor="imageUrl">imageUrl</label>
                            <input
                                type="file"
                                id="imageUrl"
                                name="imageUrl"
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>tagline</Form.Label>
                            <Form.Control
                                onChange={handleInputChange}
                                type="text"
                                id="tagline"
                                name="tagline"
                                value={formData.tagline || ''}
                                placeholder="bootcamp grad ready to build a killer portfolio"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>city</Form.Label>
                            <Form.Control
                                onChange={handleInputChange}
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city || ''}
                                placeholder="bahston"
                            />
                        </Form.Group>
                    </>                 
                )}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default UserForm;
