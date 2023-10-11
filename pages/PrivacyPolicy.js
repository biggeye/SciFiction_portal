import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

const PrivacyPolicy = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Privacy Policy</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>
            <strong>Privacy Policy</strong>
            <br /><br />
            <em>Last Updated: [Date]</em>
          </p>

          <p>
            This Privacy Policy ("Policy") explains how [Your Company Name] ("Company," "we," "our," or "us") collects, uses, and protects your personal information when you access or use the [Your Website Name] website ("Website"). By using the Website, you consent to the practices described in this Policy.
          </p>

          <h2>1. Information Collection</h2>

          <p>
            We collect certain information from you when you use the Website. This may include personal information such as your name, email address, and other information you provide during the registration process or while using the Website.
          </p>

          <h2>2. Use of Information</h2>

          <p>
            We use the information we collect to operate and improve the Website, provide you with access to its features, and communicate with you. This may include sending you updates, service announcements, or other relevant information.
          </p>

          <h2>3. Disclosure of Information</h2>

          <p>
            We may share your information with third parties as necessary to provide you with access to certain features of the Website, including TikTok integration. By connecting your TikTok account, you authorize us to access and use certain information from your TikTok account.
          </p>

          <h2>4. Data Security</h2>

          <p>
            We take reasonable measures to protect your personal information from unauthorized access or disclosure. However, no data transmission over the internet can be guaranteed to be 100% secure. You understand and accept the associated risks.
          </p>

          <h2>5. Third-Party Links</h2>

          <p>
            The Website may contain links to third-party websites or services that are not under our control. We are not responsible for the privacy practices or content of these third-party sites, and we encourage you to review their privacy policies.
          </p>

          <h2>6. Changes to this Policy</h2>

          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes through the Website or by other means.
          </p>

          <h2>7. Contact Us</h2>

          <p>
            If you have any questions or concerns regarding this Privacy Policy, please contact us at <a href="mailto:admin@scifiction.com">admin@scifiction.com</a>.
          </p>

          <p>
            By using the Website, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
          </p>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PrivacyPolicy;
