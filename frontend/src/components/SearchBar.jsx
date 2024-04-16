import React, {useState} from 'react';
import {Box, HStack} from '@chakra-ui/react';
import DirectoryMounter from './DirectoryUploader.jsx';
import TextInput from './TextInput';
import ImageUploader from './ImageUploader';
import sendQuery from "../scripts/sendQuery.js"
import sendFiles from "../scripts/sendFiles.js"
import DirectoryUploader from "./DirectoryUploader.jsx";

const SearchBar = ({onSearchSubmit, onStartSearch }) => {
    const [disableSearch, setDisableSearch] = useState(false)
    const handleSearchSubmit = async (query) => {
        onStartSearch()
        const response = await sendQuery(query)
        onSearchSubmit(response.data)
    };
    const handleImageUpload = async (file) => {
        onStartSearch()
        const response = await sendQuery(file)
        onSearchSubmit(response.data)
    }
    const handleDirectoryUpload = async (files) => {
        const response = await sendFiles(files, setDisableSearch)
        console.log(response)
    }

    return (
        <HStack width="100%" justifyContent="space-between" spacing={4} bg="dark.800" borderRadius="md" padding={"1vh"}>
            <Box flexShrink={"0"}><DirectoryUploader onDirectoryUpload={handleDirectoryUpload}/></Box>
            <Box flex={"3"}><TextInput onSearchSubmit={handleSearchSubmit} isDisabled={disableSearch}/></Box>
            <Box flexShrink={"0"}><ImageUploader onImageUpload={handleImageUpload} isDisabled={disableSearch}/></Box>
        </HStack>
    );
};

export default SearchBar;
