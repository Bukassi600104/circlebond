export type LegalDocumentType = "terms" | "privacy";

export type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export const legalDocuments: Record<
  LegalDocumentType,
  {
    eyebrow: string;
    title: string;
    summary: string;
    action: string;
    sections: LegalSection[];
  }
> = {
  terms: {
    eyebrow: "Terms of Service",
    title: "BondCircle Terms of Service",
    summary:
      "Updated 2 August 2026. These terms describe the current coordination and one-time circle-activation product and remain subject to Nigerian legal counsel review.",
    action: "I agree to the Terms",
    sections: [
      {
        title: "1. About BondCircle",
        paragraphs: [
          "Bond Circle provides BondCircle, a service that helps people create and join circles, coordinate gifts or events, record contribution status, exchange invitations and updates, and upload payment evidence. Its supplied contact address is 6 Jehova Elohim, Gowon Estate, and its supplied telephone contact is +234 906 228 4074. A registration number and official support email must still be confirmed before public launch.",
        ],
      },
      {
        title: "2. Eligibility and authority",
        paragraphs: [
          "You may use BondCircle only if you can enter a binding agreement under applicable law. The minimum permitted age and any guardian-consent process must be confirmed before public registration is enabled.",
          "If you create or manage a circle for an organisation or another person, you confirm that you have authority to act for them.",
        ],
      },
      {
        title: "3. What the service does",
        paragraphs: [
          "BondCircle is a coordination platform. It does not hold contribution money, operate a contribution wallet, act as a bank or escrow provider, or deduct a percentage from contributions. Contributors pay recipients through arrangements made outside BondCircle. A separate third-party checkout may process the creator's disclosed one-time BondCircle circle-activation fee.",
          "A payment-proof upload or status shown in the app is a coordination record, not a bank confirmation, guarantee, or independent verification of payment.",
        ],
      },
      {
        title: "4. Accounts and security",
        paragraphs: [
          "Provide accurate information, keep your sign-in methods secure, and notify us promptly if you suspect unauthorised access. You are responsible for activity performed through your account unless applicable law provides otherwise.",
          "We may require verification, limit attempts, expire sessions, or suspend access to protect users and the service.",
        ],
      },
      {
        title: "5. Circles, organisers and members",
        paragraphs: [
          "A circle organiser sets the purpose, target, deadlines, tiers and member information. Organisers must provide accurate, non-misleading information and manage the circle fairly. Members should verify payment instructions and circle details before acting.",
          "Circle organisers are not BondCircle employees or agents. Disputes between organisers and members should first be raised within the circle and then through the complaint contact stated below.",
        ],
      },
      {
        title: "6. Contributions and payment proof",
        paragraphs: [
          "BondCircle may display expected, confirmed, pending, part-paid, paid, rejected or completed statuses. Those labels reflect information submitted or reviewed by users and may not reflect settlement at a financial institution.",
          "Do not upload bank passwords, card numbers, PINs, authentication codes or unnecessary financial information. Redact unrelated transaction details before uploading proof.",
        ],
      },
      {
        title: "7. Gifts, tiers and delivery",
        paragraphs: [
          "Gift descriptions, contribution tiers, delivery dates and fulfilment information are supplied by circle organisers or third parties. Before public launch, the responsible seller, delivery provider, cancellation process, refund rules and fulfilment responsibilities must be identified wherever they apply.",
        ],
      },
      {
        title: "8. Your content",
        paragraphs: [
          "You retain ownership of content you submit. You give BondCircle a limited, non-exclusive licence to host, copy, display and process that content only as needed to operate, secure and improve the service.",
          "You confirm that you have the right to share the content and that it does not unlawfully expose another person’s private information or intellectual property.",
        ],
      },
      {
        title: "9. Acceptable use",
        paragraphs: ["You must not misuse BondCircle."],
        bullets: [
          "Do not commit fraud, impersonate others, mislead contributors, harass people, or coordinate unlawful activity.",
          "Do not upload malware, probe security, evade access controls, scrape the service, or disrupt other users.",
          "Do not publish unlawful, infringing, hateful, exploitative or privacy-invasive material.",
        ],
      },
      {
        title: "10. Invitations and communications",
        paragraphs: [
          "Only invite people you are permitted to contact. Operational messages may include verification, security, invitation, contribution and circle updates. Marketing messages, if introduced, will require a separate optional choice and an unsubscribe method.",
        ],
      },
      {
        title: "11. Fees, cancellations and refunds",
        paragraphs: [
          "Creating and saving a draft is free. A creator may use one basic three-member first-circle trial per account. Publishing another circle requires the one-time activation price shown for the selected circle type and tier before checkout. One activation applies to one circle; this is not recurring billing. Contributors and invitees are not charged a BondCircle platform fee.",
          "An active circle may be upgraded only within the same circle type. The creator is shown the price difference before checkout. Active downgrades are not offered. A closed circle cannot be reused; a duplicated circle is a new draft requiring separate activation.",
          "Cancellation and refund eligibility for a creator activation payment, including any non-refundable service already supplied, must be displayed at checkout and finalized with Nigerian counsel and the selected payment provider before paid production activation is enabled. Nothing in these Terms removes rights that cannot lawfully be excluded.",
        ],
      },
      {
        title: "12. BondCircle intellectual property",
        paragraphs: [
          "BondCircle’s software, brand, interface and original materials are protected by applicable intellectual-property laws. These Terms give you a limited, revocable, non-transferable right to use the service; they do not transfer ownership.",
        ],
      },
      {
        title: "13. Third-party services",
        paragraphs: [
          "The service uses third-party infrastructure, including Google Firebase. External payment, delivery, messaging or sign-in services may have their own terms and privacy notices. BondCircle is not responsible for a third party’s independent acts, subject to applicable law.",
        ],
      },
      {
        title: "14. Suspension and termination",
        paragraphs: [
          "You may stop using the service and request account deletion. We may restrict or suspend access to protect users, investigate suspected misuse, comply with law, or address a serious breach. Where appropriate, we will explain the reason and provide a review channel.",
        ],
      },
      {
        title: "15. Availability and changes",
        paragraphs: [
          "We aim to provide a reliable service but cannot promise uninterrupted availability. Features may change for security, legal or product reasons. Material changes will be communicated in a reasonable way.",
        ],
      },
      {
        title: "16. Consumer rights",
        paragraphs: [
          "Information about the service will be presented clearly and accurately. Any restriction of liability must be conspicuous. Mandatory rights under the Federal Competition and Consumer Protection Act 2018 and other applicable law continue to apply.",
        ],
      },
      {
        title: "17. Responsibility and liability",
        paragraphs: [
          "To the extent permitted by law, BondCircle is not responsible for user-to-user promises, off-platform transfers, or organiser-supplied gift and delivery information. We do not exclude liability that cannot legally be excluded, including liability arising from fraud or wilful misconduct.",
          "A fair monetary liability cap and any exceptions require Nigerian counsel approval before public launch.",
        ],
      },
      {
        title: "18. Complaints and disputes",
        paragraphs: [
          "Contact details, response times and escalation procedures must be inserted before launch. Users may also have the right to complain to the Federal Competition and Consumer Protection Commission or another competent authority.",
          "The governing law is intended to be Nigerian law. The agreed court venue or alternative dispute process must be confirmed by counsel.",
        ],
      },
      {
        title: "19. Changes to these Terms",
        paragraphs: [
          "We will publish the effective date and notify users of material changes. Where the law requires renewed agreement, we will ask for it before the revised terms apply.",
        ],
      },
      {
        title: "20. General and contact",
        paragraphs: [
          "If a provision is unenforceable, the remaining provisions continue. Delay in enforcing a provision is not a waiver. Transfer and notice rules must be finalised before launch.",
          "Bond Circle contact: 6 Jehova Elohim, Gowon Estate; telephone +234 906 228 4074. Pre-launch details still required: RC number, official support email, effective date, minimum age, complaint timetable and dispute venue.",
        ],
      },
      {
        title: "Official references",
        paragraphs: [
          "This draft was informed by the Federal Competition and Consumer Protection Act 2018 and the FCCPC’s published consumer-rights guidance.",
        ],
        bullets: [
          "https://fccpc.gov.ng/wp-content/uploads/2022/07/FCCPA-2018.pdf",
          "https://fccpc.gov.ng/consumers/consumer-rights-responsibilities/rights-responsibilities/",
        ],
      },
    ],
  },
  privacy: {
    eyebrow: "Privacy Policy",
    title: "BondCircle Privacy Notice",
    summary:
      "Updated 2 August 2026. This notice explains the current product's data practices, including one-time circle activation, and remains subject to Nigerian privacy counsel review.",
    action: "I acknowledge the Privacy Policy",
    sections: [
      {
        title: "1. Who controls your information",
        paragraphs: [
          "Bond Circle is the supplied service identity and data controller for the activities described here. Its supplied contact address is 6 Jehova Elohim, Gowon Estate, and telephone contact is +234 906 228 4074. Its RC number, official privacy email and Data Protection Officer details must still be confirmed before public launch. Google acts as a processor for configured Firebase services.",
        ],
      },
      {
        title: "2. Scope",
        paragraphs: [
          "This notice applies to BondCircle registration, authentication, profiles, circles, invitations, contribution records, receipts, announcements, activity, one-time circle activation and support interactions. A selected activation-payment provider will publish its own privacy notice and will process checkout information independently or as otherwise stated at checkout.",
        ],
      },
      {
        title: "3. Information we collect",
        paragraphs: ["Depending on the features you use, we collect:"],
        bullets: [
          "Account data such as display name, email address, phone number, profile image, identifiers and verification status.",
          "Circle data such as membership, roles, invitations, targets, tiers, deadlines, contribution status and delivery status.",
          "Content such as announcements, comments, support messages and payment-proof images you choose to upload.",
          "Technical and security data such as IP address, device or browser information, authentication events, session data, error logs and audit records.",
          "Legal-choice records such as the version and time of Terms agreement and Privacy Notice acknowledgement.",
        ],
      },
      {
        title: "4. Information we intentionally do not request",
        paragraphs: [
          "The current registration flow does not request gender, precise location, bank-login details, card numbers, PINs or authentication codes. Do not include those details in profile text, comments or payment proof.",
        ],
      },
      {
        title: "5. Sources",
        paragraphs: [
          "We receive information from you, circle organisers or members who invite you or update a circle, your chosen sign-in provider, your device, and service providers that operate the platform.",
        ],
      },
      {
        title: "6. Why we use information and our legal bases",
        paragraphs: [
          "We use necessary account and circle data to provide the service and perform our agreement with you. We use security, fraud-prevention, audit and service-improvement data for legitimate interests and legal obligations, balanced against your rights. We use consent only where it is the appropriate legal basis, and you may withdraw it without affecting earlier lawful processing.",
          "Any optional marketing or materially different use will have its own clear, unticked choice.",
        ],
      },
      {
        title: "7. What other participants can see",
        paragraphs: [
          "Circle participants may see your display name, profile image, role, invitation or contribution status and information needed to coordinate that circle. Organisers may see uploaded payment proof. Exact field-level visibility must be documented and tested before launch.",
        ],
      },
      {
        title: "8. Sharing",
        paragraphs: [
          "We share data with other circle participants as described above, with processors that host and secure the service, with professional advisers where necessary, and with authorities when lawfully required. We do not sell personal data.",
          "A complete, current processor and subprocessor list must be published before launch.",
        ],
      },
      {
        title: "9. Firebase and international processing",
        paragraphs: [
          "BondCircle uses Google Firebase for authentication and related infrastructure. Firebase Authentication may process email addresses, phone numbers, user-agent strings and IP addresses. Data may be processed outside Nigeria on Google infrastructure.",
          "Before launch, BondCircle must document each Firebase service, processing region, transfer destination and the lawful safeguard used for international transfers.",
        ],
      },
      {
        title: "10. Retention",
        paragraphs: [
          "Email verification challenges expire after 10 minutes and current application sessions after 8 hours. Firebase states that Authentication IP addresses are retained for a few weeks and other Authentication information is retained until a user or administrator initiates deletion, after which removal from live and backup systems generally occurs within 180 days.",
          "Retention periods for profiles, circles, receipts, audit logs, support messages and backups must be approved and published before launch. We will not keep personal data longer than necessary for its stated purpose or a legal requirement.",
        ],
      },
      {
        title: "11. Security",
        paragraphs: [
          "We use controls including verified sign-in methods, limited verification attempts, expiring sessions, secure HTTP-only cookies, audit events, access rules and encryption provided by our infrastructure. No system is completely secure, so users should protect their devices and report suspected compromise promptly.",
        ],
      },
      {
        title: "12. Your rights",
        paragraphs: [
          "Subject to the Nigeria Data Protection Act 2023 and applicable exceptions, you may ask to be informed, access your data, correct inaccurate data, erase data, restrict or object to processing, receive portable data, withdraw consent, and challenge certain solely automated decisions.",
          "You may complain to BondCircle and to the Nigeria Data Protection Commission. Identity verification may be required before a request is fulfilled.",
        ],
      },
      {
        title: "13. Account deletion and data export",
        paragraphs: [
          "The in-product request route, verification steps, completion time, export format and lawful retention exceptions must be implemented and documented before launch. Deleting an account may not remove information another participant is legally entitled to retain or records required for security and legal compliance.",
        ],
      },
      {
        title: "14. Children",
        paragraphs: [
          "BondCircle is not designed to collect children’s information without the protections required by law. The minimum age and any verified parental-consent process must be decided before public registration is enabled.",
        ],
      },
      {
        title: "15. Cookies and local storage",
        paragraphs: [
          "BondCircle uses strictly necessary cookies and browser storage for authentication, security, verification and continuity of the registration process. We also use Vercel Web Analytics and Speed Insights to understand aggregate traffic and real-world performance. They may process page or route information, referrer, approximate country, device, browser, operating system and performance measurements. BondCircle removes query strings, URL fragments, invitation tokens and dynamic user or circle identifiers before telemetry is sent. These services are configured without advertising trackers, and BondCircle does not use them to build advertising profiles.",
        ],
      },
      {
        title: "16. Automated decisions and incidents",
        paragraphs: [
          "The current product does not intentionally make decisions with legal or similarly significant effects solely by automated processing. Any such future feature must be disclosed with the required safeguards.",
          "We will assess personal-data incidents and notify the Nigeria Data Protection Commission and affected people when the law requires it.",
        ],
      },
      {
        title: "17. Changes and contact",
        paragraphs: [
          "We will show an effective date and give appropriate notice of material changes. Privacy questions and rights requests will be sent to the privacy contact and Data Protection Officer details inserted before launch.",
          "Pre-launch details required: controller identity and address, privacy email, DPO, age rule, service and region inventory, transfer safeguards, processor list, retention schedule, rights-request timetable, deletion/export process and incident contact.",
        ],
      },
      {
        title: "Official references",
        paragraphs: [
          "This draft was informed by the Nigeria Data Protection Act 2023, NDPC guidance and Google Firebase’s privacy and processing terms.",
        ],
        bullets: [
          "https://ndpc.gov.ng/wp-content/uploads/2024/03/Nigeria_Data_Protection_Act_2023.pdf",
          "https://ndpc.gov.ng/our-data-privacy-policy/",
          "https://firebase.google.com/support/privacy",
          "https://firebase.google.com/terms/data-processing-terms",
        ],
      },
    ],
  },
};
