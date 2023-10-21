import { useNavigate } from 'react-router-dom';
import Figure from 'react-bootstrap/Figure';


function UserBadge({ user }) {
    const navigate = useNavigate();

    if (!user) { return null; }

    const { id, imageUrl, username } = user;

    const handleClick = () => {
        navigate(`/users/${id}`);
    }

    return (
        <Figure>
            <Figure.Image
                width={60}
                height={60}
                alt={username}
                src={imageUrl || '/logo192.png'}
                onClick={handleClick}
                thumbnail
            />
        </Figure>
    );
}

export default UserBadge;
