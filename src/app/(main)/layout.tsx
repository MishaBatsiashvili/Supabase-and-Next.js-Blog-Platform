import Navbar from "@/components/Layout/Navbar/Navbar";

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar/>
      <div className="w-full max-w-screen-lg flex-1 mx-auto">
        <div className="p-5">
          {children}
        </div>
      </div>
    </>
  );
}
