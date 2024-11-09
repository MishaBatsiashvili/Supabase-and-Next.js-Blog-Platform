import Navbar from "@/components/Layout/Navbar/Navbar";

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-5">
      <Navbar/>
      <div className="w-full max-w-screen-lg flex-1 mx-auto">
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
