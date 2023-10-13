import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Header } from '../components';


function VerifyEmail() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [formData, setFormData] = useState({ email: searchParams.get('email') || '' });

    const handleInputChange = async (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(
            `http://${process.env.REACT_APP_HH_API_URL}/users/verify`,
            {
                method: "POST",
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' },
            },
        );
        if (res.ok) {
            navigate('/users/signin');
        } else {
            // display error
        }
    }

    return (
        <>
            <Header />
            <Form onSubmit={handleFormSubmit} style={{ margin: '20px 10%' }}>
                <Form.Group className="mb-3">
                    <Form.Label>email*</Form.Label>
                    <Form.Control
                        onChange={handleInputChange}
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        placeholder="enter your email"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>verification code*</Form.Label>
                    <Form.Control
                        onChange={handleInputChange}
                        type="text"
                        id="verifyCode"
                        name="verifyCode"
                        value={formData.verifyCode}
                        placeholder="from the email you received"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default VerifyEmail;
