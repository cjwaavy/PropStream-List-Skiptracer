"use client";
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Container, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link, Checkbox } from '@mui/material';
import Papa from 'papaparse';
import { getStateAbbreviation } from '../utils/stateAbbreviations';

const GenerateLinks = () => {
  const [data, setData] = useState([]);
  const [marked, setMarked] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          setData(result.data);
          setMarked([]);
           // Save parsed data in localStorage
          localStorage.setItem('parsedCSVData', JSON.stringify(result.data));
        },
        header: true,
      });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(data.length / pageSize);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          className='mx-1'
          key={i}
          onClick={() => handlePageChange(i)}
          variant={currentPage === i ? "contained" : "outlined"}
        >
          {i}
        </Button>
      );
    }
    return <div className='pt-10'>{pages}</div>;
  };

  const generateNameSearchLink = (firstName, lastName, state, city) => {
    if(!city){
      city = "unknown"
    }
    if(!state){
      state = "unknown"
    }
    if(!lastName){
      lastName = "unknown"
    }
    if(!firstName){
      firstName = "unknown"
    }
    
    const formattedCity = city.replace(/ /g, '-').toLowerCase();
    return `https://www.cyberbackgroundchecks.com/people/${firstName}-${lastName}/${state}/${formattedCity}`;
  }
  const generateAddressLink = (address, state, city) => {
    if(!city){
      city = "unknown"
    }
    if(!state){
      state = "unknown"
    }
    const formattedCity = city.replace(/ /g, '-').toLowerCase();
    const formattedAddress = address.replace(/ /g, '-').toLowerCase();
    return `https://www.cyberbackgroundchecks.com/address/${formattedAddress}/${formattedCity}/${state}`;
  }

  const handleStrikethroughChange = (event, row, index) => {
    console.log(index)
    if(event.target.checked){
      setMarked([...marked, index])
      console.log("set marked to")
      console.log(marked)
    }
    else{
      setMarked(marked.filter((item) => item !== index))
      console.log("set marked to" + marked)
    }
    localStorage.setItem('marked', JSON.stringify(marked))
  }
  
  const renderData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = data.slice(startIndex, endIndex);
    return currentData.map((row, index) => {
      const { firstName, lastName, address, city, state } = row;
      // const addressLink = generateAddressLink(address, state, city);
      // const nameSearchLink = generateNameSearchLink(firstName, lastName, state, city);
      return (
        <TableRow className={` ${marked.includes(index) ? "bg-yellow-500" : ""}`} key={index}>
          <TableCell>
            <Checkbox
              checked={row['Strikethrough']}
              onChange={(event) => handleStrikethroughChange(event, row, index)}
            />
          </TableCell>
          <TableCell>
            <Link href={generateNameSearchLink(row['Owner 1 First Name'], row['Owner 1 Last Name'], row['State'], row['City'])} target="_blank">
            {`Cyber Name Search Link`}
            </Link>
          </TableCell>
          <TableCell>
            {console.log(row)}
            <Link href={generateAddressLink(row['Address'], row['State'], row['City'])} target="_blank">
            {`Cyber Address Search Link`}
            </Link>
          </TableCell>
          {Object.values(row).map((value, idx) => (
            <TableCell key={idx}>{value}</TableCell>
          ))}
        </TableRow>
      );
    });
  };
  useEffect(() => {
    const parsedCSVData = localStorage.getItem('parsedCSVData');
    const marked = localStorage.getItem('marked');
    if(parsedCSVData != undefined){
      setData(JSON.parse(parsedCSVData));
    }
    if(marked != undefined){
      setMarked(JSON.parse(marked));
    }
  }, [])
  return (
    <Container>
      <Head>
        <title>Generate Links from CSV</title>
        <meta name="description" content="Upload CSV and generate links" />
      </Head>
      <input
        accept=".csv"
        style={{ display: 'none' }}
        id="upload-csv"
        type="file"
        onChange={handleFileUpload}
      />
      <label htmlFor="upload-csv">
        <Button variant="contained" component="span">
          Upload CSV
        </Button>
      </label>
      {renderPagination()}
      {data.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: 20 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Name Search Link</TableCell>
                <TableCell>Address Search Link</TableCell>
                {Object.keys(data[0]).map((key) => (
                  <TableCell key={key}>{key}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {renderData()}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {renderPagination()}
    </Container>
  );
};

export default GenerateLinks;
