import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import { Header } from '../components';


function UserForm() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const user = null;

    // set user into formData to start for edit forms
    const [formData, setFormData] = useState({});
    const [toggleKey, setToggleKey] = useState('Sign Up');

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleFormToggle = (e) => {
        setToggleKey(e.target.text);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (user) {
            // patch request
            navigate(`/users/${userId}`);
        } else if (toggleKey === 'Sign Up') {
            // sign up post req
            // pop modal for "check your email"
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
                    <Form.Label>email</Form.Label>
                    <Form.Control
                        onChange={handleInputChange}
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email || ''}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>password</Form.Label>
                    <Form.Control
                        onChange={handleInputChange}
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password || ''}
                        placeholder="better be a good one"
                    />
                </Form.Group>
                {toggleKey === 'Sign Up' && (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>username</Form.Label>
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
                            <Form.Label>profile image</Form.Label>
                            <Form.Control
                                onChange={handleInputChange}
                                type="text"
                                id="imageUrl"
                                name="imageUrl"
                                value={formData.imageUrl || ''}
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