import React, { useState, useEffect } from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: string;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      api
        .get('/transactions')
        .then(response => {
          const {
            transactions: transactionsApi,
            balance: balanceApi,
          } = response.data;

          setTransactions(transactionsApi);
          setBalance(balanceApi);
        })
        .catch(error => {
          // eslint-disable-next-line no-console

          setTransactions([
            {
              id: '1',
              title: 'Sem dados',
              value: 0,
              formattedValue: '',
              formattedDate: '',
              type: 'income',
              category: { title: 'Sem dados' },
              // eslint-disable-next-line @typescript-eslint/camelcase
              created_at: 'Sem dados',
            },
          ]);

          setBalance({
            income: 'Sem dados',
            outcome: 'Sem dados',
            total: 'Sem dados',
          });

          // eslint-disable-next-line no-console
          console.error(error);
        });
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header line="list" />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">
              €
              {
                // eslint-disable-next-line react/jsx-one-expression-per-line
                formatValue(parseFloat(balance.income))
              }
            </h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">
              €
              {
                // eslint-disable-next-line react/jsx-one-expression-per-line
                formatValue(parseFloat(balance.outcome))
              }
            </h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">
              €
              {
                // eslint-disable-next-line react/jsx-one-expression-per-line
                formatValue(parseFloat(balance.total))
              }
            </h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(transaction =>
                transaction.type === 'income' ? (
                  <tr key={transaction.id}>
                    <td className="title">{transaction.title}</td>
                    <td className="income">
                      €
                      {
                        // eslint-disable-next-line react/jsx-one-expression-per-line
                        transaction.value
                      }
                    </td>
                    <td>{transaction.category.title}</td>
                    <td>{transaction.created_at.split('T')[0]}</td>
                  </tr>
                ) : (
                  <tr key={transaction.id}>
                    <td className="title">{transaction.title}</td>
                    <td className="outcome">
                      - €
                      {
                        // eslint-disable-next-line react/jsx-one-expression-per-line
                        transaction.value
                      }
                    </td>
                    <td>{transaction.category.title}</td>
                    <td>{transaction.created_at.split('T')[0]}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
