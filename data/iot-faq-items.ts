export type IotFaqItem = { id: string; question: string; answer: string };

export const deviceFaqs: IotFaqItem[] = [
  {
    id: "what-is-device-for",
    question: "What is this device used for?",
    answer:
      "It is a field monitoring unit for electrical and process signals: mains-related AC measurements, low-level AC from sensors such as CTs, and general DC analog inputs from transmitters (pressure, level, temperature, flow, etc.).",
  },
  {
    id: "enclosure-size",
    question: "What is the enclosure made of, and how big is it?",
    answer:
      "The housing is ABS. The stated footprint is 165 mm × 155 mm (width × depth as given in the spec).",
  },
  {
    id: "input-count",
    question: "How many inputs does it have, and how are they split?",
    answer:
      "There are 17 inputs in total: 1 DC power input, 3 high-voltage AC inputs, 3 low-voltage AC inputs, and 9 analog DC inputs.",
  },
  {
    id: "power-voltage",
    question: "What voltage do I use to power the device?",
    answer:
      "Use a 6–24 V DC supply within that range, sized for the load your installation requires (the doc describes the pin as the single supply rail for the whole device).",
  },
  {
    id: "ac-high-inputs",
    question: "What can the three high-voltage AC inputs measure?",
    answer:
      "They are intended for high AC potentials on distribution or branch circuits, rated up to 300 V AC per channel as specified—typical use cases include phase / line voltages (e.g. R–Y–B style monitoring) where direct mains measurement is intended.",
  },
  {
    id: "ac-low-inputs",
    question: "What are the three low-voltage AC inputs for?",
    answer:
      "They accept low AC signals (up to 5 V AC at the input, depending on the sensor), for example from current transformers (CTs) or similar interfaces that output a small AC voltage related to line current—not for raw mains connection.",
  },
  {
    id: "analog-range",
    question: "What range do the nine analog inputs cover?",
    answer:
      "They measure DC voltages from 0 V to 30 V, suitable for standard 4–20 mA-to-voltage or transmitter outputs and similar field devices.",
  },
  {
    id: "network-connection",
    question: "How does the device connect to the network?",
    answer:
      "It includes a GSM module with 2G support and a built-in antenna for cellular uplink (coverage and carrier support depend on your site and operator).",
  },
  {
    id: "battery-backup",
    question: "Does it have battery backup?",
    answer:
      "Yes. The spec lists two 3.7 V cells with 1700 mAh pack capacity to help ride through short supply interruptions (exact runtime depends on load and radio activity).",
  },
  {
    id: "installation-responsibility",
    question: "Who is responsible for safe installation and compliance?",
    answer:
      "The published summary states that final installation, protection, and compliance with local electrical codes are the system integrator’s responsibility; contact SFPL for deployment guidance and supported accessories.",
  },
  {
    id: "formal-drawings",
    question: "Where can I get formal drawings or a full compliance pack?",
    answer:
      "The web summary directs users to request certified drawings or a full compliance package through SFPL contact—the online page is a summary, not a certified drawing set.",
  },
];

export const portalFaqs: IotFaqItem[] = [
  {
    id: "portal-for",
    question: "What is this portal for?",
    answer:
      "This portal is your workspace to monitor and manage connected devices, organize them into projects, review alerts and activity, and view locations on a map. Depending on your access, you may also manage notification templates and diagrams.",
  },
  {
    id: "sign-in",
    question: "How do I sign in?",
    answer:
      "Use the sign-in page with the credentials your organization gave you. If your company enabled it, you may also see an option to sign in with Google. If you cannot log in, confirm you are using the correct email or phone and that your account has been activated.",
  },
  {
    id: "forgot-password",
    question: "I forgot my password. What should I do?",
    answer:
      "Use Forgot password on the login screen and follow the instructions sent to your registered email. If you do not receive an email, check spam, confirm the address you entered, or contact your administrator.",
  },
  {
    id: "register-account",
    question: "How do I register a new account?",
    answer:
      "Use Register from the login area, complete the form, and complete any email verification step if prompted. Some organizations only allow accounts created by an admin; if registration is disabled or you get an error, ask your administrator.",
  },
  {
    id: "dashboard",
    question: "What is the Dashboard?",
    answer:
      "The Dashboard is the home view after you sign in. It summarizes important information at a glance so you can quickly see status and jump into projects, devices, or alerts.",
  },
  {
    id: "projects",
    question: "What are Projects?",
    answer:
      "Projects group related work or devices so lists, reports, and access stay organized. You can typically create a project, open its detail page, and edit project information from the Projects section, subject to your permissions.",
  },
  {
    id: "devices",
    question: "What are Devices?",
    answer:
      "Devices are the connected units you track in the portal. From Devices you can browse the list, open a device detail page for configuration and history, and in some cases open a device dashboard (for example, tied to a device identifier such as IMEI) for a focused operational view.",
  },
  {
    id: "map",
    question: "What can I see on the Map?",
    answer:
      "The Map shows device locations (when location data is available from your devices and backend). Use it to understand where assets are and to correlate with alerts or recent activity.",
  },
  {
    id: "alerts",
    question: "What are Alerts?",
    answer:
      "Alerts surface conditions or events that need attention, such as thresholds, faults, or system-generated notifications. Open an alert to see context and follow your team’s process for acknowledgement or escalation.",
  },
  {
    id: "notification-schema",
    question: "What is Custom notification schema?",
    answer:
      "Custom notification schema lets you define or adjust how certain notifications are structured or interpreted (depending on how your organization configured it). Use the list and create/edit screens to manage these schemas if you have been granted access.",
  },
  {
    id: "diagrams",
    question: "What are Diagrams?",
    answer:
      "Diagrams are visual layouts you can create or edit in the diagram editor—for example to represent sites, networks, or process flows linked to your operations. Open Diagrams to browse existing diagrams or edit one you are allowed to change.",
  },
  {
    id: "access-denied",
    question: "Why do I not see a menu item or get “access denied”?",
    answer:
      "Your role determines which areas of the portal you can open. If something is missing or blocked, ask your administrator to confirm your permissions for projects, devices, alerts, maps, diagrams, or notification settings.",
  },
  {
    id: "real-time-updates",
    question: "Do updates appear in real time?",
    answer:
      "The application is built to support live updates where the backend and your account allow it (for example, via a persistent connection). If data looks stale, refresh the page or check your network connection.",
  },
  {
    id: "tutorials-help",
    question: "Where can I learn how to use a feature step by step?",
    answer:
      "Use Tutorials for guided content and Help for reference or support information. FAQ answers common questions in short form.",
  },
  {
    id: "update-profile",
    question: "How do I update my profile?",
    answer:
      "Open Profile from the main navigation (or your account menu) to update your personal details, password, or preferences where the product allows self-service changes.",
  },
  {
    id: "portal-slow",
    question: "What should I do if the portal is slow or an action fails?",
    answer:
      "Try again after a short wait, refresh the page, and try another browser or network if possible. If the problem continues, note the page you were on, what you clicked, and approximate time, and share that with your support contact or administrator.",
  },
  {
    id: "session-secure",
    question: "Is my session secure?",
    answer:
      "You should always sign out on shared computers. The portal uses standard web authentication; follow your organization’s security policies for passwords, MFA (if enabled elsewhere), and handling of sensitive operational data.",
  },
  {
    id: "contact-support",
    question: "Who do I contact for account or data issues?",
    answer:
      "For login problems, missing devices, wrong project access, or incorrect data, contact your organization’s administrator or IT/support contact. They can verify device provisioning, project membership, and permissions on the server side.",
  },
];
