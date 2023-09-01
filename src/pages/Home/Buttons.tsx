import { Link } from 'react-router-dom';

export function Buttons() {
    return <div>
        <Link to="/edit">
            <button>Novo usuário</button>
        </Link>
    </div>;
}
