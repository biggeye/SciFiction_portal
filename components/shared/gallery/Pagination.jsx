import React from "react";
import { chakra, Flex, Icon, Wrap, WrapItem } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const PagButton = (props) => {
  const activeStyle = {
    bg: "brand.600",
    _dark: { bg: "brand.500" },
    color: "white",
  };

  // Destructure the active prop from props
  const { active, ...restProps } = props;

  return (
    <chakra.button
      px={4}
      py={2}
      rounded="md"
      bg="white"
      _dark={{ bg: "gray.800" }}
      color="gray.700"
      opacity={props.disabled && 0.6}
      _hover={!props.disabled && activeStyle}
      cursor={props.disabled && "not-allowed"}
      {...(active && activeStyle)}
      display={props.p && !active && { base: "none", sm: "block" }}
      {...restProps}  // Spread the rest of the props
    >
      {props.children}
    </chakra.button>
  );
};

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Flex
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      p={5}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <PagButton
        mr={5}
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <Icon
          as={IoIosArrowBack}
          color="gray.700"
          _dark={{ color: "gray.200" }}
          boxSize={6}
        />
      </PagButton>

      <Wrap>
        {pageNumbers.map((number) => (
          <WrapItem key={number}>
            <PagButton
              active={currentPage === number - 1}
              onClick={() => onPageChange(number - 1)}
            >
              {number}
            </PagButton>
          </WrapItem>
        ))}
      </Wrap>
      <PagButton
        ml={5}
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <Icon
          as={IoIosArrowForward}
          color="gray.700"
          _dark={{ color: "gray.200" }}
          boxSize={6}
        />
      </PagButton>
    </Flex>
  );
}
