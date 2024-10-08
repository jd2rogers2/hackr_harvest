import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { object, string  } from 'yup';

import { Header } from '../components';
import { UserContext } from '../providers/UserProvider';


const userSchema = object({
    username: string().required(),
    /*
      8 chars long
      Contains at least 1 number
      Contains at least 1 special character
      Contains at least 1 uppercase letter
      Contains at least 1 lowercase letter
    */
    password: string().required().min(8)
        .matches(/[A-Z]+/) // incl upper
        .matches(/[a-z]+/) // incl lower
        // .matches(/[\^\$\*\.\[\]{}()?\-\"!@#%&\/\\,><':;|_~`+=]+"]+/) // incl special char
        // .matches(new RegExp("[\^\$\*\.\[\]{}()?\-\"!@#%&\/\\,><':;|_~`+=]+")) // incl special char
        .matches(/\d+/), // incl number
    email: string().email().required(),
    imageUrl: string().optional(),
    tagline: string().optional(),
    city: string().optional(),
});


function UserForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const authPageKey = location.pathname.includes('signup') ? 'signup' : 'signin';
    const { user, setUser } = useContext(UserContext);

    const [formData, setFormData] = useState(user ? user : {});
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
        const isSignUp = e.target.text === 'Sign Up';
        navigate(`/users/${isSignUp ? 'signup' : 'signin'}`)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await userSchema.validate(formData);
        } catch(e) {
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
            const res = await fetch(`${process.env.REACT_APP_HH_API_URL}/users/${user.id}`, {
                method: 'PATCH',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' },
            });
            if (res.ok) {
                navigate(`/users/${user.id}`);
            }
        } else if (authPageKey === 'signup') {
            const res = await fetch(`${process.env.REACT_APP_HH_API_URL}/users/signup`, {
                method: "POST",
                body: FORMatted,
            });
            if (res.ok) {
                navigate(`/users/verify?email=${formData.email}`);
            } else {
                // display error
            }
        } else {
            const res = await fetch(`${process.env.REACT_APP_HH_API_URL}/users/signin`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            if (res.ok) {
                const { user } = await res.json();
                setUser(user);
                navigate('/home');
            }
        }
    }

    return (
        <>
            <Header />
            {!user && (
                <Nav justify variant="tabs" activeKey={authPageKey}>
                    <Nav.Item>
                      <Nav.Link onClick={handleFormToggle} eventKey="signup">Sign Up</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link onClick={handleFormToggle} eventKey="signin">Sign In</Nav.Link>
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
                {(authPageKey === 'signup' || user) && (
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
                            <label htmlFor="imageUrl">{user?.imageUrl ? 'New ' : ''}imageUrl</label>
                            {user?.imageUrl && (
                                <img
                                    style={{ width: '100px', height: '100px' }}
                                    src={user.imageUrl}
                                    alt="your profile photo"
                                />
                            )}
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
