// This footer needs to contain compyright for Blazing builds LLC and a link to the privacy policy and terms of service

export default function Footer() {
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>
          <a href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </a>
          <span> | </span>
          <a href="/terms-of-service" className="hover:underline">
            Terms of Service
          </a>
        </p>
        <p>All Rights Reserved © 2024 Blazing Builds LLC</p>
      </div>
    </footer>
  );
}
