import * as React from 'react';
import {
  Container,
  Box,
  chakra,
  Flex,
  Divider,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  useColorModeValue
} from '@chakra-ui/react';

const metrics = [
  {
    name: 'Twitter',
    followers: '',
    posts: ''
  },
  {
    name: 'YouTube',
    followers: '',
    posts: '',
  },
  {
    name: 'Facebook',
    followers: '',
    posts: '',
  },
  ];

export default function DashBoard() {

return(
  <Box layerStyle="subPage">
    <Flex justify="left" p={5}>
      <chakra.h3 fontSize="md" fontWeight="bold" textAlign="center">
        Social Media Traffic
      </chakra.h3>
    </Flex>
    <Divider />
    <TableContainer>
      <Table size="md">
        <Thead>
          <Tr fontWeight="900">
            <Th>Network</Th>
            <Th>Followers</Th>
            <Th>Posts</Th>
          </Tr>
        </Thead>
        <Tbody>
          {metrics.map((item, index) => (
            <Tr key={index}>
              <Td fontSize="sm">{item.name}</Td>
              <Td fontSize="sm">{item.followers}</Td>
              <Td fontSize="sm">{item.posts}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  </Box>
)

}