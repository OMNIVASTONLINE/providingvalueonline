import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the terms and conditions governing your use of Providing Value, including intellectual property, disclaimers, and limitation of liability.",
  alternates: { canonical: "/terms-of-service" },
};

const lastUpdated = "February 24, 2026";

export default function TermsOfServicePage() {
  return (
    <main>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description={`Last updated: ${lastUpdated}`}
      />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <article className="prose-article">
          <p>
            These Terms of Service ("Terms") govern your access to and use of
            providingvalue.online (the "Site"), operated by Providing Value ("we," "us," or
            "our"). By accessing or using the Site, you agree to be bound by these Terms. If you
            do not agree, please discontinue use of the Site.
          </p>

          <h2>1. Use of the Site</h2>
          <p>
            You may use the Site for lawful, personal, non-commercial purposes only. You agree not
            to misuse the Site, including but not limited to attempting unauthorized access,
            distributing malware, scraping content at scale, or interfering with the Site's normal
            operation.
          </p>

          <h2>2. Content and intellectual property</h2>
          <p>
            All articles, graphics, logos, and other materials published on the Site are the
            property of Providing Value or its licensors and are protected by copyright and other
            intellectual property laws. You may share links to our content, but you may not
            republish, copy, or distribute substantial portions of our content without prior
            written permission.
          </p>

          <h2>3. Educational and informational purposes only</h2>
          <p>
            Content published on this Site — including articles about side hustles, remote jobs,
            freelancing, and career growth — is provided for general informational purposes only.
            It does not constitute financial, legal, tax, or career advice. Earnings and results
            mentioned in our articles are illustrative and not guaranteed; individual results vary
            based on effort, market conditions, and circumstances beyond our control.
          </p>

          <h2>4. Third-party links and services</h2>
          <p>
            The Site may contain links to third-party websites, tools, or platforms (including
            affiliate links). We do not control and are not responsible for the content, policies,
            or practices of any third-party sites. Inclusion of a link does not imply endorsement.
          </p>

          <h2>5. Advertising</h2>
          <p>
            The Site displays advertisements served by third-party advertising networks, including
            Google AdSense. We are not responsible for the content of advertisements displayed on
            the Site, and their presence does not constitute an endorsement of any product or
            service advertised.
          </p>

          <h2>6. Disclaimer of warranties</h2>
          <p>
            The Site and its content are provided on an "as is" and "as available" basis without
            warranties of any kind, either express or implied, including but not limited to
            accuracy, completeness, or fitness for a particular purpose.
          </p>

          <h2>7. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, Providing Value shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages arising out of your
            access to or use of the Site, including any decisions made based on the content
            published here.
          </p>

          <h2>8. Changes to these Terms</h2>
          <p>
            We may revise these Terms from time to time. Continued use of the Site after changes
            are posted constitutes acceptance of the revised Terms.
          </p>

          <h2>9. Governing law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable law,
            without regard to conflict-of-law principles.
          </p>

          <h2>10. Contact us</h2>
          <p>
            Questions about these Terms can be directed to{" "}
            <a href="mailto:hello@providingvalue.online">hello@providingvalue.online</a> or via our{" "}
            <a href="/contact">contact page</a>.
          </p>
        </article>
      </div>
    </main>
  );
}
