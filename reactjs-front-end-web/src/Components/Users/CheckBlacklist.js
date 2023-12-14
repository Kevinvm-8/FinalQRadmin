import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

const CheckListContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 100000px;
  margin: 140px auto;
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHead = styled.thead`
  background-color: #007bff;
  color: #fff;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: center;
  word-break: break-all;
`;

const ActionButton = styled.button`
  background-color: ${(props) => (props.danger ? '#dc3545' : '#007bff')};
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 5px;

  &:hover {
    background-color: ${(props) => (props.danger ? '#bd2130' : '#0056b3')};
  }
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  margin-right: 10px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 10px;
`;

const PaginationButton = styled.button`
  cursor: pointer;
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #007bff;
  border-radius: 5px;
  color: #007bff;
  background-color: #fff;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;

const SpacingContainer = styled.div`
  margin-bottom: 50px;
`;

const ActivePaginationButton = styled(PaginationButton)`
  background-color: #007bff;
  color: #fff;
`;

//api PORT DELETE
const API_BASE_URL_BLACKLIST = '/api/url-blacklist';
//api GET
const API_GET_URL_BLACKLIST = '/api/black-url-list';

const CheckBlacklist = () => {
  const [urlList, setUrlList] = useState([]);
  const [newUrl, setNewUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 20;
  const pageCount = Math.ceil(urlList.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUrlList = urlList.slice(startIndex, endIndex);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(API_GET_URL_BLACKLIST);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setUrlList(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddUrl = async () => {
    if (newUrl) {
      const urlRegex = /^(https?:\/\/)([\w\d.-]+)\.([a-z]{2,})([\/\w\d.-]*)*\/?$/;
      if (!urlRegex.test(newUrl)) {
        setErrorMessage('Fail format url: "https://example.com" or "http://example.com"');
        return;
      }

      try {
        const requestBody = {
          url: newUrl,
        };

        const response = await fetch(API_BASE_URL_BLACKLIST, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error(`Failed to add URL: ${response.statusText}`);
        }

        setNewUrl('');
        setErrorMessage('');
        fetchData();
      } catch (error) {
        console.error('Error adding URL:', error.message);
      }
    }
  };

  const handleDeleteUrl = async (id) => {
    try {
      const apiUrl = `${API_BASE_URL_BLACKLIST}/${id}`;

      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete URL: ${response.statusText}`);
      }

      setUrlList((prevUrlList) => prevUrlList.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting URL:', error.message);
      setErrorMessage(`Error: ${error.message}`);
    }
  };


  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
      <CheckListContainer>
        <Title>Check Blacklist</Title>
        <div>
          <Input
              type="text"
              placeholder="Add URL"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
          />
          <ActionButton onClick={handleAddUrl}>Add</ActionButton>
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <Table>
          <TableHead>
            <tr>
              <th style={{ width: '50%', textAlign: 'center' }}>URL</th>
              <th style={{ width: '30%', textAlign: 'center' }}>Status</th>
              <th style={{ width: '20%', textAlign: 'center' }}>Actions</th>
            </tr>
          </TableHead>
          <tbody>
          {currentUrlList.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.urlB}</TableCell>
                <TableCell>
                  <span style={{ color: 'red' }}>Blacklist</span>
                </TableCell>
                <TableCell>
                  <ActionButton danger onClick={() => handleDeleteUrl(item.id)}>
                    Delete
                  </ActionButton>
                </TableCell>
              </TableRow>
          ))}
          </tbody>
        </Table>
        <SpacingContainer />
        <PaginationContainer>
          <ReactPaginate
              previousLabel={<PaginationButton>Previous</PaginationButton>}
              nextLabel={<PaginationButton>Next</PaginationButton>}
              breakLabel={'...'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
              previousClassName={'previous'}
              nextClassName={'next'}
              previousLinkClassName={'previous'}
              nextLinkClassName={'next'}
          />
        </PaginationContainer>
      </CheckListContainer>
  );
};

export default CheckBlacklist;
