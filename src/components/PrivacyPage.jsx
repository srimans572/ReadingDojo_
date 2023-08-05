import React from 'react';
import Navbar from './Navbar';
import styles from '../styles/privacy.module.css';
import { useEffect,useState } from 'react';

const PrivacyPolicyPage = () => {
    const [display, setDisplay] = useState("none")
    useEffect(()=>{
        setDisplay("visible")
    })
   
  return (
    <div style={{display:{display}}}>
    <Navbar></Navbar>
    <div className={styles.container}>
       
      <h1 className={styles.heading}>Privacy Policy</h1>

      <p>
        This Privacy Policy describes how ReadingDojo collects, uses, and shares information about you when you use our web application (the "Service").
      </p>

      <h2 className={styles.subHeading}>Information we collect</h2>
      <p>
        We collect information about you when you use our Service, including:
      </p>
      <ul className={styles.list}>
        <li>Personal Information: We may collect personal information such as your name, email address, which you provide when you sign in with Google.</li>
        <li>User Content: We may collect information that you provide when you use the Service, such as text you paste in, questions you select or do not select, and any other user-generated content.</li>
        <li>Usage Information: We may collect information about how you use the Service, such as the pages you visit, the links you click, and other actions you take while using the Service.</li>
        <li>Device Information: We may collect information about the devices you use to access the Service, such as the type of device, operating system, and browser you use.</li>
      </ul>

      <h2 className={styles.subHeading}>How We Use Your Information</h2>
      <ul className={styles.list}>
        <li>Provide, operate, and improve the Service</li>
        <li>Respond to your requests and inquiries</li>
        <li>Monitor and analyze usage of the Service</li>
        <li>Detect, prevent, and address technical issues and security vulnerabilities</li>
        <li>Comply with legal obligations and enforce our policies</li>
      </ul>

      <h2 className={styles.subHeading}>How We Share Your Information</h2>
      <p>
        We do not share your information with any parties other than to Legal Authorities.
      </p>
      <p>
        Legal Authorities: We may share your information with law enforcement agencies, courts, or other legal authorities if we are required to do so by law or if we believe that such disclosure is necessary to protect our rights, property, or safety, or the rights, property, or safety of others.
      </p>

      <h2 className={styles.subHeading}>Your Choices</h2>
      <ul className={styles.list}>
        <li>Contact us to request that we delete your information or restrict its use.</li>
      </ul>

      <h2 className={styles.subHeading}>Security</h2>
      <p>
        We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no security system is completely foolproof, and we cannot guarantee the security of your information.
      </p>

      <h2 className={styles.subHeading}>Children's Privacy</h2>
      <p>
        Our Service is not intended for use by children under the age of 13, and we do not knowingly collect or use personal information from children under the age of 13.
      </p>

      <h2 className={styles.subHeading}>Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time.
      </p>
    </div>
    </div>
  );
};

export default PrivacyPolicyPage;
