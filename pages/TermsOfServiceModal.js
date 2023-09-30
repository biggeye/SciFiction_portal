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

const TermsOfServiceModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Terms of Service</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
  <p>
    <strong>Terms of Service</strong>
    <br /><br />
    <em>Last Updated: [Date]</em>
  </p>

  <p>
    These Terms of Service ("Agreement") govern your use of the [Your Website Name] website ("Website"), which allows users to connect their TikTok accounts and post content, including text-to-image models via Replicate. By accessing or using the Website, you agree to comply with and be bound by this Agreement. If you do not agree with these terms, please do not use the Website.
  </p>

  <h2>1. Acceptance of Terms</h2>

  <p>
    By using the Website, you agree to be bound by the terms and conditions outlined in this Agreement, including any future modifications. [Your Company Name] ("Company") reserves the right to update or change this Agreement at any time, without notice. Continued use of the Website after any such changes constitutes your acceptance of the new terms.
  </p>

  <h2>2. Access and Use of the Website</h2>

  <h3>2.1. Eligibility</h3>

  <p>
    You must be at least 18 years of age or have the necessary legal capacity to enter into this Agreement. If you are under 18, you must obtain parental or guardian consent to use the Website.
  </p>

  <h3>2.2. Account Registration</h3>

  <p>
    To access certain features of the Website, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
  </p>

  <h3>2.3. User Content</h3>

  <p>
    You are solely responsible for the content you post on the Website, including text-to-image models via Replicate. You agree not to post content that violates any applicable laws, infringes on the rights of others, or is harmful, abusive, or offensive.
  </p>

  <h3>2.4. TikTok Integration</h3>

  <p>
    When connecting your TikTok account to the Website, you grant the Company permission to access and use certain information from your TikTok account as necessary for the operation of the Website. You are responsible for complying with TikTok's terms of service.
  </p>

  <h2>3. Intellectual Property</h2>

  <h3>3.1. Ownership</h3>

  <p>
    All content provided by the Company on the Website, including but not limited to text, graphics, logos, images, software, and other materials, is the property of the Company and is protected by intellectual property laws.
  </p>

  <h3>3.2. User Content</h3>

  <p>
    By posting content on the Website, you grant the Company a non-exclusive, royalty-free, worldwide, sublicensable, and transferable license to use, display, reproduce, distribute, and modify the content solely for the purpose of operating the Website.
  </p>

  <h2>4. Privacy</h2>

  <p>
    Your use of the Website is subject to our Privacy Policy, which can be found at <a href="https://promo.scifiction.com/privacy" target="_blank" rel="noopener noreferrer">https://promo.scifiction.com/privacy</a>. By using the Website, you consent to the collection and use of your personal information as described in the Privacy Policy.
  </p>

  <h2>5. Termination</h2>

  <p>
    The Company reserves the right to terminate or suspend your access to the Website, without notice, for any reason, including a breach of this Agreement.
  </p>

  <h2>6. Disclaimers and Limitation of Liability</h2>

  <p>
    The Website is provided on an "as is" and "as available" basis. The Company makes no warranties or representations regarding the accuracy, completeness, or reliability of the content on the Website. To the fullest extent permitted by law, the Company disclaims all warranties, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.
  </p>

  <p>
    In no event shall the Company be liable for any indirect, consequential, incidental, special, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising from or related to your use of the Website.
  </p>

  <h2>7. Governing Law</h2>

  <p>
    This Agreement shall be governed by and construed in accordance with the laws of Texas. Any disputes arising under or in connection with this Agreement shall be subject to the exclusive jurisdiction of the courts located in [Your Jurisdiction].
  </p>

  <h2>8. Contact Information</h2>

  <p>
    If you have any questions or concerns regarding this Agreement, please contact us at <a href="mailto:admin@scifiction.com">admin@scifiction.com</a>.
  </p>

  <p>
    By using the Website, you acknowledge that you have read, understood, and agree to be bound by this Terms of Service Agreement.
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

export default TermsOfServiceModal;
