import React, { useState } from "react";
import { Box, Heading, Text, Input, Button, Grid, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import { FaFolder, FaFile, FaPlus, FaUpload } from "react-icons/fa";

const Index = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFileUpload = (event) => {
    const newFile = {
      id: Date.now(),
      name: event.target.files[0].name,
      type: "file",
    };
    setFiles([...files, newFile]);
  };

  const handleFolderCreate = () => {
    const newFolder = {
      id: Date.now(),
      name: "New Folder",
      type: "folder",
    };
    setFiles([...files, newFolder]);
  };

  const openFile = (file) => {
    setSelectedFile(file);
    onOpen();
  };

  return (
    <Box p={8}>
      <Heading as="h1" mb={8}>
        My Drive
      </Heading>
      <Box mb={8}>
        <Input type="file" id="fileInput" display="none" onChange={handleFileUpload} />
        <Button leftIcon={<FaUpload />} mr={4} onClick={() => document.getElementById("fileInput").click()}>
          Upload File
        </Button>
        <Button leftIcon={<FaPlus />} onClick={handleFolderCreate}>
          Create Folder
        </Button>
      </Box>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {files.map((file) => (
          <Box key={file.id} borderWidth={1} borderRadius="lg" p={4} textAlign="center" cursor="pointer" onClick={() => openFile(file)}>
            {file.type === "folder" ? <FaFolder size={48} /> : <Image src="https://placehold.co/600x400" alt="File" boxSize={48} objectFit="cover" mx="auto" />}
            <Text mt={2}>{file.name}</Text>
          </Box>
        ))}
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedFile?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{selectedFile?.type === "folder" ? <Text>This is a folder.</Text> : <Image src="https://placehold.co/600x400" alt="File Preview" objectFit="cover" />}</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
