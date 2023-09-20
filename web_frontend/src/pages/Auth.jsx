import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';


// TODO
import Nav from 'react-bootstrap/Nav';
// TODO for the sign up vs sign in toggle




import { Header } from '../components';


function Auth() {
    const { userId } = useParams();
    const user = null;

    // set user into formData to start for edit forms
    const [formData, setFormData] = useState({});
    const [isSignUp, setIsSignUp] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    console.log(formData);

    return (
        <>
            <Header />
            <Form style={{ margin: '0 10%' }}>
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
                        id="citye"
                        name="city"
                        value={formData.city || ''}
                        placeholder="bahston"
                    />
                </Form.Group>
            </Form>
        </>
    );
}

export default Auth;
