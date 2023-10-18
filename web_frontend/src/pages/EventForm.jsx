import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Header } from '../components';
import { UserContext } from '../providers/UserProvider';


function EventForm() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    if (user?.role !== "admin") {
        navigate('/home');
    }

    const [formData, setFormData] = useState({});

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.name === 'imageUrl' ? e.target.files[0] : e.target.value,
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const FORMatted = new FormData();
        for (let key in formData) {
            if (key === 'imageUrl') {
                FORMatted.append('file', formData[key]);
            } else {
                FORMatted.append(key, formData[key]);
            }
        }

        const res = await fetch(`http://${process.env.REACT_APP_HH_API_URL}/events`, {
            method: "POST",
            body: FORMatted,
            credentials: 'include',
        });
        const { event } = await res.json();
        navigate(`/events/${event.id}`);
    }

    return (
        <>
            <Header />
            <Form onSubmit={handleFormSubmit} style={{ margin: '20px 10%' }}>
                <Form.Group className="mb-3">
                    <Form.Label>name</Form.Label>
                    <Form.Control
                        onChange={handleInputChange}
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name || ''}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>attendee limit</Form.Label>
                    <Form.Control
                        onChange={handleInputChange}
                        type="number"
                        id="attendeeLimit"
                        name="attendeeLimit"
                        value={formData.attendeeLimit || ''}
                        placeholder="20"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>location</Form.Label>
                    <Form.Control
                        onChange={handleInputChange}
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location || ''}
                        placeholder="on the lines"
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
                <label htmlFor="startTime">startTime</label>
                <input
                    type="datetime-local"
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    min="2023-09-21T00:00"
                    max="2030-02-24T00:00"
                    onChange={handleInputChange}
                />
                <label htmlFor="endTime">endTime</label>
                <input
                    type="datetime-local"
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    min={formData.startTime}
                    max="2030-02-24T00:00"
                    onChange={handleInputChange}
                />
                <Form.Group className="mb-3">
                    <Form.Label>description</Form.Label>
                    <Form.Control
                        onChange={handleInputChange}
                        type="textarea"
                        id="description"
                        name="description"
                        value={formData.description || ''}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default EventForm;
