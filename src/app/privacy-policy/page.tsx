import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Providing Value privacy policy to understand how we collect, use, and protect your data, including our use of cookies and advertising partners.",
  alternates: { canonical: "/privacy-policy" },
};

const lastUpdated = "February 24, 2026";

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated: ${lastUpdated}`}
      />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <article className="prose-article">
          <p>
            Providing Value ("we," "us," or "our") operates the website providingvalue.online (the
            "Site"). This Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you visit our Site. Please read this policy carefully. By
            continuing to use the Site, you agree to the terms described here.
          </p>

          <h2>1. Information we collect</h2>
          <p>We may collect the following categories of information:</p>
          <ul>
            <li>
              <strong>Information you provide directly:</strong> such as your name and email
              address when you submit our contact form or subscribe to updates.
            </li>
            <li>
              <strong>Automatically collected information:</strong> including IP address, browser
              type, device information, pages visited, and time spent on the Site, gathered
              through cookies and similar tracking technologies.
            </li>
            <li>
              <strong>Analytics data:</strong> we use analytics tools (such as Google Analytics) to
              understand how visitors use our Site.
            </li>
          </ul>

          <h2>2. Cookies and tracking technologies</h2>
          <p>
            We use cookies and similar tracking technologies to improve site functionality,
            analyze traffic, and serve relevant advertising. You can control or disable cookies
            through your browser settings; however, doing so may affect certain features of the
            Site.
          </p>

          <h2>3. Google AdSense and third-party advertising</h2>
          <p>
            We use or intend to use Google AdSense to display advertisements on this Site.
            Google, as a third-party vendor, uses cookies (including the DoubleClick DART cookie)
            to serve ads based on a user's prior visits to this Site and other websites on the
            Internet. Google's use of advertising cookies enables it and its partners to serve ads
            based on your visits to this Site and/or other sites.
          </p>
          <p>
            You may opt out of personalized advertising by visiting{" "}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>
            . Alternatively, you can opt out of third-party vendor use of cookies for personalized
            advertising by visiting{" "}
            <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">
              www.aboutads.info
            </a>
            .
          </p>

          <h2>4. How we use your information</h2>
          <ul>
            <li>To operate, maintain, and improve the Site</li>
            <li>To respond to inquiries submitted through our contact form</li>
            <li>To analyze usage trends and site performance</li>
            <li>To display relevant advertising through third-party ad networks</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2>5. Third-party links</h2>
          <p>
            Our Site may contain links to third-party websites, including affiliate partners. We
            are not responsible for the privacy practices or content of those external sites. We
            encourage you to review the privacy policy of any site you visit.
          </p>

          <h2>6. Data retention and security</h2>
          <p>
            We retain personal information only as long as necessary for the purposes outlined in
            this policy. We implement reasonable administrative and technical safeguards to
            protect your information; however, no method of transmission over the Internet is
            100% secure.
          </p>

          <h2>7. Your rights</h2>
          <p>
            Depending on your jurisdiction, you may have the right to access, correct, delete, or
            restrict the use of your personal information. To exercise these rights, please
            contact us using the details below.
          </p>

          <h2>8. Children's privacy</h2>
          <p>
            This Site is not directed at children under the age of 13, and we do not knowingly
            collect personal information from children.
          </p>

          <h2>9. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy periodically. Changes take effect immediately upon
            posting to this page, along with an updated "Last updated" date.
          </p>

          <h2>10. Contact us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:hello@providingvalue.online">hello@providingvalue.online</a> or via our{" "}
            <a href="/contact">contact page</a>.
          </p>
        </article>
      </div>
    </main>
  );
}
