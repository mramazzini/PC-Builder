// wrap your content with this component to create a gap at the top of the page for the navbar
export default function BodyWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="body-wrapper ">
      <div className="navbar lg:hidden" />
      {children}
    </div>
  );
}
