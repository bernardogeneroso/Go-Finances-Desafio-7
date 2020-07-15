import styled, { css } from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large';
  line: 'list' | 'import';
}

export const Container = styled.div<ContainerProps>`
  background: #5636d3;
  padding: 30px 0;

  header {
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      a {
        color: #fff;
        text-decoration: none;
        font-size: 16px;
        transition: opacity 0.2s;

        & + a {
          margin-left: 32px;
        }

        &:hover {
          opacity: 0.6;
        }

        ${({ line }) =>
          line === 'list'
            ? css`
                &:nth-child(1) {
                  border-bottom: 2px solid #ff872c;
                }
              `
            : css`
                &:nth-child(2) {
                  border-bottom: 2px solid #ff872c;
                }
              `}

        padding: 0 0 10px;
      }
    }

    @media only screen and (max-width: 600px) {
      img {
        width: 150px;
      }

      nav {
        a {
          & + a {
            margin-left: 12px;
          }
        }
      }
    }
  }
`;
