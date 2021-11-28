import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Button } from "@chakra-ui/react";


function CustomModal(props) {
    
    const { isOpen, onClose, modalHeader, modalCloseButton, children, modalFooterButtonText, modalButtonOnClick, modalButtonLoadingState } = props;

    return (
        <Modal closeOnOverlayClick={false} isCentered={true} isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
            <ModalOverlay  />
            <ModalContent mx={3}>
                <ModalHeader color="black.600">{modalHeader}</ModalHeader>
                {
                    modalCloseButton ?
                    <ModalCloseButton />
                    :
                    null
                }
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    <Button isLoading={modalButtonLoadingState} onClick={modalButtonOnClick} width="100%" size="lg">{modalFooterButtonText}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default CustomModal;