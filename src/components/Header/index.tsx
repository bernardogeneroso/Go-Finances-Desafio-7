import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
  line: 'list' | 'import';
}

const Header: React.FC<HeaderProps> = ({
  size = 'large',
  line,
}: HeaderProps) => (
  <Container size={size} line={line}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        <Link to="/" className="activeHeader">
          Listagem
        </Link>
        <Link to="/import" className="activeHeader">
          Importar
        </Link>
      </nav>
    </header>
  </Container>
);

export default Header;
