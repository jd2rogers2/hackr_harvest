import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { Header } from '../components';
import { UserContext } from '../providers/UserProvider';
import { useParams } from 'react-router-dom';


function Profile() {
    const { user: currentUser } = useContext(UserContext);
    const { userId } = useParams();

    const [user, setUser] = useState(null);

    const getUserById = async () => {
        const res = await fetch(`http://${process.env.REACT_APP_HH_API_URL}/users/${userId}`);
        if (res.ok) {
            const { user } = await res.json()
            setUser(user);
        }
    }

    useEffect(() => {
        if (userId) {
            getUserById();
        }
    }, [userId]);

    const isCurrentUser = Number(userId) === currentUser?.id;
    return (
        <>
            <Header />
            <Container>
                <Row>
                    <Col xs={{ span: 4, offset: 1 }}>
                        <img src={user?.imageUrl} alt="this events view" style={{ maxWidth: '100%' }} />
                    </Col>
                    <Col xs={{ span: 6 }}>
                        <p style={{ fontWeight: 700, fontSize: '2em', textAlign: 'center' }}>
                            {user?.username}
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 10, offset: 1 }}>
                        <Stack>
                            {isCurrentUser ? (
                                <p>email: {user?.email}</p>
                            ) : null}
                            <p>city: {user?.city}</p>
                            <p>tag line: {user?.tagline}</p>
                            <p>joined: {user?.createdAt}</p>
                        </Stack>
                    </Col>
                </Row>
                {isCurrentUser ? (
                    <Row>
                        <Col xs={{ span: 12 }} style={{ textAlign: 'center' }}>
                            <Button type="primary">Edit Profile</Button>
                        </Col>
                    </Row>
                ) : null}
            </Container>
        </>
    );
}

export default Profile;
