"use client"
import React, {useState} from "react";
import Image from "next/image";
import { Facebook, Marker, Phone } from "./icons";

function MyFooter() {
    const [collapsed, setCollapsed] = useState(true);
    
    const toggleCollapse = () => {
        setCollapsed(!collapsed);
      };

  return (
    <div className="bg-greenLogo lg:h-full h-fit py-6">
      {/* I need to create a three column grid that as it shrinks it begins stacking on one another  */}
      <div className="grid grid-flow-row gap-y-4 pl-3 lg:grid-flow-col">
        <div className="text-center">
          <p className="text-xl font-bold">Get In Touch</p>
          <a
            href="https://www.facebook.com/InspirePropertiesOfNorthCarlina/"
            rel="noopener noreferrer"
          >
            <div className="flex flex-row gap-x-2 justify-center mb-2">
              <Facebook />
              Follow us on Facebook
            </div>
          </a>
          <a href="tel:919-600-8888">
            <div className="flex flex-row gap-x-2 justify-center">
              <Phone />
              call us 919-600-8888
            </div>
          </a>
        </div>

        <div className="mt-2 text-center pb-5">
          <p className="text-xl font-bold">Come Visit</p>
          <p className="whitespace-pre-line">
            120 Weather Street Suit D Youngsville NC 27596{" "}
          </p>
          <div className="flex justify-center"></div>
        </div>

        <div className="text-center ">
          <div onClick={toggleCollapse} className="cursor-pointer"><p>Privacy Policy</p> <p className="text-blue-600">(click me)</p></div>
            {!collapsed && 
                <div className="text-xs">
            Privacy Policy Effective Date: [8/15/2023] <br />
            1. Introduction Thank you for choosing Inspire Propeties LLC for
            your property management needs. This Privacy Policy outlines how we
            collect, use, disclose, and protect your personal information when
            you use our services. By engaging with our services, you consent to
            the practices described in this Privacy Policy.
            <br />
            <br />
            2. Information We Collect We may collect personal information from
            you, including but not limited to: Contact Information: Name,
            address, phone number, email address. Property Details: Address,
            property size, type of services requested. Payment Information:
            Credit card details, billing address. Communication Records:
            Correspondence between you and [Your Company Name]. Usage Data:
            Information about how you use our website and services.
            <br />
            <br />
            3. How We Use Your Information We may use your personal information
            for the following purposes: Providing Services: To deliver
            powerwashing, landscaping, and deck staining services as requested.
            Communication: To respond to your inquiries, send service-related
            updates, and manage customer support. Billing and Payment: To
            process payments, issue invoices, and manage financial transactions.
            Marketing: To send promotional materials, special offers, or
            information about our services (only with your consent where
            required). Legal Obligations: To comply with legal requirements and
            regulations.
            <br />
            <br />
            4. Data Sharing and Disclosure We may share your personal
            information with: Service Providers: Third-party contractors or
            partners who assist us in providing our services. Legal and
            Regulatory Authorities: When required by law or to protect our
            rights, safety, or property. Business Transfers: In the event of a
            merger, acquisition, or sale of all or a portion of our assets.
            <br />
            <br />
            5. Your Choices You can: Opt-Out: You have the right to opt-out of
            receiving marketing communications from us. Access and Correct:
            Request access to your personal information or update incorrect
            information. Data Retention: Request the deletion of your personal
            information, subject to legal obligations.
            <br />
            <br />
            6. Data Security We implement security measures to protect your
            personal information from unauthorized access, disclosure,
            alteration, or destruction.
            <br />
            <br />
            7. Children's Privacy Our services are not intended for children
            under the age of 18. We do not knowingly collect or solicit personal
            information from children.
            <br />
            <br />
            8. Changes to this Privacy Policy We may update this Privacy Policy
            to reflect changes in our practices. We will notify you of any
            significant changes via email or our website.
            <br />
            <br />
            9. Contact Us If you have questions or concerns about our Privacy
            Policy or your personal information, please contact us at:
            <br />
            <br />
            Inspire Properties [919-600-8888]
                </div>
          }
        </div>
      </div>
    </div>
  );
}

export default MyFooter;
